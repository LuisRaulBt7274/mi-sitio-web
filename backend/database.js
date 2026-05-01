import initSqlJs from 'sql.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, 'portfolio.db');

// Initialize SQL.js
const SQL = await initSqlJs();

// Load or create database
let db;
if (fs.existsSync(DB_PATH)) {
  const fileBuffer = fs.readFileSync(DB_PATH);
  db = new SQL.Database(fileBuffer);
} else {
  db = new SQL.Database();
}

// Create tables
db.run(`
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    tech_stack TEXT NOT NULL,
    github_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS contact_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  )
`);

// Initialize default settings (ignore if exists)
try {
  db.run("INSERT INTO settings (key, value) VALUES ('dark_mode', 'false')");
} catch {}

// Seed project data (check if empty)
const result = db.exec("SELECT COUNT(*) as count FROM projects");
if (result[0]?.values[0][0] === 0) {
  db.run(`
    INSERT INTO projects (id, title, description, tech_stack, github_url) VALUES 
    (1, 'SustainaFlow AI', 'Transformación de CFDI 4.0 a métricas ESG. Analiza facturas electrónicas y genera informes de impacto ambiental, cumplimiento normativo y huella de carbono para empresas mexicanas.', 'Python, FastAPI, SQLite, Pandas, LangChain, Ollama', 'https://github.com/LuisRaulBt7274/sustainaflow-ai'),
    (2, 'Task Automator', 'Automatización de flujos de trabajo usando LLMs locales con Ollama.', 'Python, Ollama, SQLite, FastAPI', 'https://github.com/LuisRaulBt7274/task-automator'),
    (3, 'Dotfiles Manager', 'Gestor de configuraciones Linux para Pop!_OS/COSMIC.', 'Bash, Git, Stow', 'https://github.com/LuisRaulBt7274/dotfiles')
  `);
}

// Save to file
const data = db.export();
const buffer = Buffer.from(data);
fs.writeFileSync(DB_PATH, buffer);

// Helper functions
export function queryAll(sql, params = []) {
  const stmt = db.prepare(sql);
  if (params.length) stmt.bind(params);
  const results = [];
  while (stmt.step()) {
    const row = stmt.getAsObject();
    results.push(row);
  }
  stmt.free();
  return results;
}

export function queryOne(sql, params = []) {
  const stmt = db.prepare(sql);
  if (params.length) stmt.bind(params);
  let result = null;
  if (stmt.step()) {
    result = stmt.getAsObject();
  }
  stmt.free();
  return result;
}

export function runQuery(sql, params = []) {
  db.run(sql, params);
  // Auto-save after writes
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(DB_PATH, buffer);
  return { lastInsertRowid: db.exec("SELECT last_insert_rowid()")[0]?.values[0][0] };
}

export default db;
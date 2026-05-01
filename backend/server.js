import express from 'express';
import cors from 'cors';
import db, { getProjectCatalogHealth, queryAll, queryOne, runQuery } from './database.js';

const app = express();
const PORT = 3001;
const startedAt = new Date().toISOString();

app.use(cors());
app.use(express.json());

// ============ HEALTH API ============
app.get('/api/health', (req, res) => {
  try {
    const projectCatalog = getProjectCatalogHealth();
    const status = projectCatalog.healthy ? 'ok' : 'warn';

    res.json({
      status,
      service: 'portfolio-backend',
      started_at: startedAt,
      uptime_seconds: Math.floor(process.uptime()),
      checks: {
        database: 'ok',
        project_catalog: projectCatalog,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      service: 'portfolio-backend',
      error: error.message,
    });
  }
});

// ============ PROJECTS API ============
app.get('/api/projects', (req, res) => {
  try {
    const projects = queryAll('SELECT * FROM projects ORDER BY id');
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/projects/:id', (req, res) => {
  try {
    const project = queryOne('SELECT * FROM projects WHERE id = ?', [req.params.id]);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ CONTACT MESSAGES API ============
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }
    
    const result = runQuery(
      'INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)',
      [name, email, message]
    );
    
    res.status(201).json({ 
      id: result.lastInsertRowid, 
      name, 
      email, 
      message,
      created_at: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/contact', (req, res) => {
  try {
    const messages = queryAll('SELECT * FROM contact_messages ORDER BY created_at DESC');
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ SETTINGS API ============
app.get('/api/settings/:key', (req, res) => {
  try {
    const setting = queryOne('SELECT value FROM settings WHERE key = ?', [req.params.key]);
    res.json(setting || { value: null });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/settings/:key', (req, res) => {
  try {
    const { value } = req.body;
    runQuery(
      'INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)',
      [req.params.key, value]
    );
    res.json({ key: req.params.key, value });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ PROFILE API ============
app.get('/api/profile', (req, res) => {
  res.json({
    name: 'Luis Raúl',
    education: 'Escuela Superior de Computación (ESCOM-IPN)',
    title: 'Computer Systems Engineering Student',
    github: 'https://github.com/LuisRaulBt7274',
    interests: [
      'Linux (Pop!_OS/COSMIC)',
      'Automatización con LLMs locales',
      'Desarrollo Backend',
      'Inteligencia Artificial'
    ],
    about: 'Estudiante de Ingeniería en Sistemas Computacionales en ESCOM-IPN. Apasionado por el código abierto, la automatización y las tecnologías sostenibles. Desarrollo soluciones que combinan eficiencia técnica con responsabilidad ambiental.'
  });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});

export default app;
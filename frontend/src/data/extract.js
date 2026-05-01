// Script to extract data from SQLite and save to content.json
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import initSqlJs from 'sql.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function extractData() {
  const DB_PATH = path.join(__dirname, '../../backend/portfolio.db');
  const OUTPUT_PATH = path.join(__dirname, 'content.json');

  // Initialize SQL.js
  const SQL = await initSqlJs();
  
  // Read database
  const fileBuffer = fs.readFileSync(DB_PATH);
  const db = new SQL.Database(fileBuffer);

  // Extract profile
  const profileResult = db.exec("SELECT * FROM settings");
  const settings = {};
  if (profileResult.length > 0) {
    profileResult[0].values.forEach(row => {
      settings[row[0]] = row[1];
    });
  }

  // Extract projects
  const projectsResult = db.exec("SELECT id, title, description, tech_stack, github_url FROM projects ORDER BY id");
  const projects = [];
  if (projectsResult.length > 0) {
    projectsResult[0].values.forEach(row => {
      projects.push({
        id: row[0],
        title: row[1],
        description: row[2],
        tech_stack: row[3],
        github_url: row[4]
      });
    });
  }

  // Extract contact messages (optional, for reference)
  const messagesResult = db.exec("SELECT id, name, email, message, created_at FROM contact_messages ORDER BY created_at DESC LIMIT 10");
  const messages = [];
  if (messagesResult.length > 0) {
    messagesResult[0].values.forEach(row => {
      messages.push({
        id: row[0],
        name: row[1],
        email: row[2],
        message: row[3],
        created_at: row[4]
      });
    });
  }

  // Build content object
  const content = {
    profile: {
      name: "Luis Raúl",
      education: "Escuela Superior de Computación (ESCOM-IPN)",
      title: "Computer Systems Engineering Student",
      github: "https://github.com/LuisRaulBt7274",
      interests: [
        "Linux (Pop!_OS/COSMIC)",
        "Automatización con LLMs locales",
        "Desarrollo Backend",
        "Inteligencia Artificial"
      ],
      about: "Estudiante de Ingeniería en Sistemas Computacionales en ESCOM-IPN. Apasionado por el código abierto, la automatización y las tecnologías sostenibles. Desarrollo soluciones que combinan eficiencia técnica con responsabilidad ambiental."
    },
    projects: projects,
    settings: settings,
    // Static data that should be in the JSON
    skills: {
      frontend: [
        { name: 'React', level: 90, icon: '⚛️' },
        { name: 'TypeScript', level: 85, icon: '📘' },
        { name: 'Tailwind CSS', level: 95, icon: '🎨' },
        { name: 'Three.js', level: 60, icon: '🌐' },
      ],
      backend: [
        { name: 'Node.js', level: 85, icon: '🟢' },
        { name: 'Python', level: 80, icon: '🐍' },
        { name: 'FastAPI', level: 75, icon: '⚡' },
        { name: 'SQLite', level: 90, icon: '💾' },
      ],
      devops: [
        { name: 'Docker', level: 70, icon: '🐳' },
        { name: 'Git', level: 85, icon: '📂' },
        { name: 'Linux', level: 80, icon: '🐧' },
      ],
      ai: [
        { name: 'LangChain', level: 75, icon: '🔗' },
        { name: 'Ollama', level: 80, icon: '🧠' },
        { name: 'TensorFlow', level: 55, icon: '📊' },
      ]
    },
    experience: [
      {
        year: '2024',
        role: 'Desarrollador Full Stack',
        company: 'SustainaFlow AI',
        description: 'Transformación de CFDI 4.0 a métricas ESG. Sistema de análisis de facturas electrónicas para reportes ambientales.',
        stack: ['Python', 'FastAPI', 'SQLite', 'LangChain', 'Ollama']
      },
      {
        year: '2023-2024',
        role: 'Estudiante de Ingeniería',
        company: 'ESCOM-IPN',
        description: 'Ingeniería en Sistemas Computacionales. Cursos en desarrollo web, bases de datos y AI/ML.',
        stack: ['React', 'Node.js', 'Python', 'SQL']
      },
      {
        year: '2023',
        role: 'Desarrollador',
        company: 'Proyectos Personales',
        description: 'Dotfiles Manager, Neural Net Visualizer, Task Automator. Proyectos de código abierto.',
        stack: ['Bash', 'React', 'Three.js', 'Git']
      }
    ],
    blog: [
      {
        title: 'Configurando Pop!_OS con COSMIC',
        date: '2024-12-15',
        tags: ['linux', 'cosmic', 'dotfiles'],
        readTime: '5 min',
        excerpt: 'Guía para configurar el nuevo escritorio COSMIC de Pop!_OS con herramientas de desarrollo.'
      },
      {
        title: 'LLMs Locales con Ollama',
        date: '2024-11-20',
        tags: ['ollama', 'llm', 'ai'],
        readTime: '8 min',
        excerpt: 'Cómo configurar Ollama en tu máquina local para tener modelos de lenguaje privados.'
      },
      {
        title: 'CFDI 4.0 a Métricas ESG',
        date: '2024-10-05',
        tags: ['esg', 'cfdi', 'python'],
        readTime: '12 min',
        excerpt: 'Automatización del análisis de facturas electrónicas para reportes de sostenibilidad.'
      },
      {
        title: 'Automatización con LangChain',
        date: '2024-09-12',
        tags: ['langchain', 'automation', 'python'],
        readTime: '10 min',
        excerpt: 'Creando flujos de trabajo automatizados usando agentes de IA.'
      }
    ]
  };

  // Save to JSON
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(content, null, 2));
  console.log(`✅ Data extracted to ${OUTPUT_PATH}`);

  // Also save a static version for the build
  const staticPath = path.join(__dirname, '../../dist/content.json');
  fs.writeFileSync(staticPath, JSON.stringify(content, null, 2));
  console.log(`✅ Static copy saved to ${staticPath}`);
}

extractData().catch(console.error);

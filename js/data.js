/**
 * data.js — Archivo de configuración del portafolio
 * ─────────────────────────────────────────────────
 * Edita este archivo para actualizar tu información
 * sin necesidad de tocar HTML, CSS ni la lógica JS.
 */

const PORTFOLIO_DATA = {

  // ── Info personal ──────────────────────────────
  personal: {
    name:     "Luis Raul Morales Gómez",
    logo:     "LRMG_",
    tagline:  "Disponible para proyectos",
    heroTitle: ["Interfaces", "eficientes.", "Soluciones", "con propósito."],
    heroTitleAccentFrom: 2, // índice desde el cual el texto toma el color acento
    heroBio:  "Estudiante de Ingeniería en Sistemas Computacionales en ESCOM · IPN. Apasionado por C++, Python y el desarrollo de software open-source.",
    about: [
      "Soy una persona responsable, adaptable y proactiva, con un fuerte interés en la ingeniería de software y la administración de sistemas. Mi objetivo es especializarme en desarrollo back-end o análisis de datos, aportando valor real mientras sigo formándome.",
      "Cuento con formación técnica en soporte, sistemas operativos Linux/Windows, y experiencia práctica en proyectos de software y diseño computacional. Me muevo con igual comodidad en el nivel de sistemas que en el desarrollo de aplicaciones."
    ],
    meta: [
      "ESCOM · IPN — Ing. Sistemas Computacionales",
      "Inglés B1 CEFR (en curso)",
      "Español nativo"
    ],
    // Ruta a tu foto. Si no tienes foto, déjalo en null para mostrar iniciales.
    avatar: null,
    avatarInitials: "LR",
    footerNote: "Ingeniería en Sistemas · ESCOM IPN"
  },

  // ── Contacto ───────────────────────────────────
  contact: {
    email:    "luis.39140@gmail.com",
    linkedin: "https://www.linkedin.com/in/luis-morales-30609a365/",
    github:   "https://github.com/LuisRaulBt7274",
    ctaText:  "Estoy abierto a colaboraciones, proyectos freelance y oportunidades de desarrollo profesional. Hablemos."
  },

  // ── Stack tecnológico ──────────────────────────
  // Agrega o elimina skills libremente
  skills: [
    "C++", "Python", "JavaScript", "React",
    "Flutter", "Node.js", "HTML / CSS", "SQL",
    "Bash", "Git", "REST APIs", "Linux"
  ],

  // ── Servicios ──────────────────────────────────
  // Máximo recomendado: 4 (el grid se adapta)
  services: [
    {
      number: "01",
      title:  "Desarrollo frontend",
      desc:   "Interfaces limpias y funcionales con React y Flutter. Énfasis en rendimiento y experiencia de usuario."
    },
    {
      number: "02",
      title:  "Desarrollo backend",
      desc:   "APIs estructuradas, manejo de bases de datos y lógica de negocio sólida con Python y Node.js."
    },
    {
      number: "03",
      title:  "Sistemas & DevOps básico",
      desc:   "Administración de entornos Linux, scripting en Bash y gestión eficiente de dependencias y procesos."
    },
    {
      number: "04",
      title:  "IA local & automatización",
      desc:   "Despliegue de modelos de lenguaje en entornos privados y pipelines de procesamiento de datos."
    }
  ],

  // ── Proyectos ──────────────────────────────────
  // Agrega tantos proyectos como quieras.
  // "link" es opcional — ponlo en null si no tienes URL.
  projects: [
    {
      id:    "P.01",
      title: "Eureka App",
      desc:  "Aplicación orientada a la gestión del conocimiento y la productividad personal, con enfoque en flujos de aprendizaje estructurado.",
      tags:  ["JavaScript", "Flutter", "Git"],
      link:  "https://github.com/LuisRaulBt7274/Eureka-app"
    },
    {
      id:    "P.02",
      title: "Implementación de IA Local",
      desc:  "Configuración y despliegue de modelos de lenguaje a nivel local para procesamiento de datos privado, sin dependencia de servicios externos.",
      tags:  ["Python", "Ollama"],
      link:  null
    },
    {
      id:    "P.03",
      title: "SustainaFlow AI",
      desc:  "Diseño e implementación del frontend para una plataforma de gestión sostenible asistida por inteligencia artificial.",
      tags:  ["React", "Tailwind CSS", "JavaScript"],
      link:  null
    }
  ]

};

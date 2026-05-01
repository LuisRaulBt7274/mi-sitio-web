# Portafolio — Luis Raúl

Portafolio profesional de Luis Raúl, estudiante de Ingeniería en Sistemas Computacionales en ESCOM-IPN.

## Estructura del proyecto

```
projects/portfolio/frontend/
├── src/
│   ├── data/
│   │   └── content.json     ← Datos editables del portafolio
│   ├── App.jsx              ← Componentes principales
│   ├── index.css            ← Estilos globales + theming
│   └── main.jsx             ← Entry point
├── index.html
├── vite.config.js           ← Configuración Vite
├── tailwind.config.js       ← Configuración Tailwind
└── package.json
```

## Cómo actualizar el contenido

### Editar `src/data/content.json`

Solo necesitas editar este archivo para cambiar:

- **Perfil**: nombre, educación, GitHub, intereses, bio
- **Proyectos**: título, descripción, stack, URL de GitHub
- **Skills**: categorías, nombres, niveles, iconos
- **Experiencia**: año, rol, empresa, descripción, stack
- **Blog**: título, fecha, tags, tiempo de lectura, excerpt

## Paleta de colores

```css
/* Light mode (Ink Wash) */
--bg: #FFFFE3;
--text: #4A4A4A;
--border: #CBCBCB;
--accent: #6D8196;

/* Dark mode */
[data-theme="dark"] {
  --bg: #1a1a2e;
  --text: #E8E8E8;
  --border: #2D2D4A;
  --accent: #7B8CC8;
}
```

## Comandos de desarrollo

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Despliegue en GitHub Pages

```bash
npm run deploy
```

## Tecnologías

- React 18 + Vite
- Tailwind CSS
- Inter + JetBrains Mono

## Demo

Ver online: https://LuisRaulBt7274.github.io/mi-sitio-web

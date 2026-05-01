# Portafolio — Luis Raúl

Portafolio profesional de Luis Raúl, estudiante de Ingeniería en Sistemas Computacionales en ESCOM-IPN.

## Estructura del Proyecto

```
mi-sitio-web/
├── src/
│   ├── data/
│   │   └── content.json     ← 📝 EDITABLE - Datos del portafolio
│   ├── App.jsx              ← Componentes principales
│   ├── index.css            ← Estilos globales + theming
│   └── main.jsx             ← Entry point
├── public/                   ← Assets estáticos
├── index.html
├── vite.config.js           ← Configuración Vite
├── tailwind.config.js       ← Configuración Tailwind
└── package.json
```

## Cómo Actualizar el Contenido

### Editar `src/data/content.json`

Solo necesitas editar este archivo para cambiar:

- **Perfil**: nombre, educación, GitHub, intereses, bio
- **Proyectos**: título, descripción, stack, URL de GitHub
- **Skills**: categorías, nombres, niveles, iconos
- **Experiencia**: año, rol, empresa, descripción, stack
- **Blog**: título, fecha, tags, tiempo de lectura, excerpt

### Paleta de Colores (modificar en `src/index.css`)

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

## Comandos de Desarrollo

```bash
# Instalar dependencias
npm install

# Desarrollo local
npm run dev

# Build para producción
npm run build

# Vista previa del build
npm run preview
```

## Desplegar en GitHub Pages

### Opción 1: GitHub Actions (Automático)

1. Ve a **Settings → Pages**
2. Source: **GitHub Actions**
3. El workflow se ejecutará automáticamente en cada push a `main`

### Opción 2: Manual

```bash
# Instala gh-pages si no lo tienes
npm install -D gh-pages

# Build y deploy
npm run deploy
```

### Opción 3: Netlify (Drag & Drop)

1. Haz `npm run build`
2. Arrastra la carpeta `dist` a [netlify.com](https://netlify.com)

## Tecnologías

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Fonts**: Inter + JetBrains Mono

## Deploy Manual a GitHub Pages

Si prefieres hacer deploy manual sin GitHub Actions:

```bash
# 1. Build del proyecto
npm run build

# 2. Instala gh-pages global si no lo tienes
npm install -g gh-pages

# 3. Despliega
gh-pages -d dist
```

O puedes configurar en GitHub:
1. Ve a **Settings → Pages**
2. Source: **Deploy from a branch**
3. Branch: `gh-pages` / `root`
4. Save

---

## 🚀 Demo

Ver online: [https://LuisRaulBt7274.github.io/mi-sitio-web](https://LuisRaulBt7274.github.io/mi-sitio-web)

## License

MIT © Luis Raúl
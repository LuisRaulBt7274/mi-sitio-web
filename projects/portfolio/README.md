# Portafolio - Proyecto

Portafolio profesional de Luis Raúl separado del "cerebro" de OpenCode.

## Estructura

```
projects/portfolio/
├── backend/
│   ├── database.js
│   ├── package.json
│   └── server.js
└── frontend/
    ├── index.html
    ├── package.json
    ├── postcss.config.js
    ├── tailwind.config.js
    ├── vite.config.js
    └── src/
        ├── App.jsx
        ├── index.css
        ├── main.jsx
        └── data/
            ├── content.json
            └── extract.js
```

## Comandos

Desde la raíz del repositorio:

```powershell
.\setup.ps1
.\start.ps1
```

## Git y publicación

- La carpeta `.opencode/` queda local y no forma parte del proyecto.
- Todo el trabajo del portafolio vive en `projects/portfolio/`.
- `main` conserva el código fuente del portafolio.
- `gh-pages` publica el build para GitHub Pages desde la raíz del branch.
- Si GitHub Pages muestra un 404, revisa que la fuente del sitio esté configurada en `gh-pages` y no en `main`.

## Nota

La configuración de OpenCode sigue viviendo en `.opencode/`.
Todo el código del portafolio vive dentro de `projects/portfolio/`.

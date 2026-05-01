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

## Nota

La configuración de OpenCode sigue viviendo en `.opencode/`.
Todo el código del portafolio vive dentro de `projects/portfolio/`.

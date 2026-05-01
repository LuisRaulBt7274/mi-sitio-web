# AGENTS.md

## Proyecto: Portafolio de Luis Raúl

Dual workspace: OpenCode AI config en `.opencode/` + Portfolio web en React/SQLite.

## Comandos

```powershell
.\setup.ps1    # Instala dependencias de backend y frontend (una vez)
.\start.ps1     # Inicia ambos servidores en ventanas separadas
```

**Desarrollo individual:**
```powershell
cd backend; npm run dev    # Puerto 3001 (usa --watch de Node.js)
cd frontend; npm run dev   # Puerto 5173 (Vite)
```

**Deployment:**
```powershell
cd frontend; npm run deploy   # Build + gh-pages a github.com/LuisRaulBt7274/mi-sitio-web
```

## Arquitectura

```
backend/
├── server.js        # Express API (ES Module: "type": "module")
├── database.js      # SQLite via sql.js (browser WASM, no archivo .db)
└── portfolio.db    # Persiste en disco

frontend/
├── src/App.jsx     # Componentes React
├── src/data/extract.js
├── vite.config.js  # Proxy /api → :3001
└── dist/          # Build output (publicado a GitHub Pages)
```

## API Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/profile` | Perfil |
| GET | `/api/projects` | Proyectos |
| POST | `/api/contact` | Mensaje |
| GET/PUT | `/api/settings/:key` | Settings (theme persisted) |

## Theming

Theme se guarda en SQLite y se aplica con `data-theme` en `<html>`:
```html
<html data-theme="dark">...
```

## Paletas de Color

| Tema | Background | Text | Border | Accent |
|------|-----------|------|--------|--------|
| Light (Ink Wash) | #FFFFE3 | #4A4A4A | #CBCBCB | #6D8196 |
| Dark | #1a1a2e | #16213e | #E8E8E8 | #7B8CC8 |

## Datos Reales

- **Nombre**: Luis Raúl
- **GitHub**: github.com/LuisRaulBt7274
- **Educación**: ESCOM-IPN (ESCOM)
- **Proyecto Estrella**: SustainaFlow AI (CFDI 4.0 → métricas ESG)

## OpenCode Config

`.opencode/` contiene la configuración de subagentes (DevAgents team).
No versionar `package.json` ni `node_modules/`.
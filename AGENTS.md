# AGENTS.md

## Proyecto: Portafolio profesional de Luis Raúl

Stack: React 18 + Vite + TailwindCSS / Express + sql.js (archivo) / GitHub Pages.

## Comandos

```powershell
.\setup.ps1    # Instala dependencias (backend + frontend)
.\start.ps1    # Inicia ambos servidores en ventanas separadas
```

**Desarrollo individual:**
```powershell
cd backend; npm run dev    # Puerto 3001 (--watch)
cd frontend; npm run dev   # Puerto 5173 (Vite)
```

**Deploy:**
```powershell
cd frontend; npm run deploy   # Build → gh-pages → github.com/LuisRaulBt7274/mi-sitio-web
```

## Arquitectura

```
backend/
├── server.js        # Express API (ES Module)
├── database.js    # sql.js + archivo portfolio.db (persiste en disco)
├── portfolio.db   # SQLite file-based DB

frontend/
├── src/App.jsx   # Componentes React + theme hook
├── vite.config.js # Proxy /api → localhost:3001
└── dist/         # Build output (publicado a GitHub Pages)
```

**Detalle crítico**: El backend usa persistencia en archivo (`portfolio.db`), NO sql.js en navegador puro.

**Vite base**: `/mi-sitio-web/` (GitHub Pages subdirectory).

## API Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/profile` | Perfil estático |
| GET | `/api/projects` | Proyectos desde SQLite |
| POST | `/api/contact` | Guardar mensaje |
| GET/PUT | `/api/settings/:key` | Settings (theme persisted) |

## Theming

Theme se persiste en SQLite y aplica con `data-theme` en `<html>`:
```html
<html data-theme="dark">...
```

Paletas reales:

| Tema | Background | Text | Border | Accent |
|------|-----------|------|--------|--------|
| Light | #FFFFE3 | #4A4A4A | #CBCBCB | #6D8196 |
| Dark | #1a1a2e | #16213e | #E8E8E8 | #7B8CC8 |

## Datos Reales

- **Nombre**: Luis Raúl
- **GitHub**: github.com/LuisRaulBt7274
- **Educación**: ESCOM-IPN
- **Proyecto estrella**: SustainaFlow AI (CFDI 4.0 → métricas ESG)

## OpenCode Config

`.opencode/` contiene la configuración de subagentes (DevAgents team).

No versionar `package.json` ni `node_modules/` (ya en .gitignore).
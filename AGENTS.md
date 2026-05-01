# AGENTS.md

## Proyecto: Portafolio profesional de Luis Raúl

Stack: React 18 + Vite + TailwindCSS / Express + sql.js (archivo) / GitHub Pages.

---

## Arquitectura: Dos Raíces

```
nexus-project/
├── .opencode/              # BRAIN — configuración, agentes, skills, MCPs
│   ├── opencode.json       # Configuración global
│   ├── agents/             # Definiciones de agentes
│   ├── skills/             # 12 skills reutilizables
│   └── mcp/                # Configuración MCP
│
└── projects/               # WORKSPACE — todas las apps y programas
```

---

## Reglas de Arquitectura (OBLIGATORIAS)

### 1. .opencode/ es de solo lectura
Los agentes NUNCA deben generar código en `.opencode/`. Este directorio contiene SOLO configuraciones.

- ✅ Leer skills de `.opencode/skills/`
- ✅ Usar agentes de `.opencode/agents/`
- ✅ Configurar MCPs en `.opencode/mcp/`
- ❌ NUNCA escribir código nuevo en `.opencode/`

### 2. Todo proyecto debe estar en projects/
Cada app, script o programa se crea bajo `projects/{nombre}/`.

```
projects/portfolio/          ✅
projects/mi-nueva-app/       ✅
.opencode/mi-app/            ❌
```

### 3. Al "build", "create" o "generate" → siempre en projects/
Cuando se pida crear cualquier app, el agente DEBE estructurarla en `projects/{project-name}/`.

### 4. Skills y agentes son GLOBALES
Todos los skills en `.opencode/skills/` están disponibles para todos los proyectos.

### 5. Cada proyecto está AISLADO
Cada proyecto tiene sus propias dependencias y README.

---

## Comandos

```powershell
.\setup.ps1    # Instala dependencias (backend + frontend)
.\start.ps1    # Inicia ambos servidores en ventanas separadas
```

**Desarrollo individual:**
```powershell
cd projects\portfolio\backend; npm run dev    # Puerto 3001 (--watch)
cd projects\portfolio\frontend; npm run dev   # Puerto 5173 (Vite)
```

**Deploy:**
```powershell
cd projects\portfolio\frontend; npm run deploy   # Build → gh-pages → github.com/LuisRaulBt7274/mi-sitio-web
```

---

## Arquitectura Técnica

```
projects/portfolio/backend/
├── server.js         # Express API (ES Module)
├── database.js       # sql.js + archivo portfolio.db (persiste en disco)
└── portfolio.db      # SQLite file-based DB

projects/portfolio/frontend/
├── src/App.jsx       # Componentes React + theme hook
├── vite.config.js    # Proxy /api → localhost:3001
└── dist/             # Build output (publicado a GitHub Pages)
```

**Detalle crítico**: El backend usa persistencia en archivo (`portfolio.db`), NO sql.js en navegador puro.

**Vite base**: `/mi-sitio-web/` (GitHub Pages subdirectory).

---

## API Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/profile` | Perfil estático |
| GET | `/api/projects` | Proyectos desde SQLite |
| POST | `/api/contact` | Guardar mensaje |
| GET/PUT | `/api/settings/:key` | Settings (theme persisted) |

---

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

---

## Datos Reales

- **Nombre**: Luis Raúl
- **GitHub**: github.com/LuisRaulBt7274
- **Educación**: ESCOM-IPN
- **Proyecto estrella**: SustainaFlow AI (CFDI 4.0 → métricas ESG)

---

## Agentes Disponibles

| Agente | Archivo | Especialidad |
|--------|--------|-------------|
| frontend-agent | frontend-agent.md | React, UI, componentes |
| backend-agent | backend-agent.md | APIs, bases de datos |
| devops-agent | devops-agent.md | Docker, CI/CD |
| qa-agent | qa-agent.md | Testing, calidad |
| arquitecto | arquitecto.md | Arquitectura de software |
| frontend | frontend.md | Desarrollo frontend |
| backend | backend.md | Desarrollo backend |
| devops | devops.md | DevOps |
| qa | qa.md | QA |
| automatizacion | automatizacion.md | Automatización |

## Skills Disponibles

- **Dev**: frontend-design, code-review, refactor, debug, docstring
- **Daily**: email-writer, summarizer, translator
- **School**: essay-writer, study-guide, problem-solver, presentation

---

No versionar `package.json` ni `node_modules/` (ya en .gitignore).
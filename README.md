# Nexus Project

Separación real del workspace:

- `.opencode/` es el cerebro: configuración, agentes, MCPs y skills.
- `projects/portfolio/` es el proyecto: frontend, backend y datos del portafolio.

## Estructura

```text
nexus-project/
├── .opencode/
├── projects/
│   └── portfolio/
│       ├── backend/
│       └── frontend/
├── setup.ps1
└── start.ps1
```

## Regla operativa

Todo código nuevo del portafolio vive en `projects/portfolio/`.
La carpeta `.opencode/` no debe recibir código de aplicación.

## Desarrollo

```powershell
.\setup.ps1
.\start.ps1
```

Frontend: http://localhost:5173
Backend API: http://localhost:3001
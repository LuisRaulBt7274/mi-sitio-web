# Portafolio — Luis Raul Morales Gómez

## Estructura del proyecto

```
portfolio/
├── index.html               ← Estructura base (no necesitas editarlo)
│
├── css/
│   ├── variables.css        ← 🎨 Paleta de colores y fuentes
│   ├── base.css             ← Reset, tipografía y botones globales
│   └── components/
│       ├── nav.css          ← Barra de navegación + toggle
│       ├── hero.css         ← Sección principal / portada
│       ├── about.css        ← Sobre mí + skills
│       ├── services.css     ← Tarjetas de servicios
│       ├── projects.css     ← Grid de proyectos + tags
│       ├── contact.css      ← Caja de contacto + links sociales
│       └── footer.css       ← Pie de página
│
├── js/
│   ├── data.js              ← ✏️  TUS DATOS — edita este archivo
│   └── main.js              ← Lógica de renderizado
│
└── assets/                  ← Pon aquí tu foto de perfil
```

---

## Regla de oro del mantenimiento

| Quiero cambiar...              | Archivo a editar                       |
|-------------------------------|----------------------------------------|
| Mis datos, proyectos, skills  | `js/data.js`                           |
| Los colores de la página      | `css/variables.css`                    |
| El estilo de las project cards | `css/components/projects.css`         |
| El estilo de la nav           | `css/components/nav.css`              |
| El layout general             | `css/base.css`                        |
| La estructura HTML            | `js/main.js`                          |

---

## Cómo actualizar el contenido

**Solo necesitas editar `js/data.js`.**

### Agregar un proyecto
```js
projects: [
  // ... proyectos existentes ...
  {
    id:    "P.04",
    title: "Nombre del proyecto",
    desc:  "Descripción breve.",
    tags:  ["React", "Python"],
    link:  "https://github.com/tu-usuario/repo"  // o null si no tienes
  }
]
```

### Agregar una skill
```js
skills: ["C++", "Python", ..., "Tu nueva skill"]
```

### Agregar tu foto
1. Coloca tu imagen en `assets/foto.jpg`
2. En `data.js`, cambia:
```js
personal: {
  avatar: "assets/foto.jpg",  // antes era null
}
```

### Cambiar la paleta de colores
Edita `css/variables.css`:
```css
--color-1: #272757;  /* color principal */
--color-2: #8686AC;  /* acento */
--color-3: #505081;  /* intermedio */
--color-4: #0F0E47;  /* fondo oscuro */
```

---

## Cómo correrlo localmente

```bash
# Con Python
python -m http.server 3000

# Con Node.js
npx serve .
```

Luego entra a `http://localhost:3000`

---

## Cómo publicarlo (gratis)

**GitHub Pages:**
1. Sube el proyecto a un repo en GitHub
2. Ve a Settings → Pages → Source: `main` branch, carpeta `/root`
3. Tu página estará en `https://tu-usuario.github.io/nombre-repo`

**Netlify (drag & drop):**
1. Entra a [netlify.com](https://netlify.com)
2. Arrastra la carpeta `portfolio/` al área de deploy
3. Obtienes una URL en segundos

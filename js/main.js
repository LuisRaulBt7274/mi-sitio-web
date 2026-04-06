/**
 * main.js — Lógica del portafolio
 * ────────────────────────────────────────────────
 * Lee PORTFOLIO_DATA (data.js) y construye el HTML
 * dinámicamente. No edites este archivo salvo que
 * quieras cambiar la estructura de los componentes.
 */

/* ── Íconos SVG reutilizables ──────────────────── */
const ICONS = {
  email: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>`,
  linkedin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>`,
  github: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>`
};

/* ── Dark mode toggle ──────────────────────────── */
function initDarkMode() {
  const btn = document.getElementById('darkToggle');
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') document.body.setAttribute('data-dark', '1');

  btn.addEventListener('click', () => {
    const isDark = document.body.getAttribute('data-dark') === '1';
    document.body.setAttribute('data-dark', isDark ? '0' : '1');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
  });
}

/* ── Render: Nav ───────────────────────────────── */
function renderNav(data) {
  return `
    <nav class="nav">
      <span class="nav__logo">${data.personal.logo}</span>
      <ul class="nav__links">
        <li><a href="#sobre-mi">Sobre mí</a></li>
        <li><a href="#servicios">Servicios</a></li>
        <li><a href="#proyectos">Proyectos</a></li>
        <li><a href="#contacto">Contacto</a></li>
        <li>
          <button class="nav__toggle" id="darkToggle" aria-label="Cambiar modo">
            <div class="nav__toggle-knob"></div>
          </button>
        </li>
      </ul>
    </nav>
  `;
}

/* ── Render: Hero ──────────────────────────────── */
function renderHero(data) {
  const { personal, contact } = data;
  const lines = personal.heroTitle.map((line, i) =>
    i >= personal.heroTitleAccentFrom
      ? `<span class="accent">${line}</span>`
      : line
  ).join('<br>');

  const avatarContent = personal.avatar
    ? `<img src="${personal.avatar}" alt="${personal.name}">`
    : `<span class="hero__avatar-initials">${personal.avatarInitials}</span>`;

  return `
    <section class="hero">
      <div>
        <div class="hero__eyebrow">
          <span class="hero__pulse"></span>
          ${personal.tagline}
        </div>
        <h1>${lines}</h1>
        <p class="hero__bio">${personal.heroBio}</p>
        <div class="hero__btns">
          <a class="btn-primary" href="#proyectos">Ver proyectos</a>
          <a class="btn-ghost"   href="mailto:${contact.email}">Hablemos</a>
        </div>
      </div>
      <div class="hero__avatar">${avatarContent}</div>
    </section>
  `;
}

/* ── Render: About ─────────────────────────────── */
function renderAbout(data) {
  const { personal, skills } = data;

  const paragraphs = personal.about
    .map(p => `<p class="about__text">${p}</p>`).join('');

  const metaItems = personal.meta
    .map(m => `
      <div class="about__meta-item">
        <span class="about__meta-dot"></span>${m}
      </div>`).join('');

  const skillTags = skills
    .map(s => `<span class="skill-tag">${s}</span>`).join('');

  return `
    <section class="container" id="sobre-mi">
      <p class="section-label">— sobre mí</p>
      <h2>Construyendo con<br>criterio técnico.</h2>
      <div class="about__grid">
        <div>
          ${paragraphs}
          <div class="about__meta">${metaItems}</div>
        </div>
        <div>
          <p class="section-label" style="margin-bottom:14px;">Stack tecnológico</p>
          <div class="skills">${skillTags}</div>
        </div>
      </div>
    </section>
  `;
}

/* ── Render: Services ──────────────────────────── */
function renderServices(data) {
  const cards = data.services.map(s => `
    <div class="service-card">
      <p class="service-card__num">${s.number}</p>
      <h3>${s.title}</h3>
      <p>${s.desc}</p>
    </div>
  `).join('');

  return `
    <section class="container" id="servicios">
      <p class="section-label">— servicios</p>
      <h2>¿En qué puedo<br>aportarte valor?</h2>
      <div class="services__grid">${cards}</div>
    </section>
  `;
}

/* ── Render: Projects ──────────────────────────── */
function renderProjects(data) {
  const cards = data.projects.map(p => {
    const tags = p.tags.map(t => `<span class="tag">${t}</span>`).join('');
    const link = p.link
      ? `<a class="project-card__link" href="${p.link}" target="_blank">${p.link.replace('https://', '')} ↗</a>`
      : '';

    return `
      <div class="project-card">
        <div class="project-card__thumb">
          <span class="project-card__id">${p.id}</span>
        </div>
        <div class="project-card__body">
          <h3>${p.title}</h3>
          <p>${p.desc}</p>
          ${link}
          <div class="tags">${tags}</div>
        </div>
      </div>
    `;
  }).join('');

  return `
    <section class="container" id="proyectos">
      <p class="section-label">— proyectos</p>
      <h2>Trabajo destacado.</h2>
      <div class="projects__grid">${cards}</div>
    </section>
  `;
}

/* ── Render: Contact ───────────────────────────── */
function renderContact(data) {
  const { contact } = data;
  return `
    <section class="container" id="contacto">
      <p class="section-label">— contacto</p>
      <h2>¿Tienes un proyecto<br>en mente?</h2>
      <div class="contact__box">
        <div>
          <p>${contact.ctaText}</p>
          <div class="social-links">
            <a class="social-link" href="mailto:${contact.email}">
              ${ICONS.email} Email
            </a>
            <a class="social-link" href="${contact.linkedin}" target="_blank">
              ${ICONS.linkedin} LinkedIn
            </a>
            <a class="social-link" href="${contact.github}" target="_blank">
              ${ICONS.github} GitHub
            </a>
          </div>
        </div>
        <a class="btn-primary contact__cta" href="mailto:${contact.email}">
          Escribir mensaje
        </a>
      </div>
    </section>
  `;
}

/* ── Render: Footer ────────────────────────────── */
function renderFooter(data) {
  const year = new Date().getFullYear();
  return `
    <footer class="footer">
      <p>© ${year} ${data.personal.name}</p>
      <p>${data.personal.footerNote}</p>
    </footer>
  `;
}

/* ── Render: Divider ───────────────────────────── */
const divider = () => `<hr class="divider">`;

/* ── Bootstrap: ensambla todo ──────────────────── */
function buildPage() {
  const app = document.getElementById('app');

  app.innerHTML = [
    renderNav(PORTFOLIO_DATA),
    renderHero(PORTFOLIO_DATA),
    divider(),
    renderAbout(PORTFOLIO_DATA),
    divider(),
    renderServices(PORTFOLIO_DATA),
    divider(),
    renderProjects(PORTFOLIO_DATA),
    divider(),
    renderContact(PORTFOLIO_DATA),
    renderFooter(PORTFOLIO_DATA)
  ].join('');

  // Inicializar dark mode después de que el botón esté en el DOM
  initDarkMode();
}

document.addEventListener('DOMContentLoaded', buildPage);

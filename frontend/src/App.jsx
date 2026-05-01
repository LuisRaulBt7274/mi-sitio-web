import { useState, useEffect } from 'react'
import content from './data/content.json'

// ============ HOOKS ============

// Theme hook - uses localStorage for static build compatibility
function useTheme() {
  const [theme, setTheme] = useState('light')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check localStorage first (for static build)
    const saved = localStorage.getItem('theme')
    if (saved) {
      setTheme(saved)
      document.documentElement.setAttribute('data-theme', saved)
    } else if (content.settings?.dark_mode === 'true') {
      setTheme('dark')
      document.documentElement.setAttribute('data-theme', 'dark')
    }
    setLoading(false)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }

  return { theme, toggleTheme, loading }
}

function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState('')
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 }
    )
    
    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    
    return () => observer.disconnect()
  }, [sectionIds])
  
  return activeSection
}

// ============ COMPONENTS ============

const getColors = (theme) => ({
  bg: theme === 'dark' ? '#1a1a2e' : '#FFFFE3',
  bgCard: theme === 'dark' ? '#16213e' : 'white',
  text: theme === 'dark' ? '#E8E8E8' : '#4A4A4A',
  textSecondary: theme === 'dark' ? '#888888' : '#6B7280',
  border: theme === 'dark' ? '#2D2D4A' : '#CBCBCB',
  accent: theme === 'dark' ? '#7B8CC8' : '#6D8196',
})

function Header({ activeSection, theme, onToggleTheme }) {
  const colors = getColors(theme)
  const navItems = ['about', 'skills', 'services', 'experience', 'projects', 'blog', 'contact']
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 navbar">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="font-semibold text-lg" style={{ color: colors.text }}>
          <span style={{ color: colors.accent }}>$</span> luisraul
        </div>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map(item => (
              <a
                key={item}
                href={`#${item}`}
                className="text-sm capitalize transition-colors"
                style={{ 
                  color: activeSection === item ? colors.accent : colors.text,
                  fontWeight: activeSection === item ? 500 : 400
                }}
              >
                {item}
              </a>
            ))}
          </nav>
          <button onClick={onToggleTheme} className="theme-toggle" style={{ color: colors.text }} aria-label="Toggle theme">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </header>
  )
}

function Hero({ profile, theme }) {
  const colors = getColors(theme)
  
  return (
    <section id="about" className="min-h-screen flex items-center pt-20">
      <div className="max-w-4xl mx-auto px-4 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm mb-3" style={{ color: colors.accent, fontWeight: 500 }}>
              {profile.title}
            </p>
            <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{ color: colors.text, letterSpacing: '-0.03em' }}>
              {profile.name}
            </h1>
            <p className="text-lg mb-6 leading-relaxed" style={{ color: colors.text, fontWeight: 300 }}>
              {profile.about}
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {profile.interests.map((interest, i) => (
                <span key={i} className="tag">{interest}</span>
              ))}
            </div>
            <div className="flex gap-3">
              <a href="#skills" className="btn-primary">Ver Skills</a>
              <a href="#contact" className="btn-secondary">Contactar</a>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="p-5 rounded-lg" style={{ background: colors.bgCard, border: `1px solid ${colors.border}` }}>
              <div className="text-xs mb-1" style={{ color: colors.accent, fontWeight: 500 }}>Educación</div>
              <div className="text-sm mb-4" style={{ color: colors.text }}>{profile.education}</div>
              <div className="text-xs mb-1" style={{ color: colors.accent, fontWeight: 500 }}>GitHub</div>
              <div className="text-sm mb-4" style={{ color: colors.accent }}>{profile.github.replace('https://', '')}</div>
              <div className="text-xs mb-1" style={{ color: colors.accent, fontWeight: 500 }}>Intereses</div>
              <div style={{ color: colors.text }}>{profile.interests.join(' · ')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Skills({ theme }) {
  const colors = getColors(theme)
  const categories = [
    { key: 'frontend', label: 'Frontend' },
    { key: 'backend', label: 'Backend' },
    { key: 'devops', label: 'DevOps' },
    { key: 'ai', label: 'AI/ML' }
  ]
  
  return (
    <section id="skills" className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="section-title">Skills</h2>
        <div className="section-divider"></div>
        <div className="grid md:grid-cols-2 gap-6">
          {categories.map(cat => (
            <div key={cat.key} className="card">
              <h3 className="font-semibold mb-4" style={{ color: colors.accent }}>{cat.label}</h3>
              <div className="space-y-3">
                {content.skills[cat.key].map(skill => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm flex items-center gap-2" style={{ color: colors.text }}>
                        <span>{skill.icon}</span>
                        {skill.name}
                      </span>
                      <span className="text-xs" style={{ color: colors.textSecondary }}>{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div className="skill-bar-fill" style={{ width: `${skill.level}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Experience({ theme }) {
  const colors = getColors(theme)
  
  return (
    <section id="experience" className="min-h-screen py-20">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="section-title">Experiencia</h2>
        <div className="section-divider"></div>
        <div className="relative pl-8">
          <div className="timeline-line"></div>
          {content.experience.map((exp, i) => (
            <div key={i} className="relative mb-8 last:mb-0">
              <div className="timeline-dot" style={{ top: '8px' }}></div>
              <div className="card">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-2 py-0.5 rounded" style={{ background: colors.accent, color: 'white', fontWeight: 500 }}>
                    {exp.year}
                  </span>
                  <span className="font-medium" style={{ color: colors.text }}>{exp.company}</span>
                </div>
                <div className="font-medium mb-2" style={{ color: colors.accent }}>{exp.role}</div>
                <p className="text-sm mb-3" style={{ color: colors.text, fontWeight: 300 }}>{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.stack.map(tech => (
                    <span key={tech} className="tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Services({ theme }) {
  const colors = getColors(theme)
  
  return (
    <section id="services" className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="section-title">Servicios</h2>
        <div className="section-divider"></div>
        <div className="grid md:grid-cols-2 gap-4">
          {content.services?.map((service, i) => (
            <div key={i} className="card">
              <div className="text-2xl font-bold mb-2" style={{ color: colors.accent, opacity: 0.5 }}>
                {service.number}
              </div>
              <h3 className="font-semibold text-lg mb-2" style={{ color: colors.text }}>
                {service.title}
              </h3>
              <p className="text-sm" style={{ color: colors.textSecondary, fontWeight: 300 }}>
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Projects({ theme }) {
  const colors = getColors(theme)
  
  return (
    <section id="projects" className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="section-title">Proyectos</h2>
        <div className="section-divider"></div>
        <div className="grid md:grid-cols-2 gap-4">
          {content.projects.map(project => (
            <div key={project.id} className="card">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold" style={{ color: colors.text }}>{project.title}</h3>
                {project.github_url && (
                  <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="text-sm" style={{ color: colors.accent }}>
                    GitHub →
                  </a>
                )}
              </div>
              <p className="text-sm mb-3" style={{ color: colors.text, fontWeight: 300 }}>{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech_stack.split(', ').map((tech, i) => (
                  <span key={i} className="tag">{tech.trim()}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Blog({ theme }) {
  const colors = getColors(theme)
  
  return (
    <section id="blog" className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="section-title">Blog</h2>
        <div className="section-divider"></div>
        <div className="grid md:grid-cols-2 gap-4">
          {content.blog.map((post, i) => (
            <article key={i} className="card cursor-pointer">
              <div className="text-xs mb-2" style={{ color: colors.textSecondary }}>{post.date}</div>
              <h3 className="font-semibold mb-2" style={{ color: colors.text }}>{post.title}</h3>
              <p className="text-sm mb-3" style={{ color: colors.text, fontWeight: 300 }}>{post.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
                <span className="text-xs" style={{ color: colors.textSecondary }}>{post.readTime}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact({ theme }) {
  const colors = getColors(theme)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    // For static build, show success (in production, integrate with a form service)
    setTimeout(() => {
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setStatus(null), 3000)
    }, 500)
  }

  return (
    <section id="contact" className="min-h-screen py-20">
      <div className="max-w-md mx-auto px-4">
        <h2 className="section-title text-center">Contacto</h2>
        <div className="section-divider"></div>
        <p className="text-center mb-8" style={{ color: colors.text, fontWeight: 300 }}>
          ¿Working together? Envíame un mensaje.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: colors.text }}>Nombre</label>
            <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" placeholder="Tu nombre" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: colors.text }}>Email</label>
            <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-field" placeholder="tu@email.com" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: colors.text }}>Mensaje</label>
            <textarea required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="input-field resize-none" placeholder="Tu mensaje..." />
          </div>
          <button type="submit" disabled={status === 'sending'} className="w-full btn-primary disabled:opacity-50">
            {status === 'sending' ? 'Enviando...' : 'Enviar Mensaje'}
          </button>
          {status === 'success' && <p className="text-center text-sm" style={{ color: colors.accent }}>¡Mensaje enviado!</p>}
        </form>
      </div>
    </section>
  )
}

function Footer({ theme }) {
  const colors = getColors(theme)
  
  return (
    <footer className="py-8 text-center" style={{ borderTop: `1px solid ${colors.border}` }}>
      <div className="max-w-4xl mx-auto px-4 text-sm" style={{ color: colors.textSecondary }}>
        <p className="font-medium">♥ Built with React + Tailwind CSS</p>
        <p className="mt-1">© 2024 Luis Raúl — ESCOM-IPN</p>
      </div>
    </footer>
  )
}

function App() {
  const { theme, toggleTheme, loading } = useTheme()
  const colors = getColors(theme)
  const activeSection = useActiveSection(['about', 'skills', 'services', 'experience', 'projects', 'blog', 'contact'])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: colors.bg, color: colors.text }}>
        <div className="text-sm">Loading...</div>
      </div>
    )
  }

  return (
    <div style={{ background: colors.bg, color: colors.text }}>
      <Header activeSection={activeSection} theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero profile={content.profile} theme={theme} />
        <Skills theme={theme} />
        <Services theme={theme} />
        <Experience theme={theme} />
        <Projects theme={theme} />
        <Blog theme={theme} />
        <Contact theme={theme} />
      </main>
      <Footer theme={theme} />
    </div>
  )
}

export default App
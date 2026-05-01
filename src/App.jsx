import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Background from './components/ui/Background'
import Cursor from './components/ui/Cursor'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import AboutTerminal from './components/AboutTerminal'
import Contact from './components/Contact'

const NAV_LINKS = [
  { label: 'Projects', href: 'projects' },
  { label: 'Skills', href: 'skills' },
  { label: 'Experience', href: 'experience' },
  { label: 'About', href: 'about' },
  { label: 'Contact', href: 'contact' },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5, rootMargin: '-52px 0px 0px 0px' }
    )

    const sections = document.querySelectorAll('section[id]')
    sections.forEach((section) => observer.observe(section))

    return () => sections.forEach((section) => observer.unobserve(section))
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    const targetId = href.replace('#', '')
    const element = document.getElementById(targetId)

    if (element) {
      setMenuOpen(false)
      const offset = 52 // Navbar height
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })

      // Update URL without hash jump
      window.history.pushState(null, null, href)
    }
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--bg-primary)', cursor: 'none' }}>
      <Cursor />
      <Background />

      {/* Navbar */}
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          padding: '0 2rem',
          height: '52px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: scrolled ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.7)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: '1px solid var(--border-subtle)',
          transition: 'background var(--transition-smooth)',
        }}
      >
        {/* Wordmark */}
        <a
          href="#"
          onClick={(e) => handleNavClick(e, '#hero')}
          style={{ fontWeight: 700, fontSize: '1.0625rem', letterSpacing: '-0.03em', color: 'var(--text-primary)', textDecoration: 'none' }}
        >
          Vishv Munjapara<span style={{ color: 'var(--accent-blue)' }}>.</span>
        </a>

        {/* Desktop nav */}
        <nav className="desktop-nav" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {NAV_LINKS.map(link => {
            const isActive = activeSection === link.href.replace('#', '')
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  textDecoration: 'none',
                  letterSpacing: '-0.01em',
                  transition: 'color var(--transition-fast)',
                  position: 'relative'
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                onMouseLeave={e => {
                  if (!isActive) e.currentTarget.style.color = 'var(--text-secondary)'
                }}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-dot"
                    style={{
                      position: 'absolute',
                      bottom: '-6px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: 'var(--accent-blue)'
                    }}
                  />
                )}
              </a>
            )
          })}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '0.875rem', fontWeight: 500, padding: '0.4rem 1rem', borderRadius: '100px', background: 'var(--text-primary)', color: '#fff', textDecoration: 'none', letterSpacing: '-0.01em', transition: 'opacity var(--transition-fast)' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Resume ↗
          </a>
        </nav>

        {/* Hamburger (mobile) */}
        <button
          id="hamburger-btn"
          className="hamburger"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(v => !v)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'none',
            padding: '0.5rem',
            flexDirection: 'column',
            gap: '5px',
          }}
        >
          {[0, 1, 2].map(i => (
            <motion.span
              key={i}
              animate={
                menuOpen
                  ? i === 0 ? { rotate: 45, y: 10 } : i === 1 ? { opacity: 0 } : { rotate: -45, y: -10 }
                  : { rotate: 0, y: 0, opacity: 1 }
              }
              style={{ display: 'block', width: '22px', height: '1.5px', background: 'var(--text-primary)', borderRadius: '2px' }}
            />
          ))}
        </button>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: '52px',
              left: 0,
              right: 0,
              zIndex: 199,
              background: 'rgba(255,255,255,0.96)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid var(--border-subtle)',
              padding: '1.5rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            {NAV_LINKS.map(link => {
              const isActive = activeSection === link.href.replace('#', '')
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  style={{
                    fontSize: '1.0625rem',
                    fontWeight: 500,
                    color: isActive ? 'var(--accent-blue)' : 'var(--text-primary)',
                    textDecoration: 'none',
                    letterSpacing: '-0.02em',
                    padding: '0.25rem 0'
                  }}
                >
                  {link.label}
                </a>
              )
            })}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleNavClick}
              style={{ marginTop: '0.5rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--accent-blue)', textDecoration: 'none' }}
            >
              Resume ↗
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <div className="section-divider" style={{ margin: '0 2rem' }} />
        <Projects />
        <div className="section-divider" style={{ margin: '0 2rem' }} />
        <Skills />
        <div className="section-divider" style={{ margin: '0 2rem' }} />
        <Experience />
        <div className="section-divider" style={{ margin: '0 2rem' }} />
        <AboutTerminal />
        <div className="section-divider" style={{ margin: '0 2rem' }} />
        <Contact />
      </main>

      {/* Footer */}
      <footer style={{
        position: 'relative',
        zIndex: 1,
        borderTop: '1px solid var(--border-subtle)',
        padding: '3rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <p className="t-caption" style={{ color: 'var(--text-tertiary)' }}>
          © 2026 Vishv Munjapara — Designed & Engineered with care.
        </p>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {[
            { label: 'GitHub', href: 'https://github.com/vishv183' },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/vishv-munjapara-53b076219/' },
            { label: 'Email', href: 'mailto:vishvmunjapara23@gmail.com' },
          ].map(s => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--text-tertiary)', textDecoration: 'none', transition: 'color var(--transition-fast)' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-tertiary)'}
            >
              {s.label}
            </a>
          ))}
        </div>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </div>
  )
}

export default App

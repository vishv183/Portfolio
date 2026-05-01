import React, { useState, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { TERMINAL_STEPS } from '../data/terminalSteps';

const AboutTerminal = () => {
  const [visibleLines, setVisibleLines] = useState([]);

  useEffect(() => {
    const timers = TERMINAL_STEPS.map((step) =>
      setTimeout(() => {
        setVisibleLines(prev => [...prev, step]);
      }, step.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section id="about" style={{ position: 'relative', zIndex: 1, padding: '7rem 0' }}>
      <div className="section-container">
        <div className="about-grid">

          {/* Left: editorial content */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="t-caption" style={{ marginBottom: '0.75rem', color: 'var(--accent-blue)' }}>
              About Me
            </p>
            <h2 className="t-headline" style={{ marginBottom: '1.5rem' }}>
              Engineered for<br />impact.
            </h2>
            <p className="t-body" style={{ marginBottom: '1.25rem' }}>
              I'm a backend developer with hands-on experience building RESTful APIs,
              designing database schemas, and shipping reliable software with Python & Django.
            </p>
            <p className="t-body" style={{ marginBottom: '2rem' }}>
              I run Linux (Arch, NixOS), care deeply about clean architecture,
              and love solving real problems — from ML pipelines to real-time chat systems.
            </p>

            {/* Stats row */}
            <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
              {[
                { num: '3+', label: 'Projects Shipped' },
                { num: '1', label: 'Internship' },
                { num: '2026', label: 'Graduating' },
              ].map(stat => (
                <div key={stat.label}>
                  <p style={{
                    fontSize: '2rem',
                    fontWeight: 700,
                    letterSpacing: '-0.04em',
                    color: 'var(--text-primary)',
                    lineHeight: 1,
                  }}>
                    {stat.num}
                  </p>
                  <p className="t-caption" style={{ marginTop: '0.25rem' }}>{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Contact links */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
              <a
                href="mailto:vishvmunjapara23@gmail.com"
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'var(--accent-blue)',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  border: '1px solid rgba(0,113,227,0.25)',
                  padding: '0.45rem 1rem',
                  borderRadius: '100px',
                  transition: 'background var(--transition-fast)',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,113,227,0.06)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                ✉ Email Me
              </a>
              <a
                href="https://www.linkedin.com/in/vishv-munjapara-53b076219/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  border: '1px solid var(--border-medium)',
                  padding: '0.45rem 1rem',
                  borderRadius: '100px',
                  transition: 'background var(--transition-fast)',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-secondary)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                LinkedIn ↗
              </a>
            </div>
          </motion.div>

          {/* Right: Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              style={{
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-medium)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.09)',
                overflow: 'hidden',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                lineHeight: 1.7,
                background: '#1c1c1e',
                color: '#d1d1d6',
              }}
            >
              {/* Title bar */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.875rem 1.25rem',
                background: '#2c2c2e',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57', display: 'block' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e', display: 'block' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840', display: 'block' }} />
                <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)', marginLeft: '0.75rem' }}>
                  zsh — vishv@portfolio ~ 80x24
                </span>
              </div>

              {/* Terminal body */}
              <div style={{ padding: '1.25rem 1.5rem', minHeight: '420px' }}>
                {visibleLines.map((line, i) => (
                  <div key={i} style={{ marginBottom: '0.05rem' }}>
                    {line.type === 'cmd' ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: i === 0 ? 0 : '0.4rem' }}>
                        <span style={{ color: '#30d158', fontWeight: 600 }}>❯</span>
                        <span style={{ color: '#e5e5ea' }}>{line.text}</span>
                      </div>
                    ) : line.type === 'blank' ? (
                      <div style={{ height: '0.5rem' }} />
                    ) : (
                      <span style={{ color: '#aeaeb2', paddingLeft: '1.25rem', display: 'block' }}>{line.text}</span>
                    )}
                  </div>
                ))}
                {/* Blinking cursor */}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.85, repeat: Infinity }}
                  style={{
                    display: 'inline-block',
                    width: '8px',
                    height: '14px',
                    background: '#6e3ff3',
                    borderRadius: '2px',
                    marginTop: '0.25rem',
                    marginLeft: '1.25rem',
                    verticalAlign: 'middle',
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: start;
        }
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default memo(AboutTerminal);

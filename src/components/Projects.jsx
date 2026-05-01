import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Code, ArrowUpRight } from 'lucide-react';
import { projects } from '../data/projects';

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

const ProjectCard = memo(({ project, index }) => {
  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className={`card project-card card--${project.span}`}
      style={{ padding: '2rem', cursor: 'default', display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'relative', overflow: 'hidden' }}
    >
      {/* Accent strip */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '3px',
          background: project.accent,
          opacity: 0.7,
          borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
        }}
      />

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p className="t-caption" style={{ marginBottom: '0.4rem' }}>{project.category}</p>
          <h3 className="t-title" style={{ color: 'var(--text-primary)' }}>{project.title}</h3>
        </div>
        <span className="t-caption" style={{ color: 'var(--text-tertiary)', flexShrink: 0, marginLeft: '1rem' }}>
          {project.year}
        </span>
      </div>

      {/* Description */}
      <p style={{ fontSize: '0.9375rem', lineHeight: 1.65, color: 'var(--text-secondary)', flex: 1 }}>
        {project.description}
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
        {project.tags.map(tag => (
          <span
            key={tag}
            style={{
              fontSize: '0.75rem',
              fontWeight: 500,
              padding: '0.2rem 0.65rem',
              borderRadius: '100px',
              background: 'var(--bg-secondary)',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-subtle)',
              letterSpacing: '-0.01em',
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer links */}
      <div style={{ display: 'flex', gap: '1.25rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border-subtle)' }}>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View source code on GitHub"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.3rem',
            fontSize: '0.8125rem',
            fontWeight: 500,
            color: 'var(--text-secondary)',
            textDecoration: 'none',
            transition: 'color var(--transition-fast)',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
        >
          <Code size={14} /> Source
        </a>
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View live project"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontSize: '0.8125rem',
              fontWeight: 500,
              color: 'var(--accent-blue)',
              textDecoration: 'none',
              transition: 'color var(--transition-fast)',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-blue-hover)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--accent-blue)'}
          >
            <ArrowUpRight size={14} /> Live Demo
          </a>
        )}
      </div>
    </motion.article>
  );
});

const Projects = () => {
  return (
    <section id="projects" style={{ position: 'relative', zIndex: 1, padding: '7rem 0' }}>
      <div className="section-container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '3.5rem' }}
        >
          <p className="t-caption" style={{ marginBottom: '0.75rem', color: 'var(--accent-blue)' }}>
            Selected Works
          </p>
          <h2 className="t-headline">Projects that speak<br />for themselves.</h2>
        </motion.div>

        {/* Bento grid */}
        <div className="bento-grid">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-auto-rows: minmax(280px, auto);
          gap: 1.25rem;
        }
        .card--large { grid-column: span 2; }
        .card--medium { grid-column: span 2; }
        .card--small { grid-column: span 1; }

        @media (max-width: 768px) {
          .bento-grid { grid-template-columns: 1fr; }
          .card--large, .card--medium, .card--small { grid-column: span 1; }
        }
      `}</style>
    </section>
  );
};

export default memo(Projects);

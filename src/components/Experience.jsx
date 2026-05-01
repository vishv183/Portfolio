import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, MapPin, Calendar } from 'lucide-react';
import { experiences, education } from '../data/experience';

const TimelineItem = memo(({ item, index, isLast }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    style={{ display: 'flex', gap: '1.5rem', position: 'relative' }}
  >
    {/* Timeline spine */}
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 300, damping: 20, delay: index * 0.1 + 0.2 }}
        style={{
          width: '14px',
          height: '14px',
          borderRadius: '50%',
          background: item.color,
          border: '3px solid #fff',
          boxShadow: `0 0 0 4px ${item.color}20`,
          zIndex: 2,
          marginTop: '6px',
        }}
      />
      {!isLast && (
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.1 + 0.4, ease: 'easeInOut' }}
          style={{
            width: '2px',
            flex: 1,
            background: `linear-gradient(to bottom, ${item.color}40, var(--border-subtle))`,
            transformOrigin: 'top',
            marginTop: '4px',
            marginBottom: '4px',
          }}
        />
      )}
    </div>

    {/* Content */}
    <div
      className="experience-item"
      style={{
        flex: 1,
        paddingBottom: isLast ? 0 : '3rem',
        position: 'relative',
        transition: 'transform var(--transition-fast)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.75rem' }}>
        <div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: '0.4rem' }}>
            {item.role || item.degree}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            <p style={{ fontSize: '0.9375rem', fontWeight: 500, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              {item.company || item.institution}
            </p>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <MapPin size={13} /> {item.location}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {item.type && (
              <span style={{
                fontSize: '0.6875rem',
                fontWeight: 700,
                padding: '0.2rem 0.6rem',
                borderRadius: '6px',
                background: `${item.color}10`,
                color: item.color,
                border: `1px solid ${item.color}20`,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}>
                {item.type}
              </span>
            )}
            <span style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Calendar size={13} /> {item.period}
            </span>
          </div>
        </div>
      </div>

      {item.bullets && (
        <ul style={{ marginBottom: '1.25rem', paddingLeft: '0.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {item.bullets.map((b, i) => (
            <li key={i} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, listStyle: 'none', position: 'relative', paddingLeft: '1.25rem' }}>
              <span style={{ position: 'absolute', left: 0, top: '0.6rem', width: '4px', height: '4px', borderRadius: '50%', background: item.color, opacity: 0.6 }} />
              {b}
            </li>
          ))}
        </ul>
      )}

      {item.tags && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {item.tags.map(tag => (
            <span
              key={tag}
              style={{
                fontSize: '0.75rem',
                fontWeight: 500,
                padding: '0.2rem 0.6rem',
                borderRadius: '980px',
                background: 'var(--bg-secondary)',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  </motion.div>
));

const Experience = () => {
  return (
    <section id="experience" style={{ position: 'relative', zIndex: 1, padding: '8rem 0', background: 'linear-gradient(to bottom, #fff, var(--bg-secondary) 50%, #fff)' }}>
      <div className="section-container">
        <div className="experience-grid">

          {/* Experience Column */}
          <div className="column">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ marginBottom: '3.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}
            >
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(0,113,227,0.1)', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Briefcase size={24} />
              </div>
              <div>
                <p className="t-caption" style={{ color: 'var(--accent-blue)', marginBottom: '0.25rem' }}>Professional</p>
                <h2 className="t-headline" style={{ fontSize: '2rem' }}>Experience</h2>
              </div>
            </motion.div>
            
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {experiences.map((exp, i) => (
                <TimelineItem key={i} item={exp} index={i} isLast={i === experiences.length - 1} />
              ))}
            </div>
          </div>

          {/* Education Column */}
          <div className="column">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ marginBottom: '3.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}
            >
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(110,63,243,0.1)', color: 'var(--accent-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <GraduationCap size={24} />
              </div>
              <div>
                <p className="t-caption" style={{ color: 'var(--accent-purple)', marginBottom: '0.25rem' }}>Academic</p>
                <h2 className="t-headline" style={{ fontSize: '2rem' }}>Education</h2>
              </div>
            </motion.div>
            
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {education.map((edu, i) => (
                <TimelineItem key={i} item={edu} index={i} isLast={i === education.length - 1} />
              ))}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .experience-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 6rem;
          align-items: start;
        }
        
        .experience-item:hover {
          transform: translateX(4px);
        }

        @media (max-width: 992px) {
          .experience-grid {
            grid-template-columns: 1fr;
            gap: 4rem;
          }
        }
      `}</style>
    </section>
  );
};

export default memo(Experience);

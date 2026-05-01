import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { skillGroups } from '../data/skills';

const SkillCard = memo(({ name, Icon, color, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.88 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
    whileHover={{ y: -4, transition: { duration: 0.2 } }}
    className="card"
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.6rem',
      padding: '1.25rem 1rem',
      cursor: 'default',
      borderRadius: 'var(--radius-md)',
    }}
  >
    <div
      style={{
        width: '2.5rem',
        height: '2.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '10px',
        background: `${color}14`,
        color: color,
        fontSize: '1.4rem',
        flexShrink: 0,
      }}
    >
      <Icon />
    </div>
    <span style={{
      fontSize: '0.78rem',
      fontWeight: 600,
      color: 'var(--text-secondary)',
      letterSpacing: '-0.01em',
      textAlign: 'center',
    }}>
      {name}
    </span>
  </motion.div>
));

const Skills = () => {
  let globalIndex = 0;
  return (
    <section id="skills" style={{ position: 'relative', zIndex: 1, padding: '7rem 0' }}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '3.5rem' }}
        >
          <p className="t-caption" style={{ marginBottom: '0.75rem', color: 'var(--accent-blue)' }}>
            Technical Skills
          </p>
          <h2 className="t-headline">The tools I<br />wield daily.</h2>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {skillGroups.map(group => (
            <div key={group.label}>
              <p className="t-caption" style={{ marginBottom: '1rem', color: 'var(--text-tertiary)' }}>
                {group.label}
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                gap: '0.75rem',
              }}>
                {group.skills.map(skill => (
                  <SkillCard key={skill.name} {...skill} index={globalIndex++} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(Skills);

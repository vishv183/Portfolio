import React, { memo } from 'react';
import { motion } from 'framer-motion';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
});

const Hero = () => {
  return (
    <section
      style={{
        position: 'relative',
        zIndex: 1,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '8rem 2rem 6rem',
      }}
    >
      {/* Eyebrow label */}
      <motion.p
        {...fadeUp(0.05)}
        className="t-caption"
        style={{ marginBottom: '1.5rem', color: 'var(--accent-blue)' }}
      >
        Backend Developer · Django · Python
      </motion.p>

      {/* Main heading */}
      <motion.h1
        {...fadeUp(0.15)}
        className="t-hero"
        style={{ maxWidth: '900px' }}
      >
        Hi, I'm Vishv.{' '}
        <span
          style={{
            background: 'linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-purple) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          I build backends
        </span>{' '}
        that last.
      </motion.h1>

      {/* Subheading */}
      <motion.p
        {...fadeUp(0.25)}
        className="t-body"
        style={{
          maxWidth: '540px',
          marginTop: '1.75rem',
          fontSize: '1.125rem',
          lineHeight: '1.7',
        }}
      >
        Backend developer with hands-on experience in Python, Django & REST APIs.
        Passionate about clean architecture, reliable systems, and Linux.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        {...fadeUp(0.35)}
        style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem', flexWrap: 'wrap', justifyContent: 'center' }}
      >
        <a
          href="#projects"
          id="cta-view-projects"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.75rem',
            background: 'var(--accent-blue)',
            color: '#fff',
            borderRadius: '980px',
            fontWeight: 500,
            fontSize: '0.9375rem',
            textDecoration: 'none',
            transition: 'background var(--transition-fast), transform var(--transition-fast)',
            letterSpacing: '-0.01em',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-blue-hover)'; e.currentTarget.style.transform = 'scale(1.02)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent-blue)'; e.currentTarget.style.transform = 'scale(1)'; }}
        >
          View Projects
        </a>
        <a
          href="mailto:vishvmunjapara23@gmail.com"
          id="cta-contact"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.75rem',
            background: 'transparent',
            color: 'var(--text-secondary)',
            borderRadius: '980px',
            fontWeight: 500,
            fontSize: '0.9375rem',
            textDecoration: 'none',
            border: '1px solid var(--border-medium)',
            transition: 'border-color var(--transition-fast), color var(--transition-fast), transform var(--transition-fast)',
            letterSpacing: '-0.01em',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.3)'; e.currentTarget.style.transform = 'scale(1.02)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-medium)'; e.currentTarget.style.transform = 'scale(1)'; }}
        >
          Get in Touch
        </a>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <p className="t-caption" style={{ color: 'var(--text-tertiary)' }}>Scroll</p>
        <div
          style={{
            width: '1px',
            height: '40px',
            background: 'var(--border-medium)',
            borderRadius: '2px',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <motion.div
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', background: 'var(--accent-blue)', height: '100%' }}
            animate={{ scaleY: [0, 1, 0], originY: [0, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;

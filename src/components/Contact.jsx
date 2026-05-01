import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

// ⚠️  Replace these with your EmailJS credentials in the .env file
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const Contact = () => {
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic Validation
    if (!form.name || !form.email || !form.message) return;

    // Simple email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    setStatus('sending');
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          message: form.message,
          to_email: 'vishvmunjapara23@gmail.com',
          reply_to: form.email,
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      setForm({ name: '', email: '', message: '' });

      // Reset status after 6 seconds
      setTimeout(() => setStatus('idle'), 6000);
    } catch (error) {
      console.error('EmailJS Error Object:', error);
      console.error('EmailJS Error Message:', error?.text || error?.message || 'Unknown error');

      if (!EMAILJS_SERVICE_ID || EMAILJS_SERVICE_ID.includes('your_')) {
        console.warn('⚠️ EmailJS credentials seem to be placeholders. Please update your .env file.');
      }

      setStatus('error');
    }
  };


  const inputStyle = {
    width: '100%',
    padding: '0.875rem 1rem',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--border-medium)',
    background: 'var(--bg-primary)',
    color: 'var(--text-primary)',
    fontSize: '0.9375rem',
    fontFamily: 'var(--font-main)',
    outline: 'none',
    transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
    letterSpacing: '-0.01em',
  };

  const handleFocus = (e) => {
    e.target.style.borderColor = 'var(--accent-blue)';
    e.target.style.boxShadow = '0 0 0 3px rgba(0,113,227,0.1)';
  };
  const handleBlur = (e) => {
    e.target.style.borderColor = 'var(--border-medium)';
    e.target.style.boxShadow = 'none';
  };

  return (
    <section id="contact" style={{ position: 'relative', zIndex: 1, padding: '7rem 0' }}>
      <div className="section-container">
        <div className="contact-grid">

          {/* Left copy */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="t-caption" style={{ marginBottom: '0.75rem', color: 'var(--accent-blue)' }}>
              Get in Touch
            </p>
            <h2 className="t-headline" style={{ marginBottom: '1.25rem' }}>
              Let's work<br />together.
            </h2>
            <p className="t-body" style={{ marginBottom: '2rem' }}>
              Whether you have a role in mind, a project to discuss, or just want
              to say hi — my inbox is always open.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { label: 'Email', value: 'vishvmunjapara23@gmail.com', href: 'mailto:vishvmunjapara23@gmail.com' },
                { label: 'GitHub', value: 'github.com/vishv183', href: 'https://github.com/vishv183' },
                { label: 'LinkedIn', value: 'vishv-munjapara', href: 'https://www.linkedin.com/in/vishv-munjapara-53b076219/' },
              ].map(link => (
                <div key={link.label} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <span className="t-caption" style={{ width: '56px', color: 'var(--text-tertiary)', flexShrink: 0 }}>
                    {link.label}
                  </span>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: 'var(--accent-blue)',
                      textDecoration: 'none',
                      letterSpacing: '-0.01em',
                    }}
                    onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                    onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
                  >
                    {link.value}
                  </a>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Hidden field so EmailJS knows the recipient even if template uses {{to_email}} */}
              <input type="hidden" name="to_email" value="vishvmunjapara23@gmail.com" />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label htmlFor="contact-name" className="t-caption" style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    required
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="t-caption" style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    required
                    style={inputStyle}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="t-caption" style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="Tell me about the opportunity or project..."
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  required
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
                />
              </div>

              <button
                id="contact-submit"
                type="submit"
                disabled={status === 'sending'}
                style={{
                  padding: '0.875rem 2rem',
                  background: status === 'sending' ? 'var(--text-tertiary)' : 'var(--accent-blue)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '980px',
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  fontFamily: 'var(--font-main)',
                  cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                  transition: 'background var(--transition-fast), transform var(--transition-fast)',
                  letterSpacing: '-0.01em',
                  alignSelf: 'flex-start',
                }}
                onMouseEnter={e => { if (status !== 'sending') e.currentTarget.style.background = 'var(--accent-blue-hover)'; }}
                onMouseLeave={e => { if (status !== 'sending') e.currentTarget.style.background = 'var(--accent-blue)'; }}
              >
                {status === 'sending' ? 'Sending…' : 'Send Message →'}
              </button>

              <AnimatePresence>
                {status === 'success' && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{ fontSize: '0.875rem', color: '#30b97e', fontWeight: 500 }}
                  >
                    ✓ Message sent! I'll get back to you soon.
                  </motion.p>
                )}
                {status === 'error' && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{ fontSize: '0.875rem', color: '#ff453a', fontWeight: 500 }}
                  >
                    ✗ Something went wrong. Please email me directly.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 5rem;
          align-items: start;
        }
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;

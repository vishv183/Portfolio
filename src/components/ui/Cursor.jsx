import React, { useEffect, useRef, memo } from 'react';

const Cursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMove);

    const animate = () => {
      // Dot snaps directly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }
      // Ring lags behind with lerp
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 18}px, ${ring.current.y - 18}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Scale ring on hover over interactive elements
    const grow = () => {
      if (ringRef.current) {
        ringRef.current.style.width = '50px';
        ringRef.current.style.height = '50px';
        ringRef.current.style.opacity = '0.5';
        ringRef.current.style.marginLeft = '-7px';
        ringRef.current.style.marginTop = '-7px';
      }
    };
    const shrink = () => {
      if (ringRef.current) {
        ringRef.current.style.width = '36px';
        ringRef.current.style.height = '36px';
        ringRef.current.style.opacity = '0.6';
        ringRef.current.style.marginLeft = '0px';
        ringRef.current.style.marginTop = '0px';
      }
    };
    const targets = document.querySelectorAll('a, button, [role="button"]');
    targets.forEach(el => {
      el.addEventListener('mouseenter', grow);
      el.addEventListener('mouseleave', shrink);
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
      targets.forEach(el => {
        el.removeEventListener('mouseenter', grow);
        el.removeEventListener('mouseleave', shrink);
      });
    };
  }, []);

  // Hide on touch devices
  if ('ontouchstart' in window) return null;

  const base = {
    position: 'fixed',
    top: 0,
    left: 0,
    pointerEvents: 'none',
    zIndex: 9999,
    willChange: 'transform',
    transition: 'width 0.2s, height 0.2s, opacity 0.2s',
  };

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          ...base,
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: 'var(--accent-blue)',
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        style={{
          ...base,
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: '1.5px solid var(--accent-blue)',
          opacity: 0.6,
        }}
      />
    </>
  );
};

export default Cursor;

import React, { useEffect, useRef, memo } from 'react';

const Background = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let raf;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const onMouse = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouse);

    // Static dots grid
    const dots = [];
    const spacing = 48;
    for (let x = 0; x < window.innerWidth + spacing; x += spacing) {
      for (let y = 0; y < window.innerHeight + spacing; y += spacing) {
        dots.push({ x, y, baseOpacity: 0.08 + Math.random() * 0.05 });
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Base: clean white
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Very soft top-left gradient tint
      const g1 = ctx.createRadialGradient(0, 0, 0, 0, 0, canvas.width * 0.7);
      g1.addColorStop(0, 'rgba(110, 63, 243, 0.04)');
      g1.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Mouse glow — subtle, warm
      const { x: mx, y: my } = mouseRef.current;
      const g2 = ctx.createRadialGradient(mx, my, 0, mx, my, 400);
      g2.addColorStop(0, 'rgba(0, 113, 227, 0.05)');
      g2.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Dot grid
      dots.forEach(dot => {
        const dx = dot.x - mx;
        const dy = dot.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const proximity = Math.max(0, 1 - dist / 200);
        const opacity = dot.baseOpacity + proximity * 0.3;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 0,
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
      }}
    />
  );
};

export default Background;

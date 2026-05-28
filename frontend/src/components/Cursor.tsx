import React, { useEffect, useRef } from 'react';

const Cursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = mouseX + 'px';
        dotRef.current.style.top = mouseY + 'px';
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.left = ringX + 'px';
        ringRef.current.style.top = ringY + 'px';
      }
      requestAnimationFrame(animate);
    };

    const onEnterLink = () => {
      if (dotRef.current) dotRef.current.style.transform = 'translate(-50%, -50%) scale(1.8)';
      if (ringRef.current) { ringRef.current.style.width = '60px'; ringRef.current.style.height = '60px'; ringRef.current.style.borderColor = 'rgba(0,245,255,0.8)'; }
    };

    const onLeaveLink = () => {
      if (dotRef.current) dotRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
      if (ringRef.current) { ringRef.current.style.width = '36px'; ringRef.current.style.height = '36px'; ringRef.current.style.borderColor = 'rgba(0,245,255,0.5)'; }
    };

    document.addEventListener('mousemove', onMove);
    document.querySelectorAll('a, button, .project-card, .skill-card').forEach(el => {
      el.addEventListener('mouseenter', onEnterLink);
      el.addEventListener('mouseleave', onLeaveLink);
    });

    animate();
    return () => document.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  );
};

export default Cursor;

import React, { useEffect, useRef } from 'react';

/**
 * High-performance Canvas Particle Background
 * Renders floating fairy dust, twinkling stars, soft floating hearts, and glowing orbs.
 */
export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Generate stars, dust, and floating hearts
    const particleCount = Math.min(Math.floor((width * height) / 14000), 75);
    const particles = [];

    const colors = [
      'rgba(244, 114, 182, 0.7)', // Pink
      'rgba(216, 180, 254, 0.7)', // Lavender
      'rgba(251, 191, 36, 0.7)',  // Gold
      'rgba(254, 215, 170, 0.6)', // Peach
      'rgba(255, 255, 255, 0.8)', // White
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.35,
        vy: -Math.random() * 0.5 - 0.15, // float upward
        alpha: Math.random() * 0.7 + 0.3,
        alphaChange: (Math.random() * 0.01 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
        isHeart: Math.random() > 0.85,
        heartScale: Math.random() * 0.4 + 0.3,
      });
    }

    // Draw small romantic heart on canvas
    const drawHeart = (context, x, y, scale, color, alpha) => {
      context.save();
      context.translate(x, y);
      context.scale(scale, scale);
      context.beginPath();
      context.moveTo(0, 0);
      context.bezierCurveTo(-4, -6, -10, -3, -10, 3);
      context.bezierCurveTo(-10, 8, -4, 12, 0, 16);
      context.bezierCurveTo(4, 12, 10, 8, 10, 3);
      context.bezierCurveTo(10, -3, 4, -6, 0, 0);
      context.fillStyle = color;
      context.globalAlpha = alpha * 0.8;
      context.shadowBlur = 10;
      context.shadowColor = 'rgba(244, 114, 182, 0.6)';
      context.fill();
      context.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Twinkle
        p.alpha += p.alphaChange;
        if (p.alpha <= 0.2 || p.alpha >= 0.9) {
          p.alphaChange = -p.alphaChange;
        }

        // Wrap around borders
        if (p.y < -20) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 10;
        if (p.x > width + 20) p.x = -10;

        if (p.isHeart) {
          drawHeart(ctx, p.x, p.y, p.heartScale, p.color, p.alpha);
        } else {
          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.shadowBlur = p.radius > 2 ? 12 : 6;
          ctx.shadowColor = p.color;
          ctx.fill();
          ctx.restore();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}

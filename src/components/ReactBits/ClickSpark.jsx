import React, { useEffect, useRef } from 'react';

/**
 * React Bits — ClickSpark
 * Renders crisp golden & rose radial sparks + micro floating stars on every mouse click.
 */
export default function ClickSpark({
  sparkColor = '#FCBC5B',
  secondaryColor = '#FF7EB6',
  sparkSize = 11,
  sparkRadius = 26,
  sparkCount = 10,
  duration = 480,
}) {
  const canvasRef = useRef(null);
  const sparksRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handlePointerDown = (e) => {
      const now = performance.now();
      for (let i = 0; i < sparkCount; i++) {
        const angle = (2 * Math.PI * i) / sparkCount + (Math.random() - 0.5) * 0.2;
        sparksRef.current.push({
          x: e.clientX,
          y: e.clientY,
          angle,
          startTime: now,
          color: i % 2 === 0 ? sparkColor : secondaryColor,
          radius: sparkRadius * (0.85 + Math.random() * 0.35),
        });
      }
    };

    window.addEventListener('pointerdown', handlePointerDown);

    let rafId;
    const render = (now) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = now - spark.startTime;
        if (elapsed < 0) return true;
        if (elapsed >= duration) return false;

        const progress = Math.max(0, Math.min(1, elapsed / duration));
        const eased = progress * (2 - progress);
        const dist = Math.max(0, eased * spark.radius);
        const lineLen = Math.max(0, sparkSize * (1 - eased));

        const x1 = spark.x + dist * Math.cos(spark.angle);
        const y1 = spark.y + dist * Math.sin(spark.angle);
        const x2 = spark.x + (dist + lineLen) * Math.cos(spark.angle);
        const y2 = spark.y + (dist + lineLen) * Math.sin(spark.angle);

        ctx.save();
        ctx.strokeStyle = spark.color;
        ctx.shadowColor = spark.color;
        ctx.shadowBlur = 8;
        ctx.lineWidth = Math.max(0.1, 2.2 * (1 - progress * 0.5));
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        // Center micro ring on early frames
        if (progress < 0.45 && dist > 0) {
          const ringRadius = Math.max(0.01, dist * 0.45);
          ctx.beginPath();
          ctx.arc(spark.x, spark.y, ringRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(252, 188, 91, ${Math.max(0, 0.45 * (1 - progress * 2))})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        ctx.restore();

        return true;
      });

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointerdown', handlePointerDown);
      cancelAnimationFrame(rafId);
    };
  }, [sparkColor, secondaryColor, sparkSize, sparkRadius, sparkCount, duration]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9998]"
      aria-hidden="true"
    />
  );
}

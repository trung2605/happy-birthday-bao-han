import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * React Bits — HoloCard
 * Interactive 3D tilt card with holographic rainbow foil sheen, radial cursor spotlight,
 * and sparkly specular highlights.
 */
export function HoloCard({
  children,
  className = '',
  onClick,
  cursorLabel,
  intensity = 11,
  borderRadius = '24px',
}) {
  const cardRef = useRef(null);
  const [styleVars, setStyleVars] = useState({
    rotateX: 0,
    rotateY: 0,
    glareX: 50,
    glareY: 50,
    hovered: false,
  });

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    const rotateY = (px - 0.5) * intensity * 2;
    const rotateX = (0.5 - py) * intensity * 2;

    setStyleVars({
      rotateX,
      rotateY,
      glareX: Math.round(px * 100),
      glareY: Math.round(py * 100),
      hovered: true,
    });
  };

  const handleMouseLeave = () => {
    setStyleVars({
      rotateX: 0,
      rotateY: 0,
      glareX: 50,
      glareY: 50,
      hovered: false,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      data-cursor-label={cursorLabel}
      style={{
        perspective: '1200px',
      }}
      className="relative"
    >
      <div
        style={{
          borderRadius,
          transform: `rotateX(${styleVars.rotateX.toFixed(
            2
          )}deg) rotateY(${styleVars.rotateY.toFixed(2)}deg) scale(${
            styleVars.hovered ? 1.012 : 1
          })`,
          transition: styleVars.hovered
            ? 'transform 80ms ease-out'
            : 'transform 450ms cubic-bezier(0.22, 1, 0.36, 1)',
          transformStyle: 'preserve-3d',
        }}
        className={`relative overflow-hidden ${className}`}
      >
        {children}

        {/* Holographic Foil Rainbow Overlay */}
        <div
          aria-hidden="true"
          style={{
            borderRadius,
            opacity: styleVars.hovered ? 0.34 : 0,
            background: `
              radial-gradient(
                circle at ${styleVars.glareX}% ${styleVars.glareY}%,
                rgba(255, 255, 255, 0.65) 0%,
                rgba(252, 188, 91, 0.35) 22%,
                rgba(255, 126, 182, 0.32) 45%,
                rgba(167, 139, 250, 0.28) 68%,
                transparent 85%
              ),
              repeating-linear-gradient(
                ${115 + styleVars.rotateY * 2}deg,
                rgba(255, 126, 182, 0.14) 0%,
                rgba(252, 188, 91, 0.18) 14%,
                rgba(134, 239, 172, 0.14) 28%,
                rgba(147, 197, 253, 0.18) 42%,
                rgba(196, 181, 253, 0.16) 56%,
                rgba(255, 126, 182, 0.14) 70%
              )
            `,
            mixBlendMode: 'soft-light',
          }}
          className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300"
        />

        {/* Specular Border Glint */}
        <div
          aria-hidden="true"
          style={{
            borderRadius,
            opacity: styleVars.hovered ? 0.75 : 0,
            background: `radial-gradient(320px circle at ${styleVars.glareX}% ${styleVars.glareY}%, rgba(252,188,91,0.42), transparent 70%)`,
          }}
          className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
        />
      </div>
    </div>
  );
}

/**
 * React Bits — FlyingButton & StarBorder
 * Button with an orbiting starlight border that launches floating hearts/sparkles when clicked.
 */
export function FlyingButton({
  children,
  onClick,
  className = '',
  variant = 'gold',
  disabled = false,
  title,
}) {
  const [particles, setParticles] = useState([]);

  const handleClick = (e) => {
    if (disabled) return;
    const now = Date.now();
    const burst = Array.from({ length: 10 }, (_, idx) => ({
      id: `${now}-${idx}`,
      dx: (Math.random() - 0.5) * 150,
      dy: -(45 + Math.random() * 85),
      scale: 0.7 + Math.random() * 0.65,
      rot: (Math.random() - 0.5) * 70,
      kind: idx % 3 === 0 ? 'heart' : idx % 3 === 1 ? 'star' : 'bunny',
    }));
    setParticles((prev) => [...prev.slice(-14), ...burst]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !burst.includes(p)));
    }, 950);

    onClick?.(e);
  };

  const baseStyles =
    variant === 'gold'
      ? 'bg-gradient-to-r from-gold via-[#ffd280] to-gold text-plum-deep shadow-[0_0_30px_rgba(252,188,91,0.4)] hover:shadow-[0_0_42px_rgba(252,188,91,0.65)]'
      : variant === 'rose'
      ? 'bg-gradient-to-r from-rose via-[#ff9ec7] to-rose text-plum-deep shadow-[0_0_28px_rgba(255,126,182,0.4)]'
      : 'bg-plum-deep/90 text-cream border border-gold/50 hover:bg-plum';

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleClick}
      title={title}
      className={`group relative inline-flex items-center justify-center gap-2 rounded-full p-[2px] font-display font-bold uppercase tracking-wider text-xs cursor-pointer select-none transition-transform active:scale-95 ${className}`}
    >
      {/* Animated StarBorder Ring */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full overflow-hidden"
      >
        <span className="absolute inset-[-100%] animate-spin-slow bg-[conic-gradient(from_0deg,transparent_0_260deg,#FCBC5B_310deg,#FF7EB6_360deg)] opacity-90" />
      </span>

      <span
        className={`relative z-10 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full w-full h-full transition-all ${baseStyles}`}
      >
        {children}
      </span>

      {/* Flying Micro Particles on Click */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.span
            key={p.id}
            initial={{ opacity: 1, x: 0, y: 0, scale: 0.4, rotate: 0 }}
            animate={{
              opacity: 0,
              x: p.dx,
              y: p.dy,
              scale: p.scale,
              rotate: p.rot,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
            className="pointer-events-none absolute left-1/2 top-1/2 z-40"
          >
            {p.kind === 'heart' ? (
              <svg className="w-4 h-4 text-rose fill-rose drop-shadow" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            ) : p.kind === 'star' ? (
              <span className="block w-3.5 h-3.5 bg-gold mask-four-star" />
            ) : (
              <svg className="w-4 h-4 text-cream fill-cream drop-shadow" viewBox="0 0 24 24">
                <ellipse cx="9" cy="6" rx="2" ry="5" />
                <ellipse cx="15" cy="6" rx="2" ry="5" />
                <circle cx="12" cy="14" r="5.5" />
              </svg>
            )}
          </motion.span>
        ))}
      </AnimatePresence>
    </button>
  );
}

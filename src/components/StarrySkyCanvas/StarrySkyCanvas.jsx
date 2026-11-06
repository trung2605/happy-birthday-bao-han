import React, { useEffect, useRef } from "react";
import { useSpring, animated } from "@react-spring/web";

export default function StarrySkyCanvas() {
  const canvasRef = useRef(null);

  // Parallax moon spring reactive to pointer movement
  const [moonSpring, moonApi] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 2, tension: 120, friction: 30 },
  }));

  useEffect(() => {
    const onMove = (e) => {
      const mx = (e.clientX / window.innerWidth - 0.5) * -28;
      const my = (e.clientY / window.innerHeight - 0.5) * -18;
      moonApi.start({ xy: [mx, my] });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [moonApi]);

  // Canvas: twinkling stars + shooting stars + falling rose/sakura petals (from Itz-Murali)
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const x = c.getContext("2d");
    let w = window.innerWidth;
    let h = window.innerHeight;
    let stars = [];
    let petals = [];
    let shots = [];
    let rafId;
    const R = Math.random;

    const newPetal = (anyY) => ({
      x: R() * w,
      y: anyY ? R() * h : -20,
      s: 6 + R() * 8,
      vy: 0.45 + R() * 0.85,
      vx: 0.25 + R() * 0.7,
      a: R() * 6,
      va: (R() - 0.5) * 0.028,
      f: R() * 6,
      ff: 0.018 + R() * 0.026,
      h: 330 + R() * 25,
    });

    const resize = () => {
      const d = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      c.width = w * d;
      c.height = h * d;
      x.setTransform(d, 0, 0, d, 0, 0);

      stars = Array.from({ length: Math.floor((w * h) / 6000) }, () => ({
        x: R() * w,
        y: R() * h * 0.85,
        r: 0.4 + R() * 1.5,
        s: R() * 6,
        f: 0.5 + R() * 2,
      }));

      petals = Array.from({ length: Math.min(24, Math.floor(w / 26)) }, () =>
        newPetal(true)
      );
    };

    const drawPetal = (p) => {
      x.save();
      x.translate(p.x, p.y);
      x.rotate(p.a);
      x.scale(Math.cos(p.f), 1);
      const g = x.createLinearGradient(0, -p.s, 0, p.s);
      g.addColorStop(0, `hsla(${p.h}, 100%, 92%, 0.88)`);
      g.addColorStop(1, `hsla(${p.h}, 85%, 72%, 0.82)`);
      x.fillStyle = g;
      x.shadowColor = "rgba(255, 150, 200, 0.55)";
      x.shadowBlur = 6;
      x.beginPath();
      x.moveTo(0, -p.s);
      x.bezierCurveTo(p.s, -p.s * 0.6, p.s * 0.9, p.s * 0.6, 0, p.s);
      x.bezierCurveTo(-p.s * 0.9, p.s * 0.6, -p.s, -p.s * 0.6, 0, -p.s);
      x.fill();
      x.restore();
    };

    let lastShot = 0;
    const draw = (t) => {
      x.clearRect(0, 0, w, h);

      // Twinkling stars
      for (const s of stars) {
        const alpha = 0.3 + 0.7 * Math.abs(Math.sin((t / 1000) * s.f + s.s));
        x.fillStyle = `rgba(255, 250, 235, ${alpha})`;
        x.beginPath();
        x.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        x.fill();
      }

      // Shooting stars
      if (t - lastShot > 3200 + R() * 2800) {
        lastShot = t;
        shots.push({ x: R() * w * 0.8 + w * 0.15, y: R() * h * 0.32, l: 0 });
      }
      shots = shots.filter((s) => s.l < 1);
      for (const s of shots) {
        s.l += 0.018;
        const px = s.x - s.l * 260;
        const py = s.y + s.l * 140;
        const g = x.createLinearGradient(px, py, px + 90, py - 49);
        g.addColorStop(0, `rgba(255, 255, 255, ${1 - s.l})`);
        g.addColorStop(1, "rgba(255, 255, 255, 0)");
        x.strokeStyle = g;
        x.lineWidth = 2.2;
        x.lineCap = "round";
        x.beginPath();
        x.moveTo(px, py);
        x.lineTo(px + 90, py - 49);
        x.stroke();
      }

      // Falling sakura / rose petals
      for (const p of petals) {
        p.y += p.vy;
        p.x += p.vx + Math.sin(t / 900 + p.f) * 0.55;
        p.a += p.va;
        p.f += p.ff;
        if (p.y > h + 20 || p.x > w + 30) {
          Object.assign(p, newPetal(false), { x: R() * w - w * 0.15 });
        }
        drawPetal(p);
      }

      rafId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    rafId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Twilight to Starry Night Sky Gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #060921 0%, #171247 28%, #3D1A5B 56%, #7E2661 80%, #241030 100%)",
        }}
      />

      {/* Glowing Full Moon */}
      <animated.div
        style={{
          transform: moonSpring.xy.to(
            (mx, my) => `translate3d(${mx}px, ${my}px, 0)`
          ),
        }}
        className="absolute right-[6vw] top-[7vh] w-28 sm:w-40 md:w-52 aspect-square rounded-full opacity-90"
      >
        <div
          className="w-full h-full rounded-full animate-pulse-glow"
          style={{
            background:
              "radial-gradient(circle at 35% 35%, #fffbe8, #ffe6a8 55%, #ffc98a)",
            boxShadow:
              "0 0 60px 20px rgba(255, 220, 150, 0.45), 0 0 180px 70px rgba(255, 150, 200, 0.28)",
          }}
        />
      </animated.div>

      {/* Soft Dreamy Clouds */}
      <div
        className="absolute top-[18vh] left-0 w-[200vw] h-[30vh] opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 24% 38% at 15% 60%, rgba(255,255,255,0.22), transparent 70%), radial-gradient(ellipse 30% 46% at 48% 45%, rgba(255,170,220,0.22), transparent 70%), radial-gradient(ellipse 20% 34% at 80% 65%, rgba(255,255,255,0.18), transparent 70%)",
          animation: "driftCloud 75s linear infinite",
        }}
      />

      {/* Star & Petal Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Distant Silhouette Hills */}
      <div
        className="absolute inset-x-0 bottom-0 h-[16vh] opacity-80"
        style={{
          background:
            'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1200 200\' preserveAspectRatio=\'none\'%3E%3Cpath fill=\'%23090619\' d=\'M0 200V125Q100 60 200 112T400 92T600 125T800 70T1000 112T1200 82V200Z\'/%3E%3C/svg%3E") bottom/100% 100% no-repeat',
        }}
      />
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";

/**
 * Custom interactive cursor inspired by giaimamanhai.vercel.app (.cursor-dot + .cursor-ring + .cursor-label)
 */
export default function CustomCursor() {
  const [cursorLabel, setCursorLabel] = useState("");
  const [isHoverLink, setIsHoverLink] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [dotSpring, dotApi] = useSpring(() => ({
    x: -100,
    y: -100,
    config: { tension: 850, friction: 38 },
  }));

  const [ringSpring, ringApi] = useSpring(() => ({
    x: -100,
    y: -100,
    config: { tension: 260, friction: 26 },
  }));

  useEffect(() => {
    // Only enable on devices with fine pointer
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (e) => {
      setIsVisible(true);
      dotApi.start({ x: e.clientX, y: e.clientY });
      ringApi.start({ x: e.clientX, y: e.clientY });

      const target = e.target;
      if (!target || !(target instanceof Element)) return;

      const labelEl = target.closest("[data-cursor-label]");
      if (labelEl) {
        setCursorLabel(labelEl.getAttribute("data-cursor-label") || "XEM");
        setIsHoverLink(false);
        return;
      }

      setCursorLabel("");
      const clickable = target.closest("a, button, [role='button']");
      setIsHoverLink(Boolean(clickable));
    };

    const onLeave = () => setIsVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [dotApi, ringApi]);

  if (!isVisible) return null;

  const hasLabel = Boolean(cursorLabel);

  return (
    <div className="pointer-events-none fixed inset-0 z-[200] hidden lg:block overflow-hidden">
      {/* Small gold dot */}
      <animated.div
        style={{
          transform: dotSpring.x.to(
            (x) => `translate3d(${x - 4}px, ${dotSpring.y.get() - 4}px, 0)`
          ),
          opacity: hasLabel ? 0 : 1,
        }}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#FCBC5B] transition-opacity duration-200"
      />

      {/* Outer expanding ring / label bubble */}
      <animated.div
        style={{
          transform: ringSpring.x.to(
            (x) => `translate3d(${x}px, ${ringSpring.y.get()}px, 0)`
          ),
        }}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className={`rounded-full flex items-center justify-center transition-all duration-300 ${
            hasLabel
              ? "w-24 h-24 bg-[#FCBC5B] text-[#140B29] border-2 border-[#FCBC5B] shadow-[0_12px_30px_rgba(252,188,91,0.45)]"
              : isHoverLink
              ? "w-14 h-14 bg-[#FCBC5B]/15 border-[1.5px] border-[#FCBC5B]"
              : "w-10 h-10 border-[1.5px] border-[#FCBC5B]/75"
          }`}
        >
          {hasLabel && (
            <span className="text-[11px] font-bold uppercase tracking-wider text-center px-2 leading-tight">
              {cursorLabel}
            </span>
          )}
        </div>
      </animated.div>
    </div>
  );
}

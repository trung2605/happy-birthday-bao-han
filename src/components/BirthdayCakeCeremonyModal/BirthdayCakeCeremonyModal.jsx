import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Flame,
  Mic,
  Volume2,
  X,
  PartyPopper,
} from 'lucide-react';
import { birthdayGirl } from '../../data/birthdayData';
import BunnyBirthdayCake3D from '../BunnyBirthdayCake3D/BunnyBirthdayCake3D';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

export default function BirthdayCakeCeremonyModal({
  isOpen,
  onClose,
  onStartCelebrationMusic,
}) {
  const [candlesLit, setCandlesLit] = useState(true);
  const [micActive, setMicActive] = useState(false);
  const [micVolume, setMicVolume] = useState(0);
  const [isClosing, setIsClosing] = useState(false);

  const audioCtxRef = useRef(null);
  const micStreamRef = useRef(null);
  const rafRef = useRef(null);

  const fireGrandCelebration = useCallback(() => {
    const count = 220;
    const defaults = { origin: { y: 0.55 }, zIndex: 120 };
    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }
    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#FCBC5B', '#FF7EB6'],
    });
    fire(0.2, { spread: 60, colors: ['#FFEEDF', '#A78BFA'] });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.85 });
    fire(0.2, {
      spread: 130,
      startVelocity: 30,
      decay: 0.92,
      scalar: 1.25,
    });
  }, []);

  const handleBlowOut = useCallback(() => {
    if (!candlesLit) return;
    setCandlesLit(false);
    setMicActive(false);

    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((t) => t.stop());
    }
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
    }

    fireGrandCelebration();
    onStartCelebrationMusic?.();

    // After 2.4s celebration with bunny jumping, slide modal down and unveil regular website
    setTimeout(() => {
      setIsClosing(true);
      setTimeout(() => {
        onClose?.();
      }, 650);
    }, 2400);
  }, [candlesLit, fireGrandCelebration, onClose, onStartCelebrationMusic]);

  // Always automatically request microphone access upon opening
  useEffect(() => {
    if (!isOpen) return;

    let streamObj = null;
    const startMic = async () => {
      try {
        if (!navigator.mediaDevices?.getUserMedia) return;
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        streamObj = stream;
        micStreamRef.current = stream;
        setMicActive(true);

        const AudioContext =
          window.AudioContext || window.webkitAudioContext;
        const audioCtx = new AudioContext();
        audioCtxRef.current = audioCtx;
        const source = audioCtx.createMediaStreamSource(stream);
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        source.connect(analyser);
        const data = new Uint8Array(analyser.frequencyBinCount);

        const checkVolume = () => {
          analyser.getByteFrequencyData(data);
          const avg = data.reduce((sum, v) => sum + v, 0) / data.length;
          setMicVolume(Math.min(100, Math.round(avg * 2.2)));

          // Blow detection threshold
          if (avg > 48) {
            handleBlowOut();
            return;
          }
          rafRef.current = requestAnimationFrame(checkVolume);
        };
        rafRef.current = requestAnimationFrame(checkVolume);
      } catch (err) {
        // User denied mic or mic unavailable: fallback to button click
        setMicActive(false);
      }
    };

    startMic();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach((t) => t.stop());
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, [isOpen, handleBlowOut]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Soft dark starry backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isClosing ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 bg-[#0B0719]/80 backdrop-blur-md"
        />

        {/* Modal Window: slides up, and upon blow-out slides down */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.94 }}
          animate={{
            opacity: isClosing ? 0 : 1,
            y: isClosing ? 90 : 0,
            scale: isClosing ? 0.92 : 1,
          }}
          exit={{ opacity: 0, y: 90, scale: 0.92 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-4xl w-full mx-auto px-5 sm:px-8 py-6 sm:py-8 rounded-[36px] bg-gradient-to-b from-[#24123d]/95 via-[#1a0c2e]/95 to-[#0e071c]/95 border-2 border-gold/70 shadow-[0_32px_100px_rgba(0,0,0,0.92)] text-cream"
        >
          {/* Close button at top right */}
          <button
            type="button"
            onClick={() => {
              setIsClosing(true);
              setTimeout(() => onClose?.(), 450);
            }}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-gold hover:text-plum-deep text-cream/75 transition-colors cursor-pointer"
            title="Đóng & vào trang chính"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left Column: Portrait, Wishes & Controls */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
              <Badge variant="gold" className="mb-3 gap-1.5 px-3.5 py-1">
                <Sparkles className="w-3.5 h-3.5 text-rose" />
                <span>NGHI THỨC THỔI NẾN 3D • THỎ CON 19</span>
              </Badge>

              {/* Portrait Circle with Confetti SVG & Birthday Cap SVG */}
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 mb-3 flex items-center justify-center mx-auto lg:mx-0">
                <img
                  src="/scenes/confetti.svg"
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-[-25%] w-[150%] h-[150%] object-contain pointer-events-none opacity-90"
                />
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-gold shadow-[0_0_30px_rgba(252,188,91,0.5)] bg-plum">
                  <img
                    src={birthdayGirl.avatar}
                    alt={birthdayGirl.fullName}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <img
                  src="/scenes/bday-cap.svg"
                  alt=""
                  aria-hidden="true"
                  className="absolute -top-5 right-0 w-12 h-12 object-contain rotate-12 drop-shadow-lg pointer-events-none"
                />
              </div>

              <h2 className="font-script text-3xl sm:text-4xl text-gold drop-shadow leading-tight">
                Happy 19th Birthday, Bảo Hân!
              </h2>

              <p className="text-cream/85 text-xs sm:text-sm mt-2 leading-relaxed">
                {candlesLit
                  ? 'Chiếc bánh kem 3D có chú Thỏ Con (@bunii.817) đội vương miện vàng đang đợi em! Hãy nhắm mắt ước một điều thật đẹp cho tuổi 19 rồi thổi tắt 5 ngọn nến nhé!'
                  : 'Điều ước tuổi 19 của Lưu Nguyễn Bảo Hân đã bay lên bầu trời đêm đầy sao! Chú Thỏ Con cũng đang nhảy tưng bừng chúc mừng công chúa nhỏ của anh!'}
              </p>

              {/* Dynamic Always-On Microphone Indicator Badge */}
              <div className="mt-4 w-full">
                <div
                  className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border text-xs font-display font-bold uppercase tracking-wider transition-all ${
                    micActive
                      ? 'bg-rose/15 border-rose/50 text-rose shadow-[0_0_20px_rgba(255,126,182,0.3)] animate-pulse'
                      : 'bg-gold/15 border-gold/40 text-gold'
                  }`}
                >
                  <div className="relative">
                    <Mic className="w-4 h-4" />
                    {micActive && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose animate-ping" />
                    )}
                  </div>
                  <span>
                    {micActive
                      ? 'Micro Đang Mở • Thổi mạnh vào Mic để tắt nến!'
                      : 'Chạm vào nến hoặc bấm nút bên dưới'}
                  </span>
                </div>

                {/* Animated mic level bar when listening */}
                {micActive && (
                  <div className="mt-2 w-full max-w-[280px] h-1.5 rounded-full bg-white/10 overflow-hidden mx-auto lg:mx-0">
                    <div
                      className="h-full bg-gradient-to-r from-gold via-rose to-amber-400 transition-all duration-75"
                      style={{ width: `${Math.max(6, micVolume)}%` }}
                    />
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              {candlesLit ? (
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mt-4">
                  <Button
                    variant="default"
                    size="lg"
                    onClick={handleBlowOut}
                    className="shadow-[0_0_35px_rgba(252,188,91,0.55)] cursor-pointer"
                  >
                    <Flame className="w-5 h-5 text-amber-500" />
                    <span>Ước Xong Rồi — Thổi Tắt Nến!</span>
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2 mt-4 text-xs font-display font-bold uppercase tracking-wider text-gold">
                  <PartyPopper className="w-4 h-4 text-rose animate-bounce" />
                  <span>Đang mở toàn bộ website chúc mừng em...</span>
                </div>
              )}
            </div>

            {/* Right Column: Interactive 3D WebGL Bunny Birthday Cake */}
            <div className="lg:col-span-7 w-full">
              <div className="rounded-[28px] bg-gradient-to-b from-plum/90 via-[#1d103b]/80 to-plum-deep/90 border border-gold/40 p-3 shadow-inner">
                <BunnyBirthdayCake3D
                  candlesLit={candlesLit}
                  onBlowOut={handleBlowOut}
                  heightClass="h-[290px] sm:h-[340px]"
                  interactiveHint="Kéo chuột xoay bánh 3D 360° • Chạm vào bánh để thổi nến"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

import React, { useState, useRef, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Mail,
  Heart,
  Sparkles,
  RotateCw,
  PartyPopper,
  Cake,
  Rewind,
  Volume2,
  Pause,
} from 'lucide-react';
import { loveLetter, heroProfile } from '../../data/birthdayData';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

export default function LoveLetterAndCard({
  onReplayIntro,
  onDuckCelebrationMusic,
}) {
  const [flipped, setFlipped] = useState(false);
  const [readingLetter, setReadingLetter] = useState(false);
  const voiceRef = useRef(null);

  useEffect(() => {
    return () => {
      if (voiceRef.current) {
        voiceRef.current.pause();
      }
      onDuckCelebrationMusic?.(false);
    };
  }, [onDuckCelebrationMusic]);

  const playAiVoiceClip = (url, isLetter = false) => {
    if (voiceRef.current) {
      voiceRef.current.onended = null;
      voiceRef.current.pause();
    }
    const audio = new Audio(url);
    audio.volume = 1.0;
    voiceRef.current = audio;
    onDuckCelebrationMusic?.(true);
    if (isLetter) setReadingLetter(true);

    audio.onended = () => {
      setReadingLetter(false);
      onDuckCelebrationMusic?.(false);
    };
    audio.onerror = () => {
      setReadingLetter(false);
      onDuckCelebrationMusic?.(false);
    };
    audio.play().catch(() => {
      setReadingLetter(false);
      onDuckCelebrationMusic?.(false);
    });
  };

  const toggleReadLetter = () => {
    if (readingLetter && voiceRef.current) {
      voiceRef.current.pause();
      setReadingLetter(false);
      onDuckCelebrationMusic?.(false);
    } else {
      playAiVoiceClip('/audio/tts/love-letter.mp3', true);
    }
  };

  const handleFlipCard = () => {
    const nextFlipped = !flipped;
    setFlipped(nextFlipped);
    if (nextFlipped) {
      playAiVoiceClip('/audio/tts/flip-card.mp3', false);
    }
  };

  // @react-spring/web 3D 180-degree card flip
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(1200px) rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 450, friction: 75 },
  });

  const handleGrandConfetti = () => {
    const duration = 2800;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FCBC5B', '#FF7EB6', '#FFEEDF'],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FCBC5B', '#FF7EB6', '#FFEEDF'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  return (
    <section id="letter" className="relative z-10 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-gold font-display font-bold uppercase tracking-[0.22em] text-xs mb-2">
              <Mail className="w-4 h-4" />
              <span>CHAPTER 03 // LÁ THƯ TAY & THIỆP 3D</span>
            </div>
            <h2 className="font-display font-black uppercase text-4xl sm:text-6xl text-cream tracking-tight leading-[0.95]">
              LỜI NHẮN GỬI <br />
              <span className="text-gold font-serif italic font-normal capitalize">
                Tuổi 19 Của Bảo Hân
              </span>
            </h2>
          </div>
          <p className="text-cream/75 max-w-md text-sm sm:text-base">
            Chạm vào tấm thiệp 3D bên trái để lật mở điều ước bí mật, và đọc
            những dòng thư tay anh Trung viết riêng cho em.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: 3D Flip Birthday Card (@react-spring/web) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div
              onClick={handleFlipCard}
              data-cursor-label="LẬT THIỆP 3D"
              className="relative w-full max-w-[370px] h-[510px] cursor-pointer select-none"
            >
              {/* Front of Card — Photo 100% Uncovered + Caption Below */}
              <animated.div
                style={{
                  opacity: opacity.to((o) => 1 - o),
                  transform,
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
                className="absolute inset-0 rounded-[28px] overflow-hidden border-2 border-gold/60 bg-cream text-plum-deep shadow-[0_25px_70px_rgba(0,0,0,0.65)] p-5 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between text-xs font-display font-bold uppercase tracking-[0.2em] text-plum-deep/75">
                  <span className="flex items-center gap-1.5">
                    <Cake className="w-4 h-4 text-amber-600" />
                    08.11.2007
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-plum-deep text-gold">
                    19TH EDITION
                  </span>
                </div>

                {/* Uncovered Portrait Image */}
                <div className="relative my-3 flex-1 rounded-[20px] overflow-hidden border-2 border-plum-deep/15 bg-plum-deep">
                  <img
                    src={heroProfile.secondaryPhoto}
                    alt="Lưu Nguyễn Bảo Hân"
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* Title cleanly below image */}
                <div className="text-center pb-1">
                  <p className="font-script text-2xl text-amber-700 font-bold leading-none">
                    Happy 19th Birthday
                  </p>
                  <h3 className="font-display font-black uppercase text-xl text-plum-deep tracking-wider mt-0.5">
                    Lưu Nguyễn Bảo Hân
                  </h3>
                  <div className="flex items-center justify-center gap-1.5 text-[11px] font-display font-bold uppercase tracking-wider text-plum-deep/70 mt-2">
                    <RotateCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Chạm để lật mặt sau tấm thiệp</span>
                  </div>
                </div>
              </animated.div>

              {/* Back of Card — Properly counter-rotated 180deg so text is never mirrored */}
              <animated.div
                style={{
                  opacity,
                  transform: transform.to((t) => `${t} rotateY(180deg)`),
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
                className="absolute inset-0 rounded-[28px] overflow-hidden border-2 border-gold bg-plum-deep p-7 shadow-[0_25px_70px_rgba(0,0,0,0.65)] flex flex-col justify-between text-center"
              >
                <div className="flex items-center justify-center gap-2 text-gold text-xs font-display font-bold uppercase tracking-[0.22em]">
                  <Sparkles className="w-4 h-4" />
                  <span>ĐIỀU ƯỚC TUỔI 19</span>
                  <Sparkles className="w-4 h-4" />
                </div>

                <div className="my-auto space-y-4 px-2">
                  <div className="w-24 h-24 mx-auto rounded-2xl overflow-hidden border-2 border-gold shadow-[0_0_25px_rgba(252,188,91,0.4)] bg-plum">
                    <img
                      src="/scenes/bunny-cake-3d.png"
                      alt="Bánh Kem Thỏ Bún 3D"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-script text-3xl text-gold">
                    Gửi Cô Thỏ Nhỏ Tháng 11!
                  </h4>
                  <p className="text-cream/90 text-sm leading-relaxed">
                    Chúc Bảo Hân tuổi 19 luôn giữ được đôi mắt biết cười, trái
                    tim ấm áp, học thật giỏi tại{' '}
                    <strong className="text-gold">
                      Western Sydney University
                    </strong>
                    , công việc thực tập tại{' '}
                    <strong className="text-gold">AEON</strong> thật suôn sẻ và{' '}
                    <strong className="text-gold">@lop_thephotos</strong> ngày
                    càng đắt show!
                  </p>
                  <div className="pt-2">
                    <Badge variant="gold">YÊU EM NHIỀU HƠN HÔM QUA</Badge>
                  </div>
                </div>

                <div className="text-xs font-display font-bold uppercase tracking-wider text-cream/60 flex items-center justify-center gap-1.5">
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Chạm để lật lại mặt trước</span>
                </div>
              </animated.div>
            </div>
          </div>

          {/* Right: Notebook Paper Handwritten Love Letter */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 relative rounded-[32px] bg-cream text-plum-deep p-7 sm:p-11 shadow-[0_25px_70px_rgba(0,0,0,0.55)] border-4 border-gold/60 overflow-hidden"
          >
            {/* Decorative Stamp & Date + Warm Male AI Voice Button */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-5 mb-6 border-b-2 border-dashed border-plum-deep/20">
              <div className="flex items-center gap-2 text-plum-deep font-display font-bold text-xs uppercase tracking-[0.18em]">
                <Mail className="w-4 h-4 text-amber-600" />
                <span>{loveLetter.date}</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={toggleReadLetter}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-display font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    readingLetter
                      ? 'bg-rose text-plum-deep shadow-md animate-pulse'
                      : 'bg-plum-deep text-gold hover:bg-plum-deep/90 shadow-sm'
                  }`}
                >
                  {readingLetter ? (
                    <>
                      <Pause className="w-3.5 h-3.5" />
                      <span>Đang Đọc Thư (Giọng AI Nam Ấm)...</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe Anh Trung Đọc Thư (Giọng AI Nam Ấm)</span>
                    </>
                  )}
                </button>
                <span className="px-3.5 py-1 rounded-full bg-plum-deep/10 text-plum-deep text-xs font-display font-bold uppercase tracking-wider">
                  {loveLetter.recipient}
                </span>
              </div>
            </div>

            <h3 className="font-script text-3xl sm:text-4xl text-plum-deep font-bold mb-5">
              {loveLetter.title}
            </h3>

            <div className="space-y-4 text-plum-deep/90 text-sm sm:text-base leading-relaxed">
              {loveLetter.paragraphs.map((p, index) => (
                <p key={index} className="leading-7">
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-plum-deep/15 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-plum-deep/65 font-display font-bold">
                  {loveLetter.signOff}
                </p>
                <p className="font-script text-3xl text-plum-deep font-bold mt-1">
                  {loveLetter.signature}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <Button
                  variant="secondary"
                  size="default"
                  onClick={handleGrandConfetti}
                >
                  <PartyPopper className="w-4 h-4 text-gold" />
                  Bắn Pháo Hoa Chúc Mừng
                </Button>
                {onReplayIntro && (
                  <Button
                    variant="outline"
                    size="default"
                    onClick={onReplayIntro}
                    className="border-plum-deep/30 text-plum-deep hover:bg-plum-deep hover:text-cream"
                  >
                    <Rewind className="w-4 h-4" />
                    Xem Lại Câu Chuyện Đầu
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

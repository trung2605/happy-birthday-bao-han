import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import * as THREE from 'three';
import {
  Volume2,
  VolumeX,
  FastForward,
  Sparkles,
  ChevronRight,
  Flame,
  Mic,
  PartyPopper,
  ArrowRight,
} from 'lucide-react';
import { spookyStorySteps, birthdayGirl } from '../../data/birthdayData';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import BunnyBirthdayCake3D from '../BunnyBirthdayCake3D/BunnyBirthdayCake3D';

// ============================================================================
// THREE.JS AMBIENT ATMOSPHERE (Stationary room + floating night dust/spores)
// ============================================================================
function ThreeRoomAtmosphere({ stepId }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 12;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const count = 110;
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 28;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      speeds[i] = 0.004 + Math.random() * 0.01;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const colorMap = {
      darkroom: '#64748b',
      emptyroom: '#93c5fd',
      hallway: '#f87171',
      giftroom: '#FCBC5B',
      cakeroom: '#FCBC5B',
    };

    const material = new THREE.PointsMaterial({
      color: new THREE.Color(colorMap[stepId] || '#FCBC5B'),
      size: stepId === 'giftroom' || stepId === 'cakeroom' ? 0.16 : 0.11,
      transparent: true,
      opacity: stepId === 'darkroom' ? 0.35 : 0.75,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    let frameId;
    let clock = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      clock += 0.015;
      const posAttr = geometry.attributes.position;
      for (let i = 0; i < count; i++) {
        posAttr.array[i * 3 + 1] += speeds[i];
        posAttr.array[i * 3] += Math.sin(clock + i) * 0.003;
        if (posAttr.array[i * 3 + 1] > 9) {
          posAttr.array[i * 3 + 1] = -9;
        }
      }
      posAttr.needsUpdate = true;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [stepId]);

  return (
    <div
      ref={mountRef}
      className="pointer-events-none fixed inset-0 z-10 overflow-hidden"
    />
  );
}

// ============================================================================
// ANIMATED SVG ROOM OVERLAYS (Living room & hallway elements for the story)
// ============================================================================
function AnimatedRoomElements({ stepId }) {
  if (stepId === 'darkroom') {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-10">
        <motion.div
          animate={{ rotate: [-2.5, 2.5, -2.5] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: 'top center' }}
          className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center"
        >
          <div className="w-0.5 h-32 bg-gradient-to-b from-slate-600 to-amber-300/50" />
          <div className="w-4 h-4 rounded-full bg-amber-300/30 blur-sm" />
        </motion.div>
      </div>
    );
  }

  if (stepId === 'emptyroom') {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-10">
        <motion.div
          animate={{ opacity: [0.22, 0.42, 0.22] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-10 right-[12%] w-72 h-[110vh] bg-gradient-to-b from-sky-200/20 via-indigo-300/10 to-transparent -rotate-12 blur-2xl"
        />

        <motion.div
          animate={{ rotate: [-3, 3, -3] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: 'top center' }}
          className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center"
        >
          <div className="w-1 h-16 bg-amber-200/50" />
          <div
            className="w-[420px] h-[380px] bg-gradient-to-b from-amber-200/20 via-amber-100/5 to-transparent"
            style={{ clipPath: 'polygon(46% 0, 54% 0, 100% 100%, 0% 100%)' }}
          />
        </motion.div>

        <motion.svg
          viewBox="0 0 120 400"
          className="absolute top-12 right-6 w-24 h-80 opacity-35 text-indigo-100"
          animate={{ skewX: [0, -5, 2, -3, 0], scaleX: [1, 1.06, 0.98, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path
            d="M0,0 Q40,120 15,240 Q-10,330 35,400 L120,400 L120,0 Z"
            fill="currentColor"
          />
        </motion.svg>
      </div>
    );
  }

  if (stepId === 'hallway') {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-10">
        <motion.div
          animate={{
            opacity: [0.05, 0.28, 0.04, 0.35, 0.08, 0.02, 0.22],
          }}
          transition={{ duration: 3.6, repeat: Infinity }}
          style={{
            background:
              'radial-gradient(circle at 50% 40%, rgba(239,68,68,0.22) 0%, transparent 55%, rgba(0,0,0,0.85) 100%)',
          }}
          className="absolute inset-0"
        />

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{
            opacity: [0, 0.65, 0.65, 0],
            x: [-30, -10, -5, -40],
            scale: [0.95, 1.04, 0.98],
          }}
          transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[28%] left-[18%] sm:left-[24%] flex flex-col items-center"
        >
          <svg
            viewBox="0 0 120 220"
            className="w-24 sm:w-32 h-48 drop-shadow-[0_0_25px_rgba(0,0,0,0.95)]"
          >
            <path
              d="M60,15 C38,15 25,35 25,62 C25,85 12,120 8,210 L112,210 C108,120 95,85 95,62 C95,35 82,15 60,15 Z"
              fill="#05030a"
              opacity="0.88"
            />
            <circle cx="48" cy="52" r="3.2" fill="#ef4444" />
            <circle cx="72" cy="52" r="3.2" fill="#ef4444" />
          </svg>
        </motion.div>

        <motion.div
          animate={{ x: ['-15%', '15%', '-15%'], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-0 inset-x-[-20%] h-48 bg-gradient-to-t from-black via-red-950/35 to-transparent blur-2xl"
        />
      </div>
    );
  }

  if (stepId === 'giftroom' || stepId === 'cakeroom') {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-10">
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.45, 0.75, 0.45] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full bg-amber-400/25 blur-[95px]"
        />
      </div>
    );
  }

  return null;
}

// ============================================================================
// PRE-MAIN PAGE BIRTHDAY CAKE BLOWING CEREMONY STAGE
// ============================================================================
function PreMainCakeCeremony({ onEnterMainPage, playVoiceClip }) {
  const [candlesLit, setCandlesLit] = useState(true);
  const [micActive, setMicActive] = useState(false);
  const audioCtxRef = useRef(null);
  const micStreamRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    playVoiceClip?.('/audio/tts/cake-intro.mp3');
  }, [playVoiceClip]);

  const fireGrandCelebration = useCallback(() => {
    const count = 200;
    const defaults = { origin: { y: 0.6 }, zIndex: 120 };
    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }
    fire(0.25, { spread: 26, startVelocity: 55, colors: ['#FCBC5B', '#FF7EB6'] });
    fire(0.2, { spread: 60, colors: ['#FFEEDF', '#A78BFA'] });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.2, { spread: 130, startVelocity: 30, decay: 0.92, scalar: 1.25 });
  }, []);

  const handleBlowOut = useCallback(() => {
    if (!candlesLit) return;
    setCandlesLit(false);
    setMicActive(false);
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((t) => t.stop());
    }
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    fireGrandCelebration();
    playVoiceClip?.('/audio/tts/cake-blown.mp3');
  }, [candlesLit, fireGrandCelebration, playVoiceClip]);

  // Optional microphone blow detection
  const enableMicBlowing = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;
      setMicActive(true);
      const AudioContext = window.AudioContext || window.webkitAudioContext;
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
        if (avg > 52) {
          handleBlowOut();
          return;
        }
        rafRef.current = requestAnimationFrame(checkVolume);
      };
      rafRef.current = requestAnimationFrame(checkVolume);
    } catch {
      // If mic permission denied or unavailable, immediately blow out candles on click
      handleBlowOut();
    }
  };

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach((t) => t.stop());
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.75, ease: 'easeOut' }}
      className="relative z-30 max-w-4xl w-full mx-auto px-5 sm:px-8 py-6 sm:py-8 rounded-[36px] bg-plum-deep/90 border-2 border-gold/60 backdrop-blur-xl shadow-[0_28px_90px_rgba(0,0,0,0.92)]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column: Portrait, Greeting & Blow-Out Controls */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
          <Badge variant="gold" className="mb-3 gap-1.5 px-3.5 py-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>NGHI THỨC THỔI NẾN 3D • THỎ BÚN 19</span>
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
              ? 'Chiếc bánh kem 3D có chú Thỏ Bún (@bunii.817) đội vương miện vàng đang đợi em! Hãy nhắm mắt ước một điều thật đẹp cho tuổi 19 rồi thổi tắt 5 ngọn nến nhé!'
              : 'Điều ước tuổi 19 của Lưu Nguyễn Bảo Hân đã bay lên bầu trời đêm đầy sao! Chú Thỏ Bún cũng đang nhảy tưng bừng chúc mừng công chúa nhỏ của anh!'}
          </p>

          {/* Action Buttons: Blow Out Candles OR Enter Main Page */}
          {candlesLit ? (
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mt-5">
              <Button
                variant="default"
                size="lg"
                onClick={handleBlowOut}
                className="shadow-[0_0_35px_rgba(252,188,91,0.55)]"
              >
                <Flame className="w-5 h-5" />
                <span>Ước Xong Rồi — Thổi Tắt Nến!</span>
              </Button>

              <Button
                variant="outline"
                size="default"
                onClick={enableMicBlowing}
                className={micActive ? 'border-gold text-gold animate-pulse' : ''}
              >
                <Mic className="w-4 h-4" />
                <span>
                  {micActive ? 'Đang nghe... Thổi vào Mic!' : 'Thổi bằng Micro'}
                </span>
              </Button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mt-5"
            >
              <Button
                variant="default"
                size="lg"
                onClick={onEnterMainPage}
                className="shadow-[0_0_40px_rgba(252,188,91,0.65)]"
              >
                <PartyPopper className="w-5 h-5" />
                <span>Mở Quà & Bước Vào Trang Chính</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
            </motion.div>
          )}
        </div>

        {/* Right Column: Interactive 3D WebGL Bunny Birthday Cake */}
        <div className="lg:col-span-7 w-full">
          <div className="rounded-[28px] bg-gradient-to-b from-plum/90 via-[#1d103b]/80 to-plum-deep/90 border border-gold/30 p-3 shadow-inner">
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
  );
}

// ============================================================================
// MAIN SPOOKY INTRO COMPONENT (Spooky Rooms -> Cake Blowing Ceremony -> Main Page)
// ============================================================================
export default function SpookyIntro({
  onCompleteIntro,
  onStartCelebrationMusic,
  onDuckCelebrationMusic,
}) {
  const [stepIndex, setStepIndex] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);
  const [lineFinished, setLineFinished] = useState(false);
  const [roomTransitioning, setRoomTransitioning] = useState(false);
  const [doorSwinging, setDoorSwinging] = useState(false);
  const [whiteFlash, setWhiteFlash] = useState(false);
  const [showCakeStage, setShowCakeStage] = useState(false);
  const [isVoiceSpeaking, setIsVoiceSpeaking] = useState(false);
  const isCakeStageRef = useRef(false);
  const audioMuted = false;

  const switchAudioRef = useRef(null);
  const doorAudioRef = useRef(null);
  const hauntAudioRef = useRef(null);
  const blastAudioRef = useRef(null);
  const voiceAudioRef = useRef(null);
  const pendingVoiceSrcRef = useRef(null);
  const advanceTimerRef = useRef(null);

  const currentStep = spookyStorySteps[stepIndex];
  const currentLines = currentStep ? currentStep.lines : [];

  // Helper to play a warm Vietnamese Male AI Voiceover clip (/audio/tts/*.mp3)
  const playVoiceClip = useCallback(
    (clipUrl, onEndedCallback) => {
      pendingVoiceSrcRef.current = { clipUrl, onEndedCallback };

      if (voiceAudioRef.current) {
        voiceAudioRef.current.onended = null;
        voiceAudioRef.current.pause();
      }

      if (audioMuted) {
        setIsVoiceSpeaking(false);
        return;
      }

      const audio = new Audio(clipUrl);
      audio.volume = 1.0;
      voiceAudioRef.current = audio;

      // Duck background music so the warm male AI voice stands out clearly
      if (hauntAudioRef.current && !hauntAudioRef.current.paused) {
        hauntAudioRef.current.volume = 0.2;
      }
      onDuckCelebrationMusic?.(true);

      audio.onplay = () => {
        setIsVoiceSpeaking(true);
        pendingVoiceSrcRef.current = null;
      };

      audio.onended = () => {
        setIsVoiceSpeaking(false);
        if (hauntAudioRef.current && !isCakeStageRef.current) {
          hauntAudioRef.current.volume = 0.52;
        }
        onDuckCelebrationMusic?.(false);
        onEndedCallback?.();
      };

      audio.onerror = () => {
        setIsVoiceSpeaking(false);
        if (hauntAudioRef.current && !isCakeStageRef.current) {
          hauntAudioRef.current.volume = 0.52;
        }
        onDuckCelebrationMusic?.(false);
        onEndedCallback?.();
      };

      audio.play().catch(() => {
        // Browser blocked unmuted autoplay before first interaction; will auto-resume on first gesture
        setIsVoiceSpeaking(false);
      });
    },
    [audioMuted, onDuckCelebrationMusic]
  );

  // Initialize audio with loop=true and aggressive auto-unlock on any user gesture
  useEffect(() => {
    switchAudioRef.current = new Audio('/audio/switch.mp3');
    doorAudioRef.current = new Audio('/audio/door.mp3');
    hauntAudioRef.current = new Audio('/audio/haunted-bgm.mp3');
    blastAudioRef.current = new Audio('/audio/blast.mp3');

    hauntAudioRef.current.loop = true;
    hauntAudioRef.current.volume = 0.45;

    const unlockAndPlayAll = () => {
      if (
        hauntAudioRef.current &&
        hauntAudioRef.current.paused &&
        !isCakeStageRef.current
      ) {
        hauntAudioRef.current.play().catch(() => {});
      }
      if (pendingVoiceSrcRef.current) {
        const { clipUrl, onEndedCallback } = pendingVoiceSrcRef.current;
        playVoiceClip(clipUrl, onEndedCallback);
      } else if (
        voiceAudioRef.current &&
        voiceAudioRef.current.paused &&
        voiceAudioRef.current.currentTime === 0
      ) {
        voiceAudioRef.current.play().catch(() => {});
      }
    };

    unlockAndPlayAll();
    const events = ['pointerdown', 'keydown', 'touchstart', 'wheel', 'click'];
    events.forEach((ev) =>
      window.addEventListener(ev, unlockAndPlayAll, { passive: true })
    );

    return () => {
      events.forEach((ev) => window.removeEventListener(ev, unlockAndPlayAll));
      if (hauntAudioRef.current) {
        hauntAudioRef.current.pause();
        hauntAudioRef.current.currentTime = 0;
      }
      if (voiceAudioRef.current) {
        voiceAudioRef.current.onended = null;
        voiceAudioRef.current.pause();
      }
    };
  }, []);

  useEffect(() => {
    if (!hauntAudioRef.current) return;
    hauntAudioRef.current.muted = audioMuted;
    if (voiceAudioRef.current) {
      voiceAudioRef.current.muted = audioMuted;
    }
    if (!audioMuted && hauntAudioRef.current.paused && !showCakeStage) {
      hauntAudioRef.current.play().catch(() => {});
    }
  }, [audioMuted, showCakeStage]);

  const playSfx = useCallback(
    (audioRef) => {
      if (audioMuted || !audioRef?.current) return;
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    },
    [audioMuted]
  );

  useEffect(() => {
    setLineIndex(0);
    setLineFinished(false);
  }, [stepIndex]);

  // Play warm male AI voiceover for each story line and advance after voice finishes
  useEffect(() => {
    if (roomTransitioning || showCakeStage) return;

    if (advanceTimerRef.current) {
      clearTimeout(advanceTimerRef.current);
    }

    if (lineFinished) {
      // Play the action prompt voiceover for the current room (Anh Trung's recorded voice)
      if (currentStep?.id) {
        playVoiceClip(`/audio/voice/${currentStep.id}-action.m4a`);
      }
      return;
    }

    const advanceToNext = () => {
      if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = setTimeout(() => {
        if (lineIndex < currentLines.length - 1) {
          setLineIndex((prev) => prev + 1);
        } else {
          setLineFinished(true);
        }
      }, 850);
    };

    if (currentStep?.id) {
      playVoiceClip(
        `/audio/voice/${currentStep.id}-${lineIndex}.m4a`,
        advanceToNext
      );
    }

    // Fallback timer in case audio is muted or blocked by browser prior to gesture
    const fallbackTimer = setTimeout(() => {
      if (!voiceAudioRef.current || voiceAudioRef.current.paused) {
        if (lineIndex < currentLines.length - 1) {
          setLineIndex((prev) => prev + 1);
        } else {
          setLineFinished(true);
        }
      }
    }, 11000);

    return () => {
      clearTimeout(fallbackTimer);
      if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    };
  }, [
    stepIndex,
    lineIndex,
    lineFinished,
    roomTransitioning,
    showCakeStage,
    currentStep?.id,
    currentLines.length,
    playVoiceClip,
  ]);

  const handleNextLineManual = () => {
    if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    if (voiceAudioRef.current) {
      voiceAudioRef.current.onended = null;
      voiceAudioRef.current.pause();
    }
    if (lineIndex < currentLines.length - 1) {
      setLineIndex((prev) => prev + 1);
    } else {
      setLineFinished(true);
    }
  };

  // Interactive SVG Object Click (Bulb -> Door Out -> Door In -> Gift -> Cake Ceremony!)
  const handleCenterObjectClick = () => {
    if (roomTransitioning || isCakeStageRef.current) return;

    if (
      hauntAudioRef.current &&
      hauntAudioRef.current.paused &&
      currentStep.actionType !== 'gift' &&
      !isCakeStageRef.current
    ) {
      hauntAudioRef.current.loop = true;
      hauntAudioRef.current.play().catch(() => {});
    }

    const actionType = currentStep.actionType;

    if (actionType === 'switch') {
      playSfx(switchAudioRef);
      setRoomTransitioning(true);
      setTimeout(() => {
        setStepIndex(1);
        setRoomTransitioning(false);
      }, 2200);
    } else if (actionType === 'door-out') {
      playSfx(doorAudioRef);
      setDoorSwinging(true);
      setRoomTransitioning(true);
      setTimeout(() => {
        setDoorSwinging(false);
        setStepIndex(2);
        setRoomTransitioning(false);
      }, 2400);
    } else if (actionType === 'door-in') {
      playSfx(doorAudioRef);
      setDoorSwinging(true);
      setRoomTransitioning(true);
      setTimeout(() => {
        setDoorSwinging(false);
        setStepIndex(3);
        setRoomTransitioning(false);
      }, 2400);
    } else if (actionType === 'gift') {
      isCakeStageRef.current = true;
      if (hauntAudioRef.current) {
        hauntAudioRef.current.pause();
        hauntAudioRef.current.currentTime = 0;
        hauntAudioRef.current.src = '';
      }
      playSfx(blastAudioRef);
      onStartCelebrationMusic?.();
      setWhiteFlash(true);

      confetti({
        particleCount: 150,
        spread: 110,
        origin: { y: 0.55 },
        colors: ['#FCBC5B', '#FF7EB6', '#FFEEDF', '#A78BFA'],
      });

      // Transition from white flash into the Pre-Main Cake Blowing Ceremony!
      setTimeout(() => {
        setWhiteFlash(false);
        setShowCakeStage(true);
      }, 1100);
    }
  };

  const getRoomBackgroundStyle = () => {
    if (showCakeStage) {
      return {
        backgroundColor: '#140B29',
        backgroundImage:
          'radial-gradient(rgba(252,188,91,0.22), rgba(11,7,25,0.82)), url("/scenes/bedroom.svg")',
        backgroundPosition: '70% 50%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      };
    }
    if (currentStep.id === 'darkroom') {
      return { backgroundColor: '#000000' };
    }
    if (currentStep.id === 'hallway') {
      return {
        backgroundColor: '#05050a',
        backgroundImage:
          'radial-gradient(rgba(0,0,0,0.05), rgba(0,0,0,0.92)), url("/scenes/hallway.svg")',
        backgroundPosition: '50% 50%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      };
    }
    if (currentStep.id === 'giftroom') {
      return {
        backgroundColor: '#141852',
        backgroundImage:
          'radial-gradient(rgba(252,188,91,0.18), rgba(0,0,0,0.7)), url("/scenes/bedroom.svg")',
        backgroundPosition: '70% 50%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      };
    }
    return {
      backgroundColor: '#141852',
      backgroundImage:
        'radial-gradient(rgba(0,0,0,0), rgba(0,0,0,0.68)), url("/scenes/bedroom.svg")',
      backgroundPosition: '70% 50%',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    };
  };

  const getCenterButtonSvg = () => {
    if (currentStep.actionType === 'switch') return '/scenes/bulb.svg';
    if (
      currentStep.actionType === 'door-out' ||
      currentStep.actionType === 'door-in'
    ) {
      return '/scenes/door.svg';
    }
    return '/scenes/gift.svg';
  };

  const activeAtmosphereId = showCakeStage ? 'cakeroom' : currentStep.id;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none font-sans">
      {/* Stationary SVG Room Scene */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeAtmosphereId}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{
            opacity: roomTransitioning && !doorSwinging ? 0 : 1,
            scale: doorSwinging ? 1.38 : 1,
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
          style={getRoomBackgroundStyle()}
          className="absolute inset-0 w-full h-full"
        >
          <AnimatedRoomElements stepId={activeAtmosphereId} />
        </motion.div>
      </AnimatePresence>

      {/* Three.js Floating Night Dust / Spores */}
      <ThreeRoomAtmosphere stepId={activeAtmosphereId} />

      {/* Top Controls Bar */}
      <div className="relative z-30 flex items-center justify-end px-5 sm:px-8 pt-5">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            isCakeStageRef.current = true;
            if (hauntAudioRef.current) {
              hauntAudioRef.current.pause();
              hauntAudioRef.current.currentTime = 0;
              hauntAudioRef.current.src = '';
            }
            if (voiceAudioRef.current) {
              voiceAudioRef.current.onended = null;
              voiceAudioRef.current.pause();
            }
            onDuckCelebrationMusic?.(false);
            onStartCelebrationMusic?.();
            onCompleteIntro?.();
          }}
          className="bg-black/45 border border-cream/15 text-cream/80 hover:text-cream cursor-pointer"
        >
          <span>Vào thẳng trang chính</span>
          <FastForward className="w-3.5 h-3.5" />
        </Button>
      </div>

      {/* CENTER DISPLAY AREA */}
      <div className="relative z-20 w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 pb-14">
        {showCakeStage ? (
          <PreMainCakeCeremony
            playVoiceClip={playVoiceClip}
            onEnterMainPage={() => {
              if (voiceAudioRef.current) {
                voiceAudioRef.current.onended = null;
                voiceAudioRef.current.pause();
              }
              onDuckCelebrationMusic?.(false);
              onCompleteIntro?.();
            }}
          />
        ) : (
          <>
            {/* 1. Centered Floating Story Text */}
            <AnimatePresence mode="wait">
              {!lineFinished && !roomTransitioning && (
                <motion.div
                  key={`${currentStep.id}-line-${lineIndex}`}
                  initial={{ opacity: 0, y: 18, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -16, scale: 0.98 }}
                  transition={{ duration: 0.85, ease: 'easeOut' }}
                  onClick={handleNextLineManual}
                  className="max-w-3xl w-full text-center cursor-pointer px-6 py-8 rounded-3xl bg-black/45 backdrop-blur-md border border-cream/15 shadow-[0_24px_80px_rgba(0,0,0,0.85)]"
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/35 text-gold text-[11px] font-display font-bold uppercase tracking-[0.2em] mb-4">
                    <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                    <span>
                      {isVoiceSpeaking
                        ? 'Giọng Anh Trung Đang Kể Chuyện...'
                        : 'Lời Dẫn Chuyện Của Anh Trung • Chạm Để Tiếp Tục'}
                    </span>
                  </div>

                  <p className="font-serif italic text-2xl sm:text-4xl md:text-[2.65rem] text-cream leading-snug drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
                    {currentLines[lineIndex]}
                  </p>

                  <div className="mt-6 flex flex-col items-center gap-2.5">
                    <div className="flex items-center gap-2">
                      {currentLines.map((_, idx) => (
                        <span
                          key={idx}
                          className={`h-1.5 rounded-full transition-all duration-500 ${
                            idx === lineIndex
                              ? 'w-8 bg-gold'
                              : idx < lineIndex
                              ? 'w-2.5 bg-gold/50'
                              : 'w-2.5 bg-cream/20'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-display font-bold uppercase tracking-[0.2em] text-cream/60 hover:text-gold transition-colors">
                      <span>Chạm để qua câu tiếp theo</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 2. Centered Interactive SVG Button (Bulb / Door / Gift) */}
            <AnimatePresence>
              {(lineFinished || doorSwinging) && (
                <motion.div
                  key={`action-${currentStep.id}`}
                  initial={{ opacity: 0, scale: 0.75 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="flex flex-col items-center justify-center text-center"
                >
                  <div
                    onClick={handleCenterObjectClick}
                    style={{ perspective: '1000px' }}
                    className="relative group cursor-pointer flex items-center justify-center"
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.28, 1],
                        opacity: [0.35, 0.7, 0.35],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="absolute w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-gold/25 blur-2xl pointer-events-none"
                    />

                    <motion.img
                      src={getCenterButtonSvg()}
                      alt={currentStep.actionLabel}
                      style={{
                        transformOrigin:
                          currentStep.actionType === 'door-out' ||
                          currentStep.actionType === 'door-in'
                            ? 'left center'
                            : 'center center',
                      }}
                      animate={
                        doorSwinging
                          ? {
                              rotateY: -110,
                              scale: 1.35,
                            }
                          : {
                              scale: [1, 1.18, 1],
                            }
                      }
                      transition={
                        doorSwinging
                          ? { duration: 1.4, ease: [0.22, 1, 0.36, 1] }
                          : {
                              duration: 1.9,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            }
                      }
                      className="relative z-10 w-36 h-36 sm:w-44 sm:h-44 object-contain drop-shadow-[0_16px_40px_rgba(0,0,0,0.9)]"
                    />
                  </div>

                  {!roomTransitioning && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                      className="mt-10 flex flex-col items-center gap-2"
                    >
                      <span className="px-5 py-2 rounded-full bg-gold text-plum-deep font-display font-black uppercase text-xs sm:text-sm tracking-[0.18em] shadow-[0_0_30px_rgba(252,188,91,0.5)] flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        {currentStep.actionLabel}
                      </span>
                      <p className="text-sm sm:text-base text-cream/85 font-medium mt-1">
                        {currentStep.actionHint}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>

      {/* White Flash Overlay when opening the gift */}
      <AnimatePresence>
        {whiteFlash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-50 bg-white pointer-events-none"
          />
        )}
      </AnimatePresence>
    </div>
  );
}

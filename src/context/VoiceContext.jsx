import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';

const VoiceContext = createContext(null);

export const CASSETTE_TRACKS = [
  {
    id: 'main-wish',
    side: 'SIDE A • 01',
    title: 'Lời Chúc & Tâm Tình Tuổi 19 Anh Trung Gửi Bảo Hân',
    subtitle: 'Giọng đọc thật của Anh Trung trên nền nhạc sinh nhật',
    primarySrc: '/audio/voice/cassette-wish.m4a',
    fallbackSrc: '/audio/New Recording 29.m4a',
  },
];

export const LETTER_TRACK = {
  id: 'love-letter',
  side: 'THƯ TAY',
  title: 'Anh Trung Đang Đọc Thư Tay Gửi Bảo Hân',
  subtitle: 'Tâm thư tuổi 19 đầy yêu thương & kỷ niệm',
  primarySrc: '/audio/voice/love-letter.m4a',
  fallbackSrc: '/audio/New Recording 30.m4a',
};

export function VoiceProvider({
  children,
  onDuckCelebrationMusic,
  onEnsureBgmPlaying,
}) {
  const [activeVoice, setActiveVoice] = useState({
    active: false,
    source: null, // 'cassette' | 'letter'
    trackId: null,
    title: '',
    subtitle: '',
    side: '',
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    trackIdx: 0,
  });

  const audioRef = useRef(null);
  const fallbackTriedRef = useRef(false);

  // Stop and cleanup when unmounting
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
      onDuckCelebrationMusic?.(false);
    };
  }, [onDuckCelebrationMusic]);

  const stopVoice = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setActiveVoice((prev) => ({
      ...prev,
      active: false,
      isPlaying: false,
      currentTime: 0,
    }));
    onDuckCelebrationMusic?.(false);
  }, [onDuckCelebrationMusic]);

  const playTrack = useCallback(
    ({ source, trackId, title, subtitle, side, primarySrc, fallbackSrc, trackIdx = 0 }) => {
      onEnsureBgmPlaying?.();
      onDuckCelebrationMusic?.(true);

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.onended = null;
        audioRef.current.ontimeupdate = null;
        audioRef.current.onloadedmetadata = null;
        audioRef.current.onerror = null;
      }

      fallbackTriedRef.current = false;
      const audio = new Audio(primarySrc);
      audio.preload = 'metadata';
      audio.volume = 1.0;
      audioRef.current = audio;

      setActiveVoice({
        active: true,
        source,
        trackId,
        title,
        subtitle,
        side,
        isPlaying: true,
        currentTime: 0,
        duration: 0,
        trackIdx,
        primarySrc,
        fallbackSrc,
      });

      const attachHandlers = (el) => {
        el.onloadedmetadata = () => {
          setActiveVoice((v) => ({ ...v, duration: el.duration || 0 }));
        };
        el.ontimeupdate = () => {
          setActiveVoice((v) => ({ ...v, currentTime: el.currentTime || 0 }));
        };
        el.onended = () => {
          // If cassette track 0 or 1, can auto advance
          if (source === 'cassette' && trackIdx < CASSETTE_TRACKS.length - 1) {
            const nextIdx = trackIdx + 1;
            const nextTrack = CASSETTE_TRACKS[nextIdx];
            playTrack({
              source: 'cassette',
              trackId: nextTrack.id,
              title: nextTrack.title,
              subtitle: nextTrack.subtitle,
              side: nextTrack.side,
              primarySrc: nextTrack.primarySrc,
              fallbackSrc: nextTrack.fallbackSrc,
              trackIdx: nextIdx,
            });
          } else {
            setActiveVoice((v) => ({ ...v, isPlaying: false, currentTime: 0 }));
            onDuckCelebrationMusic?.(false);
          }
        };
        el.onerror = () => {
          if (!fallbackTriedRef.current && fallbackSrc) {
            fallbackTriedRef.current = true;
            el.src = fallbackSrc;
            el.load();
            el.play().catch(() => {
              setActiveVoice((v) => ({ ...v, isPlaying: false }));
              onDuckCelebrationMusic?.(false);
            });
          } else {
            setActiveVoice((v) => ({ ...v, isPlaying: false }));
            onDuckCelebrationMusic?.(false);
          }
        };
      };

      attachHandlers(audio);

      audio
        .play()
        .then(() => {
          setActiveVoice((v) => ({ ...v, isPlaying: true }));
        })
        .catch(() => {
          if (!fallbackTriedRef.current && fallbackSrc) {
            fallbackTriedRef.current = true;
            audio.src = fallbackSrc;
            audio.load();
            audio
              .play()
              .then(() => setActiveVoice((v) => ({ ...v, isPlaying: true })))
              .catch(() => {
                setActiveVoice((v) => ({ ...v, isPlaying: false }));
                onDuckCelebrationMusic?.(false);
              });
          } else {
            setActiveVoice((v) => ({ ...v, isPlaying: false }));
            onDuckCelebrationMusic?.(false);
          }
        });
    },
    [onDuckCelebrationMusic, onEnsureBgmPlaying]
  );

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (activeVoice.isPlaying) {
      audio.pause();
      setActiveVoice((v) => ({ ...v, isPlaying: false }));
      onDuckCelebrationMusic?.(false);
    } else {
      onEnsureBgmPlaying?.();
      onDuckCelebrationMusic?.(true);
      audio
        .play()
        .then(() => {
          setActiveVoice((v) => ({ ...v, isPlaying: true }));
        })
        .catch(() => {
          setActiveVoice((v) => ({ ...v, isPlaying: false }));
          onDuckCelebrationMusic?.(false);
        });
    }
  }, [activeVoice.isPlaying, onDuckCelebrationMusic, onEnsureBgmPlaying]);

  const seekTo = useCallback((timeSec) => {
    const audio = audioRef.current;
    if (!audio) return;
    const safeTime = Math.max(0, Math.min(audio.duration || 9999, timeSec));
    audio.currentTime = safeTime;
    setActiveVoice((v) => ({ ...v, currentTime: safeTime }));
  }, []);

  const seekBy = useCallback((deltaSec) => {
    const audio = audioRef.current;
    if (!audio) return;
    const current = audio.currentTime || 0;
    const target = Math.max(0, Math.min(audio.duration || 9999, current + deltaSec));
    audio.currentTime = target;
    setActiveVoice((v) => ({ ...v, currentTime: target }));
  }, []);

  return (
    <VoiceContext.Provider
      value={{
        activeVoice,
        playTrack,
        togglePlay,
        seekTo,
        seekBy,
        stopVoice,
      }}
    >
      {children}
    </VoiceContext.Provider>
  );
}

export function useVoice() {
  const ctx = useContext(VoiceContext);
  if (!ctx) {
    throw new Error('useVoice must be used within a VoiceProvider');
  }
  return ctx;
}

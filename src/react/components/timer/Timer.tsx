import { useState, useEffect, useRef } from 'react';

interface TimerProps {
  timeToCountdown: number;
  onComplete?: () => void;
}

export const Timer = ({ timeToCountdown, onComplete }: TimerProps) => {
  const TIME_IN_MS = 60 * timeToCountdown * 1000;

  const [time, setTime] = useState(TIME_IN_MS);
  const startTimeRef = useRef<number>(Date.now());
  const initialTimeRef = useRef<number>(TIME_IN_MS);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    setTime(TIME_IN_MS);
    startTimeRef.current = Date.now();
    initialTimeRef.current = TIME_IN_MS;
    hasCompletedRef.current = false;
  }, [timeToCountdown, TIME_IN_MS]);

  useEffect(() => {
    let rafId: number;

    const tick = () => {
      const now = Date.now();
      const elapsed = now - startTimeRef.current;
      const remaining = initialTimeRef.current - elapsed;

      if (remaining > 0) {
        setTime(remaining);
        rafId = requestAnimationFrame(tick);
      } else {
        setTime(0);
        if (!hasCompletedRef.current && onComplete) {
          hasCompletedRef.current = true;
          onComplete();
        }
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, [timeToCountdown, onComplete]);

  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);

  return (
    <span className="running-timer-time">
      {minutes}:{seconds.toString().padStart(2, '0')}
    </span>
  );
};

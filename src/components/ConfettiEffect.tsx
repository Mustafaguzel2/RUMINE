import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiEffectProps {
  trigger: boolean;
}

export const ConfettiEffect: React.FC<ConfettiEffectProps> = ({ trigger }) => {
  const hasTriggered = useRef(false);

  useEffect(() => {
    if (trigger && !hasTriggered.current) {
      hasTriggered.current = true;

      // Massive burst at the start
      confetti({
        particleCount: 300,
        spread: 120,
        origin: { x: 0.5, y: 0.5 },
        colors: ['#ff69b4', '#ff1493', '#ffd700', '#ffffff', '#ffb6c1', '#ffc0cb'],
        shapes: ['circle'],
        scalar: 1.2,
      });

      const duration = 10000; // 10 seconds of confetti
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 40, spread: 360, ticks: 80, zIndex: 9999 };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      // Continuous confetti from multiple points
      const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(interval);
          return;
        }

        const particleCount = 80 * (timeLeft / duration);

        // Left side
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ['#ff69b4', '#ff1493', '#ffd700', '#ffffff', '#ffb6c1'],
        });

        // Right side
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ['#ff69b4', '#ff1493', '#ffd700', '#ffffff', '#ffb6c1'],
        });

        // Center bursts
        if (Math.random() > 0.7) {
          confetti({
            particleCount: 50,
            angle: randomInRange(45, 135),
            spread: 70,
            origin: { x: 0.5, y: 0.5 },
            colors: ['#ff69b4', '#ff1493'],
            shapes: ['circle'],
          });
        }
      }, 200);

      // Heart shaped confetti - more frequent
      const heartInterval = setInterval(() => {
        confetti({
          particleCount: 8,
          angle: 60,
          spread: 70,
          origin: { x: 0.5, y: 0.5 },
          colors: ['#ff69b4', '#ff1493'],
          shapes: ['circle'], // Changed from 'heart' to 'circle' to fix type error
          scalar: 2,
        });
      }, 300);

      // Periodic big bursts
      const burstInterval = setInterval(() => {
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { x: randomInRange(0.3, 0.7), y: randomInRange(0.3, 0.7) },
          colors: ['#ff69b4', '#ff1493', '#ffd700'],
          shapes: ['circle'], // Removed 'heart' to fix type error
        });
      }, 1500);

      setTimeout(() => {
        clearInterval(interval);
        clearInterval(heartInterval);
        clearInterval(burstInterval);
      }, duration);
    }
  }, [trigger]);

  return null;
};


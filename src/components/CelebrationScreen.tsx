import { useEffect, useState } from 'react';

interface CelebrationScreenProps {
  isVisible: boolean;
}

const ACROSTIC_LINES = [
  { letter: 'n', text: 'efesim adını fısıldar her sessizlikte' },
  { letter: 'a', text: 'klım sende, kalbim sana doğru' },
  { letter: 'z', text: 'aman durur gülüşün değince bana' },
  { letter: 'L', text: 'imansın yorulan ruhuma' },
  { letter: 'i', text: 'z bırakıyorsun kalbimde her bakışınla' },
];

export const CelebrationScreen: React.FC<CelebrationScreenProps> = ({ isVisible }) => {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);

  useEffect(() => {
    if (isVisible) {
      // Reset state
      setVisibleLines([]);

      // Show lines one by one
      ACROSTIC_LINES.forEach((_, index) => {
        setTimeout(() => {
          setVisibleLines((prev) => [...prev, index]);
        }, 600 + index * 900);
      });
    } else {
      setVisibleLines([]);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="celebration-screen">
      <div className="celebration-content">
        <h2 className="celebration-title">💖 Seni seviyorum 💖</h2>
        
        <div className="acrostic-container">
          {ACROSTIC_LINES.map((line, index) => {
            const isLineVisible = visibleLines.includes(index);
            return (
              <div
                key={line.letter}
                className={`acrostic-line ${isLineVisible ? 'visible' : ''}`}
              >
                <span className="acrostic-letter">{line.letter}</span>
                <span className="acrostic-text">{line.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};


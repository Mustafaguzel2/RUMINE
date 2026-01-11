import { useState } from 'react';
import { QuestionCard } from './components/QuestionCard';
import { BackgroundVideo } from './components/BackgroundVideo';
import { MusicPlayer } from './components/MusicPlayer';
import { ConfettiEffect } from './components/ConfettiEffect';
import { CelebrationScreen } from './components/CelebrationScreen';
import { Song } from './types';
import './styles/App.css';

// Müzik dosyalarınızı buraya ekleyin
import song1 from './assets/music/Arctic Monkeys - R U Mine.mp3';
import song2 from './assets/music/Yüksek Sadakat - Katil & Maktül.mp3';

const songs: Song[] = [
  { title: 'Yüksek Sadakat - Katil & Maktül', url: song2 },
  { title: 'Arctic Monkeys - R U Mine', url: song1 },
];

// Video dosyasını buraya ekleyin (opsiyonel)
import romanticVideo from './assets/videos/Candle_Romance.mp4';
const videoSource: string | undefined = romanticVideo;

function App() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const handleYesClick = () => {
    setShowConfetti(true);
    // Add screen shake effect
    document.body.classList.add('screen-shake');
    setTimeout(() => {
      document.body.classList.remove('screen-shake');
    }, 1000);
    
    // Show celebration screen after a delay
    setTimeout(() => {
      setShowCelebration(true);
    }, 800);
  };

  return (
    <div className={`app-container ${showCelebration ? 'celebration-mode' : ''}`}>
      <BackgroundVideo videoSource={videoSource} />
      {!showCelebration && <QuestionCard onYesClick={handleYesClick} />}
      <MusicPlayer songs={songs} />
      <ConfettiEffect trigger={showConfetti} />
      <CelebrationScreen isVisible={showCelebration} />
    </div>
  );
}

export default App;


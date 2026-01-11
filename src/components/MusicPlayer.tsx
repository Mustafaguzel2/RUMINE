import { useState, useEffect, useRef } from 'react';
import { Song } from '../types';

interface MusicPlayerProps {
  songs: Song[];
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ songs }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    if (songs.length > 0 && audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted, songs.length]);

  // Auto-play on mount and reset position on refresh
  useEffect(() => {
    const tryAutoPlay = async () => {
      if (audioRef.current && songs.length > 0 && !userInteracted) {
        try {
          // Reset to beginning
          audioRef.current.currentTime = 0;
          audioRef.current.load();
          
          // Try to play immediately
          await audioRef.current.play();
          setIsPlaying(true);
          setUserInteracted(true);
        } catch (error) {
          // Autoplay prevented, try again after short delay
          setTimeout(async () => {
            if (audioRef.current && !userInteracted) {
              try {
                audioRef.current.currentTime = 0;
                await audioRef.current.play();
                setIsPlaying(true);
                setUserInteracted(true);
              } catch (e) {
                // Still blocked, will need user interaction
              }
            }
          }, 100);
        }
      }
    };

    // Try immediately on mount
    tryAutoPlay();
  }, [songs.length, userInteracted]);

  useEffect(() => {
    if (audioRef.current && songs.length > 0 && userInteracted) {
      // Reset to beginning when song changes
      audioRef.current.currentTime = 0;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error('Error playing audio:', error);
        });
      }
    }
  }, [currentSongIndex, songs, isPlaying, userInteracted]);

  const handlePlayPause = () => {
    if (!userInteracted) {
      setUserInteracted(true);
    }

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Ensure we start from beginning if at the end
        if (audioRef.current.ended) {
          audioRef.current.currentTime = 0;
        }
        audioRef.current.play().catch((error) => {
          console.error('Error playing audio:', error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNextSong = () => {
    if (songs.length > 0) {
      setCurrentSongIndex((prev) => (prev + 1) % songs.length);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0) {
      setIsMuted(false);
    }
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const handleEnded = () => {
    if (songs.length > 0) {
      setCurrentSongIndex((prev) => (prev + 1) % songs.length);
    }
  };

  if (songs.length === 0) {
    return null;
  }

  const currentSong = songs[currentSongIndex];
  
  // Check if title is long enough to need marquee
  const needsMarquee = currentSong.title.length > 25;

  return (
    <div className="music-player">
      <audio
        ref={audioRef}
        src={currentSong.url}
        onEnded={handleEnded}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <div className="music-controls">
        <button className="music-button" onClick={handlePlayPause} aria-label={isPlaying ? 'Pause' : 'Play'}>
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button className="music-button" onClick={handleNextSong} aria-label="Next song">
          ⏭
        </button>
        <div className="volume-control">
          <button className="music-button" onClick={handleMuteToggle} aria-label={isMuted ? 'Unmute' : 'Mute'}>
            {isMuted || volume === 0 ? '🔇' : '🔊'}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="volume-slider"
            aria-label="Volume"
          />
        </div>
      </div>
      <div className="song-title-container">
        <div 
          className={`song-title ${needsMarquee ? 'marquee' : ''}`}
          title={currentSong.title}
        >
          {currentSong.title}
        </div>
      </div>
    </div>
  );
};


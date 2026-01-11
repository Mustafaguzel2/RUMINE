import { useRef } from 'react';

interface BackgroundVideoProps {
  videoSource?: string;
}

export const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ videoSource }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  if (videoSource) {
    return (
      <div className="background-video-container">
        <video
          ref={videoRef}
          className="background-video"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={videoSource} type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
      </div>
    );
  }

  return (
    <div className="background-video-container">
      <div className="gradient-fallback"></div>
      <div className="video-overlay"></div>
    </div>
  );
};


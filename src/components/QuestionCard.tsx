import { useState, useRef } from 'react';

interface QuestionCardProps {
  onYesClick: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ onYesClick }) => {
  const [noButtonPosition, setNoButtonPosition] = useState<{ top: number; left: number } | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const yesButtonRef = useRef<HTMLButtonElement>(null);

  const moveNoButton = () => {
    if (!noButtonRef.current || !yesButtonRef.current) return;

    const noButton = noButtonRef.current;
    const yesButton = yesButtonRef.current;
    
    // Get button dimensions - use offsetWidth/Height for reliable dimensions
    const buttonWidth = noButton.offsetWidth || 150;
    const buttonHeight = noButton.offsetHeight || 60;
    
    // Use viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    const yesButtonRect = yesButton.getBoundingClientRect();

    // Calculate safe zone around yes button (viewport coordinates)
    const padding = 50;
    const safeZoneTop = Math.max(0, yesButtonRect.top - padding);
    const safeZoneLeft = Math.max(0, yesButtonRect.left - padding);
    const safeZoneRight = Math.min(viewportWidth, yesButtonRect.right + padding);
    const safeZoneBottom = Math.min(viewportHeight, yesButtonRect.bottom + padding);

    const margin = 20;
    
    // Calculate available space
    const availableWidth = viewportWidth - buttonWidth - (margin * 2);
    const availableHeight = viewportHeight - buttonHeight - (margin * 2);

    if (availableWidth < 0 || availableHeight < 0) {
      // Viewport too small
      setNoButtonPosition({ 
        top: Math.max(margin, Math.min(margin, viewportHeight - buttonHeight - margin)), 
        left: Math.max(margin, Math.min(margin, viewportWidth - buttonWidth - margin)) 
      });
      return;
    }

    let attempts = 0;
    let newLeft = 0;
    let newTop = 0;
    let foundValidPosition = false;

    // Try to find a position that doesn't overlap with yes button
    while (attempts < 300 && !foundValidPosition) {
      newLeft = margin + Math.random() * availableWidth;
      newTop = margin + Math.random() * availableHeight;
      
      // Round to integers
      newLeft = Math.round(newLeft);
      newTop = Math.round(newTop);
      
      const newRight = newLeft + buttonWidth;
      const newBottom = newTop + buttonHeight;

      // Check if new position overlaps with yes button safe zone
      const overlaps = !(
        newRight <= safeZoneLeft ||
        newLeft >= safeZoneRight ||
        newBottom <= safeZoneTop ||
        newTop >= safeZoneBottom
      );

      if (!overlaps) {
        foundValidPosition = true;
        break;
      }
      attempts++;
    }

    // If no valid position found, place it in a corner away from yes button
    if (!foundValidPosition) {
      // Try corners
      const corners = [
        { left: margin, top: margin }, // top-left
        { left: viewportWidth - buttonWidth - margin, top: margin }, // top-right
        { left: margin, top: viewportHeight - buttonHeight - margin }, // bottom-left
        { left: viewportWidth - buttonWidth - margin, top: viewportHeight - buttonHeight - margin }, // bottom-right
      ];
      
      for (const corner of corners) {
        const cornerRight = corner.left + buttonWidth;
        const cornerBottom = corner.top + buttonHeight;
        const overlaps = !(
          cornerRight <= safeZoneLeft ||
          corner.left >= safeZoneRight ||
          cornerBottom <= safeZoneTop ||
          corner.top >= safeZoneBottom
        );
        if (!overlaps) {
          newLeft = corner.left;
          newTop = corner.top;
          foundValidPosition = true;
          break;
        }
      }
    }

    // Final validation - ensure position is absolutely within viewport bounds
    // Clamp values to ensure button never goes outside viewport
    const maxLeft = Math.max(margin, viewportWidth - buttonWidth - margin);
    const maxTop = Math.max(margin, viewportHeight - buttonHeight - margin);
    
    newLeft = Math.max(margin, Math.min(newLeft, maxLeft));
    newTop = Math.max(margin, Math.min(newTop, maxTop));
    
    // Double-check bounds to prevent any edge cases
    if (newLeft + buttonWidth > viewportWidth) {
      newLeft = viewportWidth - buttonWidth - margin;
    }
    if (newTop + buttonHeight > viewportHeight) {
      newTop = viewportHeight - buttonHeight - margin;
    }
    if (newLeft < margin) {
      newLeft = margin;
    }
    if (newTop < margin) {
      newTop = margin;
    }

    setNoButtonPosition({ top: newTop, left: newLeft });
  };

  const handleNoClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    moveNoButton();
  };

  const handleYesClick = () => {
    setHasAnswered(true);
    onYesClick();
  };

  return (
    <div className="question-card-container">
      <div className="title-wrapper">
        <span className="heart-icon">💖</span>
        <h1 className="title">R U MINE</h1>
        <span className="heart-icon">💖</span>
      </div>
      <p className="question">
        <span className="question-heart">💕</span>
        Benimle sevgili olur musun?
        <span className="question-heart">💕</span>
      </p>
      
      {!hasAnswered ? (
        <div className="buttons-container">
          <button 
            ref={yesButtonRef}
            className="button button-yes" 
            onClick={handleYesClick}
          >
            Evet
          </button>
          <button
            ref={noButtonRef}
            className="button button-no"
            onClick={handleNoClick}
            style={
              noButtonPosition
                ? {
                    position: 'fixed',
                    top: `${noButtonPosition.top}px`,
                    left: `${noButtonPosition.left}px`,
                  }
                : {}
            }
          >
            Hayır
          </button>
        </div>
      ) : (
        <div className="celebration-message">
          💕 💕 💕 💕 💕 💕
        </div>
      )}
    </div>
  );
};


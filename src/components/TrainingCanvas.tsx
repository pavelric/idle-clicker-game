import React, { useEffect, useRef, useState } from 'react';
import { Stats, StatKey } from '../types';

interface TrainingCanvasProps {
  onTrain: () => void;
  lastTrainedStat: StatKey | null;
}

const TrainingCanvas: React.FC<TrainingCanvasProps> = ({ onTrain, lastTrainedStat }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [animation, setAnimation] = useState<{ stat: StatKey; x: number; y: number; opacity: number } | null>(null);

  useEffect(() => {
    if (lastTrainedStat) {
      setAnimation({
        stat: lastTrainedStat,
        x: Math.random() * 200 + 50,
        y: 50,
        opacity: 1,
      });
    }
  }, [lastTrainedStat]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawCharacter = () => {
      ctx.fillStyle = 'black';
      ctx.fillRect(125, 100, 50, 100);
    };

    const animateText = () => {
      if (animation) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawCharacter();

        ctx.fillStyle = `rgba(0, 0, 0, ${animation.opacity})`;
        ctx.font = '16px Arial';
        ctx.fillText(`+1 ${animation.stat}`, animation.x, animation.y);

        animation.y -= 1;
        animation.opacity -= 0.02;

        if (animation.opacity > 0) {
          requestAnimationFrame(animateText);
        } else {
          setAnimation(null);
        }
      }
    };

    drawCharacter();
    if (animation) {
      animateText();
    }
  }, [animation]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={300}
        height={300}
        className="bg-gray-200 rounded-lg cursor-pointer"
        onClick={onTrain}
      />
      {!animation && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="text-gray-500">Tap to train!</p>
        </div>
      )}
    </div>
  );
};

export default TrainingCanvas;
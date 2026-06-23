'use client';

import React, { useCallback, useRef, useEffect, useState } from 'react';

interface InteractiveGridProps {
  gridSize?: number;
  speed?: number;
  baseColor?: string;
  sweepColor?: string;
  hoverColor?: string;
  maxSweepOpacity?: number;
  maxHoverOpacity?: number;
}

const InteractiveGrid: React.FC<InteractiveGridProps> = ({
  gridSize = 40,
  speed = 15,
  baseColor = 'rgba(100, 100, 140, 0.12)',
  sweepColor = '100, 120, 220',
  hoverColor = '160, 140, 255',
  maxSweepOpacity = 0.35,
  maxHoverOpacity = 0.8,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animFrameRef = useRef<number>(0);
  const offsetXRef = useRef(0);
  const offsetYRef = useRef(0);
  const lastTimeRef = useRef(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const draw = useCallback((timestamp: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    const mouse = mouseRef.current;

    if (lastTimeRef.current === 0) lastTimeRef.current = timestamp;
    const dt = (timestamp - lastTimeRef.current) / 1000;
    lastTimeRef.current = timestamp;

    // Move diagonally: north-west to south-east
    offsetXRef.current += speed * dt;
    offsetYRef.current += speed * dt;

    // Wrap around when offset exceeds one full grid cell
    if (offsetXRef.current >= gridSize) offsetXRef.current -= gridSize;
    if (offsetYRef.current >= gridSize) offsetYRef.current -= gridSize;

    const offsetX = offsetXRef.current;
    const offsetY = offsetYRef.current;

    ctx.clearRect(0, 0, width, height);

    const cols = Math.ceil(width / gridSize) + 2;
    const rows = Math.ceil(height / gridSize) + 2;

    // Find hovered cell (accounting for offset)
    const hoverCol = Math.floor((mouse.x - offsetX) / gridSize);
    const hoverRow = Math.floor((mouse.y - offsetY) / gridSize);

    const waveTime = timestamp / 1000;

    for (let row = -1; row < rows; row++) {
      for (let col = -1; col < cols; col++) {
        const x = col * gridSize + offsetX;
        const y = row * gridSize + offsetY;

        if (x + gridSize < 0 || x > width || y + gridSize < 0 || y > height) continue;

        const centerX = x + gridSize / 2;
        const centerY = y + gridSize / 2;

        const isHovered = col === hoverCol && row === hoverRow;

        // Diagonal wave effect
        const wavePhase = ((centerX + centerY) / (width + height)) * Math.PI * 3 + waveTime * 1.2;
        const waveIntensity = (Math.sin(wavePhase) + 1) / 2;

        // Secondary cross-wave for depth
        const wave2Phase = ((centerX - centerY) / width) * Math.PI * 2 + waveTime * 0.6;
        const wave2Intensity = (Math.sin(wave2Phase) + 1) / 2;

        const combinedWave = waveIntensity * 0.7 + wave2Intensity * 0.3;

        if (isHovered) {
          ctx.fillStyle = `rgba(${hoverColor}, ${maxHoverOpacity * 0.4})`;
          ctx.fillRect(x + 1, y + 1, gridSize - 2, gridSize - 2);

          ctx.strokeStyle = `rgba(${hoverColor}, ${maxHoverOpacity})`;
          ctx.lineWidth = 1.5;
          ctx.strokeRect(x, y, gridSize, gridSize);
        } else {
          const alpha = combinedWave * maxSweepOpacity;

          if (alpha > 0.03) {
            ctx.fillStyle = `rgba(${sweepColor}, ${alpha * 0.2})`;
            ctx.fillRect(x + 1, y + 1, gridSize - 2, gridSize - 2);

            ctx.strokeStyle = `rgba(${sweepColor}, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.strokeRect(x, y, gridSize, gridSize);
          } else {
            ctx.strokeStyle = baseColor;
            ctx.lineWidth = 0.5;
            ctx.strokeRect(x, y, gridSize, gridSize);
          }
        }
      }
    }

    animFrameRef.current = requestAnimationFrame(draw);
  }, [gridSize, speed, baseColor, sweepColor, hoverColor, maxSweepOpacity, maxHoverOpacity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    lastTimeRef.current = 0;
    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [dimensions, draw]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: -1000, y: -1000 };
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        width: '100vw',
        height: '100vh',
      }}
    />
  );
};

export default InteractiveGrid;

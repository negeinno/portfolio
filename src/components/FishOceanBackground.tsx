import React, { useEffect, useRef } from 'react';

export const FishOceanBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Offscreen transparent canvases for perfect alpha cutout with zero bounding box
    const offscreenFish1 = document.createElement('canvas');
    const offscreenFish2 = document.createElement('canvas');
    let offscreenReady = false;

    // Process image to remove black background & feather edges
    const processImageToTransparent = (img: HTMLImageElement, targetCanvas: HTMLCanvasElement) => {
      targetCanvas.width = img.naturalWidth || 1024;
      targetCanvas.height = img.naturalHeight || 1024;
      const tCtx = targetCanvas.getContext('2d');
      if (!tCtx) return;

      tCtx.drawImage(img, 0, 0);
      const imgData = tCtx.getImageData(0, 0, targetCanvas.width, targetCanvas.height);
      const data = imgData.data;

      // Make black/dark pixels completely transparent with smooth edge feathering
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const brightness = Math.max(r, g, b);

        if (brightness < 20) {
          data[i + 3] = 0; // Completely transparent
        } else if (brightness < 55) {
          // Smooth feathering
          const factor = (brightness - 20) / 35;
          data[i + 3] = Math.round(data[i + 3] * factor);
        }
      }

      tCtx.putImageData(imgData, 0, 0);
    };

    let loadedCount = 0;
    const checkBothLoaded = () => {
      loadedCount++;
      if (loadedCount >= 2) {
        processImageToTransparent(fishImg1, offscreenFish1);
        processImageToTransparent(fishImg2, offscreenFish2);
        offscreenReady = true;
      }
    };

    const fishImg1 = new Image();
    fishImg1.src = '/fish/betta-fish-1.jpg';
    fishImg1.onload = checkBothLoaded;

    const fishImg2 = new Image();
    fishImg2.src = '/fish/betta-fish-2.jpg';
    fishImg2.onload = checkBothLoaded;

    // Mouse tracking for subtle fluid steering
    const mouse = {
      targetX: width * 0.75,
      targetY: height * 0.45,
      hasMoved: false,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.hasMoved = true;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // --- Underwater Floating Bubbles ---
    interface Bubble {
      x: number;
      y: number;
      radius: number;
      speedY: number;
      opacity: number;
      wobbleSpeed: number;
      wobbleAmp: number;
      phase: number;
    }

    const bubbles: Bubble[] = Array.from({ length: 35 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.5 + 1,
      speedY: Math.random() * 0.6 + 0.3,
      opacity: Math.random() * 0.35 + 0.15,
      wobbleSpeed: Math.random() * 0.03 + 0.015,
      wobbleAmp: Math.random() * 1.8 + 0.5,
      phase: Math.random() * Math.PI * 2,
    }));

    // --- Swimming Betta Fish Agent ---
    class RealisticFish {
      x: number;
      y: number;
      vx: number;
      vy: number;
      angle: number;
      targetAngle: number;
      speed: number;
      baseSpeed: number;
      size: number;
      isPrimary: boolean;
      tailCycle: number;

      constructor(x: number, y: number, size: number, isPrimary = true) {
        this.x = x;
        this.y = y;
        this.vx = 1.3;
        this.vy = 0.2;
        this.angle = 0;
        this.targetAngle = 0;
        this.size = size;
        this.isPrimary = isPrimary;
        this.baseSpeed = isPrimary ? 1.6 : 1.1;
        this.speed = this.baseSpeed;
        this.tailCycle = Math.random() * Math.PI * 2;
      }

      update(time: number, targetX: number, targetY: number, hasMouse: boolean) {
        this.tailCycle += 0.045;

        // Path navigation: graceful swimming trajectory
        let destX = targetX;
        let destY = targetY;

        if (!hasMouse) {
          // Cruise across the open ocean waters
          destX = width * 0.65 + Math.sin(time * 0.0003) * (width * 0.28);
          destY = height * 0.45 + Math.cos(time * 0.00045) * (height * 0.28);
        }

        const dx = destX - this.x;
        const dy = destY - this.y;

        // Smooth steering angle
        this.targetAngle = Math.atan2(dy, dx);
        let angleDiff = this.targetAngle - this.angle;

        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;

        this.angle += angleDiff * 0.028;

        // Realistic swimming pulse
        const stroke = Math.sin(this.tailCycle * 2);
        this.speed = this.baseSpeed + (stroke > 0 ? stroke * 0.5 : 0.05);

        this.vx = Math.cos(this.angle) * this.speed;
        this.vy = Math.sin(this.angle) * this.speed;

        this.x += this.vx;
        this.y += this.vy;

        // Boundary wrapping
        const margin = this.size * 0.8;
        if (this.x < -margin) this.x = width + margin;
        if (this.x > width + margin) this.x = -margin;
        if (this.y < -margin) this.y = height + margin;
        if (this.y > height + margin) this.y = -margin;
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (!offscreenReady) return;

        ctx.save();
        ctx.translate(this.x, this.y);

        // Rotation & natural posture
        ctx.rotate(this.angle);

        // Invert vertically if swimming leftwards
        const isFacingLeft = Math.cos(this.angle) < 0;
        if (isFacingLeft) {
          ctx.scale(1, -1);
        }

        // Fluid undulating tail motion
        const undulationX = 1 + Math.sin(this.tailCycle * 2) * 0.035;
        const undulationY = 1 + Math.cos(this.tailCycle * 2) * 0.04;
        ctx.scale(undulationX, undulationY);

        // Active sprite frame
        const frameIndex = Math.sin(this.tailCycle * 2) > 0 ? 0 : 1;
        const activeCanvas = frameIndex === 0 ? offscreenFish1 : offscreenFish2;

        const renderWidth = this.size;
        const renderHeight = this.size;

        ctx.globalAlpha = this.isPrimary ? 0.88 : 0.45;

        // Draw the cleanly cut-out fish with ZERO square artifact
        ctx.drawImage(
          activeCanvas,
          -renderWidth * 0.5,
          -renderHeight * 0.5,
          renderWidth,
          renderHeight
        );

        ctx.restore();
      }
    }

    // Initialize fish agents
    const primaryFishSize = Math.min(width, height) * 0.38;
    const primaryBetta = new RealisticFish(width * 0.75, height * 0.45, Math.max(300, primaryFishSize), true);
    const companionBetta = new RealisticFish(width * 0.3, height * 0.7, Math.max(180, primaryFishSize * 0.55), false);

    // --- Render Loop ---
    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Deep Oceanic Ambient Glow
      const oceanGrad = ctx.createRadialGradient(
        width * 0.6,
        height * 0.3,
        80,
        width * 0.5,
        height * 0.5,
        width * 0.85
      );
      oceanGrad.addColorStop(0, 'rgba(10, 36, 68, 0.35)');
      oceanGrad.addColorStop(0.5, 'rgba(6, 20, 42, 0.2)');
      oceanGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = oceanGrad;
      ctx.fillRect(0, 0, width, height);

      // Soft Floating Bubbles
      bubbles.forEach((b) => {
        b.y -= b.speedY;
        b.phase += b.wobbleSpeed;
        const wobbleX = b.x + Math.sin(b.phase) * b.wobbleAmp;

        if (b.y < -20) {
          b.y = height + 20;
          b.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(wobbleX, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(186, 230, 253, ${b.opacity})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(wobbleX - b.radius * 0.3, b.y - b.radius * 0.3, b.radius * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.fill();
      });

      // 1. Draw Companion Betta (deep background)
      companionBetta.update(time, mouse.targetX, mouse.targetY, false);
      companionBetta.draw(ctx);

      // 2. Draw Primary Photorealistic Betta Fish
      primaryBetta.update(time, mouse.targetX, mouse.targetY, mouse.hasMoved);
      primaryBetta.draw(ctx);

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
    />
  );
};

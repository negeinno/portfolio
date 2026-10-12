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

    // Preload photorealistic Betta fish image assets
    const fishImg1 = new Image();
    fishImg1.src = '/fish/betta-fish-1.jpg';

    const fishImg2 = new Image();
    fishImg2.src = '/fish/betta-fish-2.jpg';

    let imagesLoaded = 0;
    const onImgLoad = () => {
      imagesLoaded++;
    };
    fishImg1.onload = onImgLoad;
    fishImg2.onload = onImgLoad;

    // Mouse tracking for interactive swimming guidance
    const mouse = {
      x: width * 0.75,
      y: height * 0.4,
      targetX: width * 0.75,
      targetY: height * 0.4,
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

    const bubbles: Bubble[] = Array.from({ length: 40 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 3 + 1,
      speedY: Math.random() * 0.7 + 0.35,
      opacity: Math.random() * 0.4 + 0.15,
      wobbleSpeed: Math.random() * 0.03 + 0.015,
      wobbleAmp: Math.random() * 2 + 0.5,
      phase: Math.random() * Math.PI * 2,
    }));

    // --- Photorealistic Swimming Fish Agent ---
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
      depthPhase: number;
      tailCycle: number;
      finFlutter: number;

      constructor(x: number, y: number, size: number, isPrimary = true) {
        this.x = x;
        this.y = y;
        this.vx = 1.4;
        this.vy = 0.3;
        this.angle = 0;
        this.targetAngle = 0;
        this.size = size;
        this.isPrimary = isPrimary;
        this.baseSpeed = isPrimary ? 1.7 : 1.1;
        this.speed = this.baseSpeed;
        this.depthPhase = Math.random() * Math.PI * 2;
        this.tailCycle = 0;
        this.finFlutter = 0;
      }

      update(time: number, targetX: number, targetY: number, hasMouse: boolean) {
        this.tailCycle += 0.045;
        this.finFlutter += 0.08;
        this.depthPhase += 0.012;

        // Autonomous fluid swimming path with natural wandering
        let destX = targetX;
        let destY = targetY;

        if (!hasMouse) {
          // Graceful oceanic loop
          destX = width * 0.5 + Math.sin(time * 0.00035) * (width * 0.35);
          destY = height * 0.45 + Math.cos(time * 0.0005) * (height * 0.28);
        }

        const dx = destX - this.x;
        const dy = destY - this.y;

        // Calculate target steering angle
        this.targetAngle = Math.atan2(dy, dx);
        let angleDiff = this.targetAngle - this.angle;

        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;

        // Smooth turning inertia
        this.angle += angleDiff * 0.03;

        // Variable swimming speed with natural push strokes
        const pushStroke = Math.sin(this.tailCycle * 2);
        this.speed = this.baseSpeed + (pushStroke > 0 ? pushStroke * 0.6 : 0.1);

        this.vx = Math.cos(this.angle) * this.speed;
        this.vy = Math.sin(this.angle) * this.speed;

        this.x += this.vx;
        this.y += this.vy;

        // Screen boundary wrapping
        const margin = this.size * 0.8;
        if (this.x < -margin) this.x = width + margin;
        if (this.x > width + margin) this.x = -margin;
        if (this.y < -margin) this.y = height + margin;
        if (this.y > height + margin) this.y = -margin;
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (imagesLoaded === 0) return;

        ctx.save();
        ctx.translate(this.x, this.y);

        // Orientation: the source image faces right. Adjust angle accordingly
        ctx.rotate(this.angle);

        // If swimming towards left, flip vertically for natural upright posture
        const isFacingLeft = Math.cos(this.angle) < 0;
        if (isFacingLeft) {
          ctx.scale(1, -1);
        }

        // Realistic swimming undulating deformation:
        // Subtle rhythmic body stretch & vertical tail bobbing
        const undulationX = 1 + Math.sin(this.tailCycle * 2) * 0.04;
        const undulationY = 1 + Math.cos(this.tailCycle * 2) * 0.05;
        ctx.scale(undulationX, undulationY);

        // Switch between the two fluid swimming frames for natural fin motion
        const frameIndex = Math.sin(this.tailCycle * 2) > 0 ? 0 : 1;
        const activeImg = frameIndex === 0 ? fishImg1 : fishImg2;

        const renderWidth = this.size;
        const renderHeight = this.size;

        // Use Screen blend mode so pure black background disappears 100%,
        // leaving the luminous scales, fins, and bioluminescent glow!
        ctx.globalCompositeOperation = 'screen';
        ctx.globalAlpha = this.isPrimary ? 0.95 : 0.55;

        // Bioluminescent ambient glow around fish
        ctx.shadowColor = '#0284c7';
        ctx.shadowBlur = this.isPrimary ? 32 : 16;

        ctx.drawImage(
          activeImg,
          -renderWidth * 0.5,
          -renderHeight * 0.5,
          renderWidth,
          renderHeight
        );

        ctx.restore();
      }
    }

    // Main majestic Betta fish and a companion swimming in deep background
    const primaryFishSize = Math.min(width, height) * 0.42; // Sizable, magnificent betta fish
    const primaryBetta = new RealisticFish(width * 0.72, height * 0.38, Math.max(340, primaryFishSize), true);
    const companionBetta = new RealisticFish(width * 0.25, height * 0.65, Math.max(210, primaryFishSize * 0.6), false);

    // --- Animation Render Loop ---
    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Deep Oceanic Ambient Gradient
      const oceanGrad = ctx.createRadialGradient(
        width * 0.55,
        height * 0.25,
        100,
        width * 0.5,
        height * 0.5,
        width * 0.85
      );
      oceanGrad.addColorStop(0, 'rgba(10, 34, 64, 0.4)'); // Deep luminous aquatic pool
      oceanGrad.addColorStop(0.5, 'rgba(7, 21, 43, 0.25)');
      oceanGrad.addColorStop(1, 'rgba(2, 6, 17, 0)');

      ctx.fillStyle = oceanGrad;
      ctx.fillRect(0, 0, width, height);

      // Volumetric Underwater Light Caustics
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const rayGrad = ctx.createLinearGradient(0, 0, width * 0.7, height);
      rayGrad.addColorStop(0, 'rgba(56, 189, 248, 0.05)');
      rayGrad.addColorStop(0.5, 'rgba(14, 165, 233, 0.02)');
      rayGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = rayGrad;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      // Render Floating Bubbles
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

        // Bubble gleam
        ctx.beginPath();
        ctx.arc(wobbleX - b.radius * 0.3, b.y - b.radius * 0.3, b.radius * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fill();
      });

      // 1. Draw Companion Betta (deeper water layer)
      companionBetta.update(time, mouse.targetX, mouse.targetY, false);
      companionBetta.draw(ctx);

      // 2. Draw Primary Hero Betta Fish (front aquatic layer)
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
      style={{
        mixBlendMode: 'screen',
      }}
    />
  );
};

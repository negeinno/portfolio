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
    // Sized to 420x420 for optimal cache locality and instant rendering
    const offscreenFish1 = document.createElement('canvas');
    const offscreenFish2 = document.createElement('canvas');
    let offscreenReady = false;

    const processImageToTransparent = (img: HTMLImageElement, targetCanvas: HTMLCanvasElement) => {
      const targetSize = 420;
      targetCanvas.width = targetSize;
      targetCanvas.height = targetSize;
      const tCtx = targetCanvas.getContext('2d', { willReadFrequently: true });
      if (!tCtx) return;

      tCtx.drawImage(img, 0, 0, targetSize, targetSize);
      const imgData = tCtx.getImageData(0, 0, targetSize, targetSize);
      const data = imgData.data;

      // Fast single-pass alpha cutout with edge feathering
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const brightness = Math.max(r, g, b);

        if (brightness < 22) {
          data[i + 3] = 0;
        } else if (brightness < 55) {
          const factor = (brightness - 22) / 33;
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

    // Mouse tracking for fluid evasion & ripples
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 180,
      active: false,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    // --- Lightweight Floating Bubbles (Batched 1-call rendering) ---
    interface Bubble {
      x: number;
      y: number;
      radius: number;
      speedY: number;
      wobbleSpeed: number;
      wobbleAmp: number;
      phase: number;
    }

    const bubbles: Bubble[] = Array.from({ length: 22 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.2 + 1.0,
      speedY: Math.random() * 0.6 + 0.25,
      wobbleSpeed: Math.random() * 0.03 + 0.012,
      wobbleAmp: Math.random() * 1.6 + 0.4,
      phase: Math.random() * Math.PI * 2,
    }));

    // --- High-Performance Fluid Betta Fish Agent ---
    class RealisticFish {
      x: number;
      y: number;
      vx: number;
      vy: number;
      heading: number;
      speed: number;
      baseSpeed: number;
      maxSpeed: number;
      size: number;
      alpha: number;
      tailCycle: number;
      tailSpeed: number;
      waypointX: number;
      waypointY: number;
      waypointTimer: number;
      facingScaleY: number;
      canvas1: HTMLCanvasElement;
      canvas2: HTMLCanvasElement;

      constructor(
        startX: number,
        startY: number,
        size: number,
        baseSpeed: number,
        alpha: number,
        c1: HTMLCanvasElement,
        c2: HTMLCanvasElement
      ) {
        this.x = startX;
        this.y = startY;
        this.heading = (Math.random() - 0.5) * 0.5;
        this.baseSpeed = baseSpeed;
        this.maxSpeed = baseSpeed * 2.0;
        this.speed = baseSpeed;
        this.size = size;
        this.alpha = alpha;
        this.tailCycle = Math.random() * Math.PI * 2;
        this.tailSpeed = 0.05;
        this.waypointX = Math.random() * width;
        this.waypointY = Math.random() * height;
        this.waypointTimer = 0;
        this.facingScaleY = 1;
        this.vx = Math.cos(this.heading) * this.speed;
        this.vy = Math.sin(this.heading) * this.speed;
        this.canvas1 = c1;
        this.canvas2 = c2;
      }

      pickNewWaypoint() {
        const padding = 140;
        this.waypointX = padding + Math.random() * (width - padding * 2);
        this.waypointY = padding + Math.random() * (height - padding * 2);
        this.waypointTimer = 220 + Math.random() * 260;
      }

      update() {
        this.waypointTimer--;
        if (this.waypointTimer <= 0) {
          this.pickNewWaypoint();
        }

        const wanderAngle = Math.sin(this.tailCycle * 0.4) * 0.22;
        const dx = this.waypointX - this.x;
        const dy = this.waypointY - this.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 100) {
          this.pickNewWaypoint();
        }

        let desiredHeading = Math.atan2(dy, dx) + wanderAngle;

        if (mouse.active) {
          const mdx = this.x - mouse.x;
          const mdy = this.y - mouse.y;
          const mDist = Math.hypot(mdx, mdy);
          if (mDist < mouse.radius && mDist > 0) {
            desiredHeading = Math.atan2(mdy, mdx);
            this.tailSpeed = 0.14;
            const fleeFactor = (mouse.radius - mDist) / mouse.radius;
            this.speed = Math.min(this.maxSpeed * 1.4, this.speed + fleeFactor * 1.8);
          } else {
            this.tailSpeed += (0.045 - this.tailSpeed) * 0.025;
            this.speed += (this.baseSpeed - this.speed) * 0.02;
          }
        } else {
          this.tailSpeed += (0.045 - this.tailSpeed) * 0.025;
          this.speed += (this.baseSpeed - this.speed) * 0.02;
        }

        let angleDiff = desiredHeading - this.heading;
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
        const turnSpeed = Math.abs(angleDiff) > 1.2 ? 0.024 : 0.036;
        this.heading += angleDiff * turnSpeed;

        this.tailCycle += this.tailSpeed;
        const thrustPulse = Math.max(0, Math.sin(this.tailCycle * 2.2));
        const effectiveSpeed = this.speed * (0.84 + thrustPulse * 0.34);

        const targetVx = Math.cos(this.heading) * effectiveSpeed;
        const targetVy = Math.sin(this.heading) * effectiveSpeed + Math.sin(this.tailCycle * 0.7) * 0.2;
        this.vx += (targetVx - this.vx) * 0.09;
        this.vy += (targetVy - this.vy) * 0.09;

        this.x += this.vx;
        this.y += this.vy;

        const targetScaleY = Math.cos(this.heading) < 0 ? -1 : 1;
        this.facingScaleY += (targetScaleY - this.facingScaleY) * 0.1;

        const margin = 100;
        if (this.x < margin && this.vx < 0) {
          this.waypointX = width * 0.65;
          this.waypointTimer = 160;
        } else if (this.x > width - margin && this.vx > 0) {
          this.waypointX = width * 0.35;
          this.waypointTimer = 160;
        }

        if (this.y < margin && this.vy < 0) {
          this.waypointY = height * 0.65;
          this.waypointTimer = 160;
        } else if (this.y > height - margin && this.vy > 0) {
          this.waypointY = height * 0.35;
          this.waypointTimer = 160;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (!offscreenReady) return;

        const frameCycle = Math.sin(this.tailCycle * 1.5);
        const activeCanvas = frameCycle > 0 ? this.canvas1 : this.canvas2;

        const imgW = activeCanvas.width;
        const imgH = activeCanvas.height;
        if (imgW === 0 || imgH === 0) return;

        const w = this.size;
        const h = this.size;

        // 18 slices provides silky smooth undulating spine curve at maximum GPU performance
        const numSlices = 18;
        const srcSliceW = imgW / numSlices;
        const destSliceW = (w / numSlices) + 0.8;
        const tailAmp = w * 0.072;

        ctx.save();
        ctx.translate(this.x, this.y);

        // Ultra-lightweight soft depth shadow (single hardware-accelerated ellipse)
        ctx.beginPath();
        ctx.ellipse(0, h * 0.32, w * 0.34, h * 0.09, 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(15, 23, 42, ${this.alpha * 0.06})`;
        ctx.fill();

        ctx.rotate(this.heading);
        ctx.scale(1, this.facingScaleY);
        ctx.globalAlpha = this.alpha;

        // Hardware-accelerated traveling spine wave
        for (let i = 0; i < numSlices; i++) {
          const u = i / (numSlices - 1);
          const distFromHead = 1 - u;
          const flexFactor = Math.pow(distFromHead, 1.4);
          const wavePhase = this.tailCycle * 2.2 - distFromHead * 3.5;

          let yOffset = Math.sin(wavePhase) * tailAmp * flexFactor;

          if (u < 0.4) {
            yOffset += Math.cos(this.tailCycle * 2.8 - distFromHead * 5.5) * (tailAmp * 0.28) * Math.pow(distFromHead, 2.0);
          }

          const sx = i * srcSliceW;
          const dx = -w * 0.5 + i * (w / numSlices);
          const dy = -h * 0.5 + yOffset;

          ctx.drawImage(
            activeCanvas,
            sx, 0, srcSliceW, imgH,
            dx, dy, destSliceW, h
          );
        }

        ctx.restore();
      }
    }

    const heroFishSize = Math.max(250, Math.min(width, height) * 0.3);
    const fishSquad: RealisticFish[] = [
      new RealisticFish(
        width * 0.72,
        height * 0.38,
        heroFishSize,
        1.7,
        0.88,
        offscreenFish1,
        offscreenFish2
      ),
      new RealisticFish(
        width * 0.25,
        height * 0.65,
        heroFishSize * 0.68,
        1.3,
        0.58,
        offscreenFish2,
        offscreenFish1
      ),
      new RealisticFish(
        width * 0.55,
        height * 0.82,
        heroFishSize * 0.42,
        0.95,
        0.35,
        offscreenFish1,
        offscreenFish2
      ),
    ];

    // High-performance 60FPS render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Batched bubble rendering (single path, 1 draw call)
      ctx.fillStyle = 'rgba(14, 165, 233, 0.24)';
      ctx.beginPath();
      bubbles.forEach((b) => {
        b.y -= b.speedY;
        b.phase += b.wobbleSpeed;
        const wobbleX = b.x + Math.sin(b.phase) * b.wobbleAmp;

        if (b.y < -20) {
          b.y = height + 20;
          b.x = Math.random() * width;
        }

        ctx.moveTo(wobbleX + b.radius, b.y);
        ctx.arc(wobbleX, b.y, b.radius, 0, Math.PI * 2);
      });
      ctx.fill();

      // Draw fish from back to front
      for (let i = fishSquad.length - 1; i >= 0; i--) {
        const fish = fishSquad[i];
        fish.update();
        fish.draw(ctx);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[radial-gradient(ellipse_80%_80%_at_50%_35%,rgba(186,230,253,0.35)_0%,rgba(224,242,254,0.18)_50%,rgba(248,250,252,0)_100%)]">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
};

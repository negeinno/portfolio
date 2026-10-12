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

    // Mouse tracking for fluid evasion & ripples
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 200,
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

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

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

    const bubbles: Bubble[] = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.5 + 0.8,
      speedY: Math.random() * 0.7 + 0.25,
      opacity: Math.random() * 0.35 + 0.12,
      wobbleSpeed: Math.random() * 0.03 + 0.012,
      wobbleAmp: Math.random() * 1.8 + 0.5,
      phase: Math.random() * Math.PI * 2,
    }));

    // --- High-Performance Fluid Betta Fish Agent ---
    class RealisticFish {
      x: number;
      y: number;
      vx: number;
      vy: number;
      heading: number;       // Current facing angle (radians)
      targetHeading: number; // Target swimming direction
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
      facingScaleY: number;  // Smoothly flipped (+1 right, -1 left) without sudden jumps
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
        this.targetHeading = this.heading;
        this.baseSpeed = baseSpeed;
        this.maxSpeed = baseSpeed * 2.2;
        this.speed = baseSpeed;
        this.size = size;
        this.alpha = alpha;
        this.tailCycle = Math.random() * Math.PI * 2;
        this.tailSpeed = 0.06;
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
        // Bias towards open screen areas, keeping fish visible & lively
        const padding = 120;
        this.waypointX = padding + Math.random() * (width - padding * 2);
        this.waypointY = padding + Math.random() * (height - padding * 2);
        this.waypointTimer = 180 + Math.random() * 240; // 3 to 7 seconds per waypoint
      }

      update() {
        this.waypointTimer--;
        if (this.waypointTimer <= 0) {
          this.pickNewWaypoint();
        }

        // 1. Desired velocity towards waypoint
        const dx = this.waypointX - this.x;
        const dy = this.waypointY - this.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 80) {
          this.pickNewWaypoint();
        }

        let steerAngle = Math.atan2(dy, dx);

        // 2. Mouse avoidance / evasion (fish gets startled if mouse approaches too close)
        if (mouse.active) {
          const mdx = this.x - mouse.x;
          const mdy = this.y - mouse.y;
          const mDist = Math.hypot(mdx, mdy);
          if (mDist < mouse.radius && mDist > 0) {
            // Steer strongly away from mouse
            const fleeAngle = Math.atan2(mdy, mdx);
            const fleeFactor = Math.pow((mouse.radius - mDist) / mouse.radius, 1.5);
            steerAngle = fleeAngle;
            // Tail beats faster when fleeing
            this.tailSpeed = 0.14;
            this.speed = Math.min(this.maxSpeed, this.speed + fleeFactor * 1.5);
          } else {
            this.tailSpeed += (0.05 - this.tailSpeed) * 0.02;
            this.speed += (this.baseSpeed - this.speed) * 0.03;
          }
        } else {
          this.tailSpeed += (0.05 - this.tailSpeed) * 0.02;
          this.speed += (this.baseSpeed - this.speed) * 0.03;
        }

        // 3. Smooth angle interpolation (avoid snapping)
        let angleDiff = steerAngle - this.heading;
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
        this.heading += angleDiff * 0.032;

        // 4. Natural propulsion pulse: speed pulses in sync with tail flick
        this.tailCycle += this.tailSpeed;
        const tailThrust = Math.max(0, Math.sin(this.tailCycle * 2));
        const currentSpeed = this.speed * (0.85 + tailThrust * 0.35);

        // 5. Update position
        this.vx = Math.cos(this.heading) * currentSpeed;
        this.vy = Math.sin(this.heading) * currentSpeed;
        this.x += this.vx;
        this.y += this.vy;

        // 6. Smooth vertical facing inversion (when swimming left, dorsal fin stays on top)
        const targetScaleY = Math.cos(this.heading) < 0 ? -1 : 1;
        this.facingScaleY += (targetScaleY - this.facingScaleY) * 0.12;

        // 7. Viewport soft boundary bounce
        const pad = this.size * 0.4;
        if (this.x < pad && this.vx < 0) {
          this.waypointX = width * 0.7;
          this.waypointTimer = 120;
        } else if (this.x > width - pad && this.vx > 0) {
          this.waypointX = width * 0.3;
          this.waypointTimer = 120;
        }

        if (this.y < pad && this.vy < 0) {
          this.waypointY = height * 0.7;
          this.waypointTimer = 120;
        } else if (this.y > height - pad && this.vy > 0) {
          this.waypointY = height * 0.3;
          this.waypointTimer = 120;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (!offscreenReady) return;

        ctx.save();
        ctx.translate(this.x, this.y);

        // Heading rotation
        ctx.rotate(this.heading);

        // Smooth flip so dorsal fin stays upward regardless of direction
        ctx.scale(1, this.facingScaleY);

        // Organic undulation (fish spine & fin flex)
        const finWaveX = 1 + Math.sin(this.tailCycle * 2) * 0.04;
        const finWaveY = 1 + Math.cos(this.tailCycle * 2) * 0.05;
        ctx.scale(finWaveX, finWaveY);

        // Alternate frames smoothly for swimming animation
        const frameCycle = Math.sin(this.tailCycle * 2);
        const activeCanvas = frameCycle > 0 ? this.canvas1 : this.canvas2;

        const w = this.size;
        const h = this.size;

        ctx.globalAlpha = this.alpha;

        // Center sprite cleanly on fish body
        ctx.drawImage(activeCanvas, -w * 0.5, -h * 0.5, w, h);

        ctx.restore();
      }
    }

    // Initialize 3 Betta fish across different depths
    const heroFishSize = Math.max(260, Math.min(width, height) * 0.32);
    const fishSquad: RealisticFish[] = [
      // 1. Hero Betta fish (foreground)
      new RealisticFish(
        width * 0.72,
        height * 0.38,
        heroFishSize,
        1.7,
        0.88,
        offscreenFish1,
        offscreenFish2
      ),
      // 2. Midground Betta fish (swimming across middle screen)
      new RealisticFish(
        width * 0.25,
        height * 0.65,
        heroFishSize * 0.68,
        1.3,
        0.58,
        offscreenFish2,
        offscreenFish1
      ),
      // 3. Deep ambient background Betta fish (smaller, ethereal depth)
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

    // --- Render Loop ---
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Crystal Oceanic Sunlit Glow (Optimized for Light Mode)
      const oceanGrad = ctx.createRadialGradient(
        width * 0.65,
        height * 0.35,
        120,
        width * 0.5,
        height * 0.5,
        width * 0.85
      );
      oceanGrad.addColorStop(0, 'rgba(186, 230, 253, 0.45)');  // soft sky blue
      oceanGrad.addColorStop(0.5, 'rgba(224, 242, 254, 0.22)');
      oceanGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = oceanGrad;
      ctx.fillRect(0, 0, width, height);

      // Translucent Sparkling Bubbles (Light Mode)
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
        ctx.fillStyle = `rgba(14, 165, 233, ${b.opacity * 0.65})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(wobbleX - b.radius * 0.3, b.y - b.radius * 0.3, b.radius * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.fill();
      });

      // Update and draw all fish in natural depth order
      // Deepest fish drawn first
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

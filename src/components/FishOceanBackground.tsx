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
        const padding = 140;
        this.waypointX = padding + Math.random() * (width - padding * 2);
        this.waypointY = padding + Math.random() * (height - padding * 2);
        this.waypointTimer = 220 + Math.random() * 260; // 4 to 8 seconds per gentle glide
      }

      update() {
        this.waypointTimer--;
        if (this.waypointTimer <= 0) {
          this.pickNewWaypoint();
        }

        // 1. Target vector towards waypoint with gentle sinusoidal wandering
        const wanderAngle = Math.sin(this.tailCycle * 0.4) * 0.25;
        const dx = this.waypointX - this.x;
        const dy = this.waypointY - this.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 100) {
          this.pickNewWaypoint();
        }

        let desiredHeading = Math.atan2(dy, dx) + wanderAngle;

        // 2. Interactive Startle & Evasion (Natural Betta C-start reflex)
        if (mouse.active) {
          const mdx = this.x - mouse.x;
          const mdy = this.y - mouse.y;
          const mDist = Math.hypot(mdx, mdy);
          if (mDist < mouse.radius && mDist > 0) {
            const fleeAngle = Math.atan2(mdy, mdx);
            const fleeFactor = Math.pow((mouse.radius - mDist) / mouse.radius, 1.4);
            desiredHeading = fleeAngle;
            this.tailSpeed = 0.16; // Rapid flutter
            this.speed = Math.min(this.maxSpeed * 1.5, this.speed + fleeFactor * 2.2);
          } else {
            this.tailSpeed += (0.045 - this.tailSpeed) * 0.025;
            this.speed += (this.baseSpeed - this.speed) * 0.02;
          }
        } else {
          this.tailSpeed += (0.045 - this.tailSpeed) * 0.025;
          this.speed += (this.baseSpeed - this.speed) * 0.02;
        }

        // 3. Smooth angular turning with angular momentum (prevents sharp robotic pivot)
        let angleDiff = desiredHeading - this.heading;
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
        // Turn speed slows down if turning sharply (hydrodynamic drag)
        const turnSpeed = Math.abs(angleDiff) > 1.2 ? 0.022 : 0.035;
        this.heading += angleDiff * turnSpeed;

        // 4. Biological kick-and-glide propulsion cycle
        this.tailCycle += this.tailSpeed;
        // Tail thrust pulses when the tail passes center, followed by a graceful glide
        const thrustPhase = Math.sin(this.tailCycle * 2.2);
        const thrustPulse = Math.max(0, thrustPhase);
        const effectiveSpeed = this.speed * (0.82 + thrustPulse * 0.38);

        // 5. Velocity integration with gentle water drag & drift
        const targetVx = Math.cos(this.heading) * effectiveSpeed;
        const targetVy = Math.sin(this.heading) * effectiveSpeed + Math.sin(this.tailCycle * 0.7) * 0.22;
        this.vx += (targetVx - this.vx) * 0.08;
        this.vy += (targetVy - this.vy) * 0.08;

        this.x += this.vx;
        this.y += this.vy;

        // 6. Smooth vertical facing inversion (keeps dorsal fin facing upward naturally)
        const targetScaleY = Math.cos(this.heading) < 0 ? -1 : 1;
        this.facingScaleY += (targetScaleY - this.facingScaleY) * 0.09;

        // 7. Soft boundary steering (smoothly steers away from edges before hitting them)
        const margin = 120;
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

        // Frame alternation for subtle texture/pose breathing
        const frameCycle = Math.sin(this.tailCycle * 1.5);
        const activeCanvas = frameCycle > 0 ? this.canvas1 : this.canvas2;

        const imgW = activeCanvas.width;
        const imgH = activeCanvas.height;
        if (imgW === 0 || imgH === 0) return;

        const w = this.size;
        const h = this.size;

        // Number of slices for silky smooth spine bending (30 slices)
        const numSlices = 30;
        const srcSliceW = imgW / numSlices;
        const destSliceW = (w / numSlices) + 1.0; // 1px overlap eliminates any seams
        const tailAmp = w * 0.075; // Wave amplitude

        // --- Pass 1: Translucent Underwater Drop Shadow for Depth ---
        ctx.save();
        ctx.translate(this.x + 12, this.y + 18);
        ctx.rotate(this.heading);
        ctx.scale(1, this.facingScaleY);
        ctx.globalAlpha = this.alpha * 0.14;
        ctx.filter = 'blur(6px)';

        for (let i = 0; i < numSlices; i++) {
          const u = i / (numSlices - 1); // 0 at tail (left), 1 at head (right)
          const distFromHead = 1 - u;
          const flexFactor = Math.pow(distFromHead, 1.45);
          const wavePhase = this.tailCycle * 2.2 - distFromHead * 3.6;
          const yOffset = Math.sin(wavePhase) * tailAmp * flexFactor;

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

        // --- Pass 2: Main Undulating Fish Body with Traveling Wave Spine ---
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.heading);
        ctx.scale(1, this.facingScaleY);
        ctx.globalAlpha = this.alpha;

        for (let i = 0; i < numSlices; i++) {
          // u ranges from 0 (tail tip) to 1 (head snout)
          const u = i / (numSlices - 1);
          const distFromHead = 1 - u;

          // Head (u ~ 1) remains steady and leads motion; tail (u ~ 0) flows freely
          const flexFactor = Math.pow(distFromHead, 1.45);
          const wavePhase = this.tailCycle * 2.2 - distFromHead * 3.6;

          // Primary traveling wave spine displacement
          let yOffset = Math.sin(wavePhase) * tailAmp * flexFactor;

          // Secondary harmonic fin ripple for ethereal gossamer fins (active near caudal tail)
          if (u < 0.45) {
            const finRipple = Math.cos(this.tailCycle * 3.0 - distFromHead * 6.0) * (tailAmp * 0.32) * Math.pow(distFromHead, 2.2);
            yOffset += finRipple;
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

        // --- Pass 3: Subtle Caustic Highlight on Dorsal Fin ---
        ctx.globalCompositeOperation = 'screen';
        ctx.globalAlpha = this.alpha * 0.28;
        const shimmerOffset = Math.sin(this.tailCycle * 1.8) * 0.1;
        const grad = ctx.createLinearGradient(-w * 0.2, -h * 0.35, w * 0.3, h * 0.2);
        grad.addColorStop(0, 'rgba(56, 189, 248, 0)');
        grad.addColorStop(0.5 + shimmerOffset, 'rgba(125, 211, 252, 0.45)');
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(w * 0.05, -h * 0.08, w * 0.38, h * 0.22, 0, 0, Math.PI * 2);
        ctx.fill();

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

import React, { useEffect, useRef } from 'react';

interface FishSegment {
  x: number;
  y: number;
  radius: number;
}


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

    // Mouse tracking for subtle interactive steering
    const mouse = {
      x: width * 0.7,
      y: height * 0.45,
      targetX: width * 0.7,
      targetY: height * 0.45,
      hasMoved: false,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.hasMoved = true;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // --- Ambient Underwater Particles (Bubbles & Plankton) ---
    interface Bubble {
      x: number;
      y: number;
      radius: number;
      speedY: number;
      speedX: number;
      opacity: number;
      wobbleSpeed: number;
      wobbleAmp: number;
      phase: number;
    }

    const bubbles: Bubble[] = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 3 + 1,
      speedY: Math.random() * 0.7 + 0.3,
      speedX: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.4 + 0.15,
      wobbleSpeed: Math.random() * 0.03 + 0.01,
      wobbleAmp: Math.random() * 1.5 + 0.5,
      phase: Math.random() * Math.PI * 2,
    }));

    // --- Bioluminescent Betta Fish Simulation ---
    class BettaFish {
      x: number;
      y: number;
      vx: number;
      vy: number;
      angle: number;
      targetAngle: number;
      speed: number;
      baseSpeed: number;
      scale: number;
      tailWagSpeed: number;
      tailPhase: number;
      segments: FishSegment[];
      colors: {
        primary: string;
        secondary: string;
        highlight: string;
        glow: string;
        finBase: string;
        finTip: string;
      };

      constructor(x: number, y: number, scale = 1, isPrimary = true) {
        this.x = x;
        this.y = y;
        this.vx = 1.2;
        this.vy = 0.4;
        this.angle = 0;
        this.targetAngle = 0;
        this.scale = scale;
        this.baseSpeed = isPrimary ? 1.8 : 1.2;
        this.speed = this.baseSpeed;
        this.tailWagSpeed = 0.08;
        this.tailPhase = Math.random() * Math.PI * 2;

        // 14 body vertebral segments for fluid swimming motion
        const numSegments = 14;
        this.segments = [];
        for (let i = 0; i < numSegments; i++) {
          const t = i / numSegments;
          // Body thickness profile: tapered head, thick torso, tapering tail
          const radius =
            i === 0
              ? 16 * scale
              : (Math.sin(t * Math.PI) * 22 + 4) * scale;
          this.segments.push({ x: this.x - i * 12 * scale, y: this.y, radius });
        }

        // Vibrant neon betta colors matching the user screenshot (electric sapphire blue, teal & golden highlights)
        this.colors = isPrimary
          ? {
              primary: '#0ea5e9', // vivid cyan/sky blue
              secondary: '#1d4ed8', // deep royal blue
              highlight: '#38bdf8', // radiant neon teal
              glow: 'rgba(14, 165, 233, 0.4)',
              finBase: '#0284c7',
              finTip: '#f59e0b', // amber gold tips
            }
          : {
              primary: '#06b6d4',
              secondary: '#0369a1',
              highlight: '#67e8f9',
              glow: 'rgba(6, 182, 212, 0.25)',
              finBase: '#0284c7',
              finTip: '#fb923c',
            };
      }

      update(time: number, targetX: number, targetY: number, hasMouse: boolean) {
        this.tailPhase += this.tailWagSpeed;

        // Autonomous fluid wandering with gentle attraction to user mouse
        let destX = targetX;
        let destY = targetY;

        if (!hasMouse) {
          // Graceful lissajous wandering trajectory
          destX = width * 0.5 + Math.sin(time * 0.0004) * (width * 0.38);
          destY = height * 0.5 + Math.cos(time * 0.0006) * (height * 0.32);
        }

        const dx = destX - this.x;
        const dy = destY - this.y;
        const dist = Math.sqrt(dx * dy + dy * dy);

        // Turn towards target
        this.targetAngle = Math.atan2(dy, dx);
        let angleDiff = this.targetAngle - this.angle;

        // Normalize angle diff
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;

        this.angle += angleDiff * 0.035;

        // Swimming speed with acceleration on turns
        const currentSpeed =
          this.baseSpeed + Math.sin(this.tailPhase * 2) * 0.4 + (dist > 300 ? 0.8 : 0);
        this.vx = Math.cos(this.angle) * currentSpeed;
        this.vy = Math.sin(this.angle) * currentSpeed;

        this.x += this.vx;
        this.y += this.vy;

        // Keep inside bounds with smooth wrap
        const padding = 120 * this.scale;
        if (this.x < -padding) this.x = width + padding;
        if (this.x > width + padding) this.x = -padding;
        if (this.y < -padding) this.y = height + padding;
        if (this.y > height + padding) this.y = -padding;

        // Update body segments with inverse kinematics wave propagation
        this.segments[0].x = this.x;
        this.segments[0].y = this.y;

        for (let i = 1; i < this.segments.length; i++) {
          const prev = this.segments[i - 1];
          const curr = this.segments[i];

          const segDx = curr.x - prev.x;
          const segDy = curr.y - prev.y;
          const segDist = Math.sqrt(segDx * segDx + segDy * segDy);
          const targetDist = 11 * this.scale;

          // Undulating lateral motion based on spine position
          const waveOffset =
            Math.sin(this.tailPhase - i * 0.45) * (i * 1.6 * this.scale);
          const normalAngle = Math.atan2(segDy, segDx) + Math.PI / 2;

          if (segDist !== 0) {
            curr.x = prev.x + (segDx / segDist) * targetDist + Math.cos(normalAngle) * (waveOffset * 0.12);
            curr.y = prev.y + (segDy / segDist) * targetDist + Math.sin(normalAngle) * (waveOffset * 0.12);
          }
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();

        // 1. Draw Flowing Caudal (Tail) Fin (Magnificent Betta Tail)
        this.drawCaudalFin(ctx);

        // 2. Draw Dorsal (Top) and Ventral (Bottom) Fins
        this.drawDorsalAndVentralFins(ctx);

        // 3. Draw Fish Body with Shimmering Scales
        this.drawBody(ctx);

        // 4. Draw Pectoral (Side) Fins
        this.drawPectoralFins(ctx);

        // 5. Draw Head, Eyes & Bioluminescent Glow
        this.drawHead(ctx);

        ctx.restore();
      }

      drawBody(ctx: CanvasRenderingContext2D) {
        const segs = this.segments;
        if (segs.length < 2) return;

        // Outer glow
        ctx.shadowColor = this.colors.glow;
        ctx.shadowBlur = 24 * this.scale;

        // Construct smooth body spline
        ctx.beginPath();

        // Left side of body
        for (let i = 0; i < segs.length; i++) {
          const seg = segs[i];
          const next = segs[Math.min(i + 1, segs.length - 1)];
          const angle = Math.atan2(next.y - seg.y, next.x - seg.x) + Math.PI / 2;
          const px = seg.x + Math.cos(angle) * seg.radius;
          const py = seg.y + Math.sin(angle) * seg.radius;

          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }

        // Tail tip
        const tailSeg = segs[segs.length - 1];
        ctx.lineTo(tailSeg.x, tailSeg.y);

        // Right side of body (reverse)
        for (let i = segs.length - 1; i >= 0; i--) {
          const seg = segs[i];
          const next = segs[Math.min(i + 1, segs.length - 1)];
          const angle = Math.atan2(next.y - seg.y, next.x - seg.x) - Math.PI / 2;
          const px = seg.x + Math.cos(angle) * seg.radius;
          const py = seg.y + Math.sin(angle) * seg.radius;
          ctx.lineTo(px, py);
        }

        ctx.closePath();

        // Body gradient: Metallic cyan/blue with dark undertones
        const grad = ctx.createLinearGradient(
          segs[0].x,
          segs[0].y,
          tailSeg.x,
          tailSeg.y
        );
        grad.addColorStop(0, this.colors.highlight);
        grad.addColorStop(0.3, this.colors.primary);
        grad.addColorStop(0.7, this.colors.secondary);
        grad.addColorStop(1, '#0f172a');

        ctx.fillStyle = grad;
        ctx.fill();

        // Scale pattern overlay & highlights along torso
        ctx.shadowBlur = 0;
        ctx.lineWidth = 1.2 * this.scale;
        for (let i = 2; i < segs.length - 3; i += 2) {
          const s = segs[i];
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius * 0.75, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
          ctx.stroke();
        }
      }

      drawHead(ctx: CanvasRenderingContext2D) {
        const head = this.segments[0];
        const neck = this.segments[1];
        const angle = Math.atan2(head.y - neck.y, head.x - neck.x);

        // Glowing Betta Eye (Golden/Cyan ring)
        const eyeOffset = 9 * this.scale;
        const eyeAngle = angle + 0.65;
        const eyeX = head.x + Math.cos(eyeAngle) * eyeOffset;
        const eyeY = head.y + Math.sin(eyeAngle) * eyeOffset;

        // Eye glow
        ctx.beginPath();
        ctx.arc(eyeX, eyeY, 4 * this.scale, 0, Math.PI * 2);
        ctx.fillStyle = '#fef08a'; // Golden iris
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 8 * this.scale;
        ctx.fill();

        // Pupil
        ctx.beginPath();
        ctx.arc(eyeX, eyeY, 2 * this.scale, 0, Math.PI * 2);
        ctx.fillStyle = '#0f172a';
        ctx.fill();

        // Snout highlight
        const snoutX = head.x + Math.cos(angle) * (head.radius * 0.9);
        const snoutY = head.y + Math.sin(angle) * (head.radius * 0.9);
        ctx.beginPath();
        ctx.arc(snoutX, snoutY, 3 * this.scale, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fill();
      }

      drawCaudalFin(ctx: CanvasRenderingContext2D) {
        // Enormous, undulating Betta caudal fin with translucent folds
        const tailRoot = this.segments[this.segments.length - 1];
        const prevSeg = this.segments[this.segments.length - 3];
        const baseAngle = Math.atan2(tailRoot.y - prevSeg.y, tailRoot.x - prevSeg.x);

        const finRays = 18;
        const finLength = 110 * this.scale;

        ctx.save();
        ctx.shadowColor = this.colors.glow;
        ctx.shadowBlur = 18 * this.scale;

        // Multi-layered fin ribbons
        for (let layer = 0; layer < 3; layer++) {
          ctx.beginPath();
          ctx.moveTo(tailRoot.x, tailRoot.y);

          const layerOffset = (layer - 1) * 0.15;
          const fanSpread = Math.PI * 0.65; // Wide dramatic fan

          for (let r = 0; r <= finRays; r++) {
            const spreadRatio = (r / finRays - 0.5) * fanSpread;
            const rayAngle = baseAngle + Math.PI + spreadRatio + layerOffset;

            // Wave undulation travelling down tail
            const wave = Math.sin(this.tailPhase * 1.5 - (r * 0.25)) * (16 * this.scale);
            const rLen = finLength * (0.8 + Math.cos(spreadRatio * 1.2) * 0.5);

            const fx = tailRoot.x + Math.cos(rayAngle) * rLen + Math.cos(rayAngle + Math.PI / 2) * wave;
            const fy = tailRoot.y + Math.sin(rayAngle) * rLen + Math.sin(rayAngle + Math.PI / 2) * wave;

            if (r === 0) ctx.moveTo(fx, fy);
            else ctx.lineTo(fx, fy);
          }

          ctx.lineTo(tailRoot.x, tailRoot.y);
          ctx.closePath();

          // Gradient: Neon Teal/Blue into Fiery Golden Amber Edges
          const finGrad = ctx.createRadialGradient(
            tailRoot.x,
            tailRoot.y,
            10 * this.scale,
            tailRoot.x + Math.cos(baseAngle + Math.PI) * finLength,
            tailRoot.y + Math.sin(baseAngle + Math.PI) * finLength,
            finLength
          );
          finGrad.addColorStop(0, 'rgba(14, 165, 233, 0.7)');
          finGrad.addColorStop(0.5, 'rgba(29, 78, 216, 0.45)');
          finGrad.addColorStop(0.85, 'rgba(245, 158, 11, 0.5)'); // Golden amber margin
          finGrad.addColorStop(1, 'rgba(234, 88, 12, 0.15)');

          ctx.fillStyle = finGrad;
          ctx.fill();

          // Delicate fin rib rays
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
          ctx.lineWidth = 0.8 * this.scale;
          ctx.stroke();
        }
        ctx.restore();
      }

      drawDorsalAndVentralFins(ctx: CanvasRenderingContext2D) {
        // Dorsal (Top) Fin
        const midSeg = this.segments[4];
        const midAngle = Math.atan2(
          this.segments[5].y - midSeg.y,
          this.segments[5].x - midSeg.x
        );

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(midSeg.x, midSeg.y);

        const dorsalAngle = midAngle - Math.PI / 2;
        const dorsalWave = Math.sin(this.tailPhase * 1.2) * (10 * this.scale);
        const dLen = 65 * this.scale;

        const p1x = midSeg.x + Math.cos(dorsalAngle - 0.4) * dLen + dorsalWave;
        const p1y = midSeg.y + Math.sin(dorsalAngle - 0.4) * dLen;
        const p2x = this.segments[9].x + Math.cos(dorsalAngle + 0.2) * (dLen * 0.7);
        const p2y = this.segments[9].y + Math.sin(dorsalAngle + 0.2) * (dLen * 0.7);

        ctx.quadraticCurveTo(p1x, p1y, p2x, p2y);
        ctx.lineTo(this.segments[8].x, this.segments[8].y);
        ctx.closePath();

        const dorsalGrad = ctx.createLinearGradient(
          midSeg.x,
          midSeg.y,
          p1x,
          p1y
        );
        dorsalGrad.addColorStop(0, 'rgba(56, 189, 248, 0.6)');
        dorsalGrad.addColorStop(0.8, 'rgba(245, 158, 11, 0.4)');
        dorsalGrad.addColorStop(1, 'rgba(234, 88, 12, 0)');

        ctx.fillStyle = dorsalGrad;
        ctx.fill();

        // Ventral (Bottom / Anal) Fin
        ctx.beginPath();
        const ventralAngle = midAngle + Math.PI / 2;
        ctx.moveTo(this.segments[5].x, this.segments[5].y);

        const v1x = this.segments[6].x + Math.cos(ventralAngle + 0.3) * (55 * this.scale);
        const v1y = this.segments[6].y + Math.sin(ventralAngle + 0.3) * (55 * this.scale);
        const v2x = this.segments[10].x + Math.cos(ventralAngle - 0.2) * (35 * this.scale);
        const v2y = this.segments[10].y + Math.sin(ventralAngle - 0.2) * (35 * this.scale);

        ctx.quadraticCurveTo(v1x, v1y, v2x, v2y);
        ctx.lineTo(this.segments[10].x, this.segments[10].y);
        ctx.closePath();

        ctx.fillStyle = dorsalGrad;
        ctx.fill();

        ctx.restore();
      }

      drawPectoralFins(ctx: CanvasRenderingContext2D) {
        // Fluttering translucent side fins
        const shoulder = this.segments[2];
        const angle = Math.atan2(
          this.segments[3].y - shoulder.y,
          this.segments[3].x - shoulder.x
        );

        ctx.save();
        const finAngle = angle + Math.PI / 2 + Math.sin(this.tailPhase * 2) * 0.4;
        const fLen = 32 * this.scale;

        ctx.beginPath();
        ctx.moveTo(shoulder.x, shoulder.y);
        ctx.quadraticCurveTo(
          shoulder.x + Math.cos(finAngle) * fLen,
          shoulder.y + Math.sin(finAngle) * fLen,
          shoulder.x + Math.cos(finAngle - 0.5) * (fLen * 0.7),
          shoulder.y + Math.sin(finAngle - 0.5) * (fLen * 0.7)
        );
        ctx.closePath();

        ctx.fillStyle = 'rgba(56, 189, 248, 0.4)';
        ctx.fill();
        ctx.restore();
      }
    }

    // Initialize the primary majestic Betta fish and a background schooling companion
    const heroBetta = new BettaFish(width * 0.75, height * 0.38, 1.25, true);
    const companionBetta = new BettaFish(width * 0.25, height * 0.65, 0.75, false);

    // --- Animation Loop ---
    const render = (time: number) => {
      // Clear with subtle oceanic dark depth trail
      ctx.clearRect(0, 0, width, height);

      // Deep Aquatic Gradient Background
      const oceanGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.2,
        80,
        width * 0.5,
        height * 0.5,
        width * 0.9
      );
      oceanGrad.addColorStop(0, 'rgba(8, 28, 54, 0.45)'); // Bioluminescent light pool
      oceanGrad.addColorStop(0.5, 'rgba(6, 18, 38, 0.3)');
      oceanGrad.addColorStop(1, 'rgba(3, 7, 18, 0)');

      ctx.fillStyle = oceanGrad;
      ctx.fillRect(0, 0, width, height);

      // 1. Draw Volumetric Underwater Sunbeams / Light Caustics
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const beamGrad = ctx.createLinearGradient(0, 0, width * 0.8, height);
      beamGrad.addColorStop(0, 'rgba(56, 189, 248, 0.05)');
      beamGrad.addColorStop(0.5, 'rgba(14, 165, 233, 0.02)');
      beamGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = beamGrad;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      // 2. Animate and Draw Bubbles & Micro-Plankton
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

        // Bubble light highlight
        ctx.beginPath();
        ctx.arc(wobbleX - b.radius * 0.3, b.y - b.radius * 0.3, b.radius * 0.25, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.fill();
      });

      // 3. Update & Draw Companion Betta (in deep background layer)
      companionBetta.update(time, mouse.targetX, mouse.targetY, false);
      ctx.save();
      ctx.globalAlpha = 0.55;
      companionBetta.draw(ctx);
      ctx.restore();

      // 4. Update & Draw Primary Hero Betta Fish
      heroBetta.update(
        time,
        mouse.targetX,
        mouse.targetY,
        mouse.hasMoved
      );
      heroBetta.draw(ctx);

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
        opacity: 0.95,
        mixBlendMode: 'screen',
      }}
    />
  );
};

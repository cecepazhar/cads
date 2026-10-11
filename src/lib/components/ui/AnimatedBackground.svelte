<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import type { BaseComponentProps } from './types';

  export interface AnimatedBackgroundProps extends BaseComponentProps {
    /** On/off toggle. @default true */
    enabled?: boolean;
    /** Glow target X in canvas px. @default center */
    targetX?: number;
    /** Glow target Y in canvas px. @default center */
    targetY?: number;
    /** Number of streamers. @default 5 */
    particleCount?: number;
    /** Primary accent color. @default var(--ca-brand) */
    color?: string;
    /** Spark/glow secondary color. @default var(--ca-info) */
    secondaryColor?: string;
    /** Animation speed multiplier. @default 1 */
    speed?: number;
    /** Grid cell size in px. @default 40 */
    cellSize?: number;
    /** FPS throttle cap. @default 30 */
    maxFps?: number;
  }

  let {
    enabled = true,
    targetX,
    targetY,
    particleCount = 5,
    color = 'var(--ca-brand)',
    secondaryColor = 'var(--ca-info)',
    speed = 1,
    cellSize = 40,
    maxFps = 30,
    class: customClass = '',
  }: AnimatedBackgroundProps = $props();

  let canvas: HTMLCanvasElement | undefined = $state(undefined);
  let animId = 0;
  let ctx: CanvasRenderingContext2D | null = null;
  let width = 0;
  let height = 0;
  let isVisible = true;
  let lastFrameTime = 0;
  let mounted = false;

  // Resolved color components (r, g, b) for canvas rgba usage
  let primaryR = 56;
  let primaryG = 189;
  let primaryB = 248;
  let secondaryR = 14;
  let secondaryG = 165;
  let secondaryB = 233;
  let resolvedPrimary = 'rgb(56, 189, 248)';
  // eslint-disable-next-line no-unused-vars
  let resolvedSecondary = 'rgb(14, 165, 233)';

  const SPEEDS = [0.65, 0.9, 1.15, 1.4, 1.65];

  // ── Streamer / Spark types ────────────────────────────────────────────────

  interface Streamer {
    id: number;
    x: number;
    y: number;
    dirX: number;
    dirY: number;
    nextX: number;
    nextY: number;
    spd: number;
    length: number;
    history: { x: number; y: number }[];
    baseAlpha: number;
    lineWidth: number;
    fade: number;
    reachedTarget: boolean;
    respawnDelay: number;
  }

  interface Spark {
    x: number;
    y: number;
    vx: number;
    vy: number;
    alpha: number;
    decay: number;
    size: number;
    r: number;
    g: number;
    b: number;
  }

  let streamers: Streamer[] = [];
  let sparks: Spark[] = [];

  // ── Derived target (default to center when not provided) ──────────────────

  const effectiveTargetX = $derived(targetX ?? Math.floor(width / 2));
  const effectiveTargetY = $derived(targetY ?? Math.floor(height / 2));
  const effectiveCount = $derived(Math.min(Math.max(particleCount, 1), 10));
  const targetFrameMs = $derived(1000 / maxFps);

  // ── Color resolution ──────────────────────────────────────────────────────

  function resolveColor(cssColor: string): { r: number; g: number; b: number; str: string } {
    if (typeof document === 'undefined') {
      return { r: primaryR, g: primaryG, b: primaryB, str: resolvedPrimary };
    }
    const probe = document.createElement('span');
    probe.style.position = 'absolute';
    probe.style.visibility = 'hidden';
    probe.style.pointerEvents = 'none';
    probe.style.color = cssColor;
    document.body.appendChild(probe);
    const computed = getComputedStyle(probe).color;
    document.body.removeChild(probe);

    const match = computed.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (match) {
      return {
        r: parseInt(match[1], 10),
        g: parseInt(match[2], 10),
        b: parseInt(match[3], 10),
        str: `rgb(${match[1]}, ${match[2]}, ${match[3]})`,
      };
    }
    return { r: 56, g: 189, b: 248, str: 'rgb(56, 189, 248)' };
  }

  function resolveColors() {
    const p = resolveColor(color);
    primaryR = p.r;
    primaryG = p.g;
    primaryB = p.b;
    resolvedPrimary = p.str;

    const s = resolveColor(secondaryColor);
    secondaryR = s.r;
    secondaryG = s.g;
    secondaryB = s.b;
    resolvedSecondary = s.str;
  }

  // ── Grid helpers ──────────────────────────────────────────────────────────

  function getGridOffset() {
    // eslint-disable-next-line no-unused-vars
    const tx = effectiveTargetX;
    // eslint-disable-next-line no-unused-vars
    const ty = effectiveTargetY;
    const startX = ((tx % cellSize) + cellSize) % cellSize;
    const startY = ((ty % cellSize) + cellSize) % cellSize;
    return { startX, startY };
  }

  function triggerExplosion(x: number, y: number) {
    const sparkCount = 10 + Math.floor(Math.random() * 6);
    const colors = [
      { r: primaryR, g: primaryG, b: primaryB },
      { r: secondaryR, g: secondaryG, b: secondaryB },
      { r: 255, g: 255, b: 255 },
    ];
    for (let i = 0; i < sparkCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const spd = 0.6 + Math.random() * 2.0;
      const c = colors[Math.floor(Math.random() * colors.length)];
      sparks.push({
        x: x + (Math.random() - 0.5) * 4,
        y: y + (Math.random() - 0.5) * 4,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd,
        alpha: 1.0,
        decay: 0.025 + Math.random() * 0.03,
        size: 1.2 + Math.random() * 1.6,
        r: c.r,
        g: c.g,
        b: c.b,
      });
    }
  }

  // ── Streamer pathfinding ──────────────────────────────────────────────────

  function chooseNextDirection(s: Streamer) {
    const { startX, startY } = getGridOffset();
    const tx = effectiveTargetX;
    const ty = effectiveTargetY;
    const currDist = Math.hypot(tx - s.x, ty - s.y);

    const candidates = [
      { dirX: s.dirX, dirY: s.dirY, straight: true },
      { dirX: s.dirY, dirY: -s.dirX, straight: false },
      { dirX: -s.dirY, dirY: s.dirX, straight: false },
    ];

    const valid = candidates.filter((c) => {
      const nx = s.x + c.dirX * cellSize;
      const ny = s.y + c.dirY * cellSize;
      return (
        nx >= startX - cellSize &&
        ny >= startY - cellSize &&
        nx <= width + cellSize * 2 &&
        ny <= height + cellSize * 2
      );
    });

    const closer = valid.filter((c) => {
      const nx = s.x + c.dirX * cellSize;
      const ny = s.y + c.dirY * cellSize;
      return Math.hypot(tx - nx, ty - ny) < currDist;
    });

    let chosen: { dirX: number; dirY: number };

    if (closer.length > 0) {
      const straightCloser = closer.find((c) => c.straight);
      if (straightCloser && Math.random() < 0.7) {
        chosen = straightCloser;
      } else {
        chosen = closer[Math.floor(Math.random() * closer.length)];
      }
    } else if (valid.length > 0) {
      chosen = valid[Math.floor(Math.random() * valid.length)];
    } else {
      chosen = { dirX: -s.dirX, dirY: -s.dirY };
    }

    s.dirX = chosen.dirX;
    s.dirY = chosen.dirY;
  }

  function stepStreamer(s: Streamer) {
    if (s.respawnDelay > 0) {
      s.respawnDelay--;
      return;
    }

    if (!s.reachedTarget && s.fade < 1) {
      s.fade = Math.min(1, s.fade + 0.03);
    }

    const tx = effectiveTargetX;
    const ty = effectiveTargetY;
    const distToTarget = Math.hypot(s.x - tx, s.y - ty);

    if (distToTarget <= 36 && !s.reachedTarget) {
      s.reachedTarget = true;
      triggerExplosion(s.x, s.y);
      s.fade = 0;
      s.history = [];
      return;
    }

    let remaining = s.spd;

    while (remaining > 0) {
      const distToNext =
        s.dirX !== 0 ? Math.abs(s.nextX - s.x) : Math.abs(s.nextY - s.y);

      if (remaining < distToNext) {
        s.x += s.dirX * remaining;
        s.y += s.dirY * remaining;
        remaining = 0;
      } else {
        s.x = s.nextX;
        s.y = s.nextY;
        remaining -= distToNext;

        s.history.unshift({ x: s.x, y: s.y });

        if (Math.hypot(s.x - tx, s.y - ty) <= 36) {
          s.reachedTarget = true;
          triggerExplosion(s.x, s.y);
          s.fade = 0;
          s.history = [];
          return;
        }

        chooseNextDirection(s);
        s.nextX = s.x + s.dirX * cellSize;
        s.nextY = s.y + s.dirY * cellSize;
      }
    }

    s.history.unshift({ x: s.x, y: s.y });
    while (s.history.length > s.length) {
      s.history.pop();
    }
  }

  function createStreamer(id: number, randomStart = false): Streamer {
    const { startX, startY } = getGridOffset();
    const cols = Math.max(1, Math.floor((width || 600) / cellSize));
    const rows = Math.max(1, Math.floor((height || 800) / cellSize));
    const tx = effectiveTargetX;
    const ty = effectiveTargetY;

    // eslint-disable-next-line no-useless-assignment
    let x = 0;
    // eslint-disable-next-line no-useless-assignment
    let y = 0;
    // eslint-disable-next-line no-useless-assignment
    let dirX = 0;
    // eslint-disable-next-line no-useless-assignment
    let dirY = 0;

    if (randomStart) {
      const col = 1 + Math.floor(Math.random() * (cols - 1));
      const row = 1 + Math.floor(Math.random() * (rows - 1));
      x = startX + col * cellSize;
      y = startY + row * cellSize;

      if (Math.hypot(x - tx, y - ty) < 100) {
        x += 3 * cellSize;
        y += 3 * cellSize;
      }

      if (Math.random() < 0.5) {
        dirX = tx < x ? -1 : 1;
        dirY = 0;
      } else {
        dirX = 0;
        dirY = ty < y ? -1 : 1;
      }
    } else {
      const edge = Math.random();
      if (edge < 0.5) {
        const col = Math.floor(Math.random() * (cols + 1));
        x = startX + col * cellSize;
        y = startY + (rows + 1) * cellSize;
        dirX = 0;
        dirY = -1;
      } else {
        const row = Math.floor(Math.random() * (rows + 1));
        x = startX + (cols + 1) * cellSize;
        y = startY + row * cellSize;
        dirX = -1;
        dirY = 0;
      }
    }

    const spd = SPEEDS[id % SPEEDS.length] * speed;
    const length = 22 + (id % 3) * 6;
    const baseAlpha = 0.4 + ((id * 0.12) % 0.35);
    const lineWidth = 1.3 + (id % 2) * 0.4;

    const streamer: Streamer = {
      id,
      x,
      y,
      dirX,
      dirY,
      nextX: x + dirX * cellSize,
      nextY: y + dirY * cellSize,
      spd,
      length,
      history: [{ x, y }],
      baseAlpha,
      lineWidth,
      fade: randomStart ? 0.6 + Math.random() * 0.4 : 0,
      reachedTarget: false,
      respawnDelay: randomStart ? 0 : Math.floor(Math.random() * 40),
    };

    if (randomStart) {
      const preWarmSteps = Math.floor(length * 0.6);
      for (let step = 0; step < preWarmSteps; step++) {
        if (Math.hypot(streamer.x - tx, streamer.y - ty) <= 36) break;
        stepStreamer(streamer);
      }
    }

    return streamer;
  }

  function initStreamers() {
    streamers = [];
    sparks = [];
    for (let i = 0; i < effectiveCount; i++) {
      streamers.push(createStreamer(i, true));
    }
  }

  // ── Canvas resize ─────────────────────────────────────────────────────────

  function resize() {
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);

    if (ctx) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
  }

  // ── Drawing ───────────────────────────────────────────────────────────────

  function drawGrid() {
    if (!ctx || !width || !height) return;
    const { startX, startY } = getGridOffset();
    const tx = effectiveTargetX;
    const ty = effectiveTargetY;

    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = `rgba(${primaryR}, ${primaryG}, ${primaryB}, 0.07)`;
    ctx.lineWidth = 1;

    for (let gx = startX; gx < width; gx += cellSize) {
      const px = Math.floor(gx) + 0.5;
      ctx.moveTo(px, 0);
      ctx.lineTo(px, height);
    }
    for (let gy = startY; gy < height; gy += cellSize) {
      const py = Math.floor(gy) + 0.5;
      ctx.moveTo(0, py);
      ctx.lineTo(width, py);
    }
    ctx.stroke();

    ctx.fillStyle = `rgba(${primaryR}, ${primaryG}, ${primaryB}, 0.12)`;
    for (let gx = startX; gx < width; gx += cellSize * 2) {
      for (let gy = startY; gy < height; gy += cellSize * 2) {
        ctx.fillRect(Math.floor(gx) - 1, Math.floor(gy) - 1, 2, 2);
      }
    }

    const glow = ctx.createRadialGradient(tx, ty, 0, tx, ty, 60);
    glow.addColorStop(0, `rgba(${primaryR}, ${primaryG}, ${primaryB}, 0.14)`);
    glow.addColorStop(1, `rgba(${primaryR}, ${primaryG}, ${primaryB}, 0)`);
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(tx, ty, 60, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  function updateAndDraw(timestamp: number = performance.now()) {
    if (!isVisible || !enabled) return;

    if (timestamp - lastFrameTime < targetFrameMs) {
      animId = requestAnimationFrame(updateAndDraw);
      return;
    }
    lastFrameTime = timestamp;

    if (!ctx || !width || !height) {
      if (isVisible) animId = requestAnimationFrame(updateAndDraw);
      return;
    }

    const tx = effectiveTargetX;
    const ty = effectiveTargetY;

    ctx.clearRect(0, 0, width, height);
    drawGrid();

    // Draw and update Streamers
    for (let i = 0; i < streamers.length; i++) {
      const s = streamers[i];

      if (
        (s.reachedTarget && s.fade <= 0) ||
        s.x < -100 ||
        s.y < -100 ||
        s.x > width + 100 ||
        s.y > height + 100
      ) {
        streamers[i] = createStreamer(s.id, false);
        continue;
      }

      stepStreamer(s);

      if (s.history.length < 2 || s.fade <= 0) continue;

      const head = s.history[0];
      const tail = s.history[s.history.length - 1];
      const gDist = Math.hypot(head.x - tail.x, head.y - tail.y);

      let grad: CanvasGradient;
      if (gDist > 4) {
        grad = ctx.createLinearGradient(head.x, head.y, tail.x, tail.y);
      } else {
        grad = ctx.createLinearGradient(
          head.x,
          head.y,
          head.x + (s.dirX !== 0 ? s.dirX : 1) * 24,
          head.y + (s.dirY !== 0 ? s.dirY : 1) * 24,
        );
      }

      const alpha = s.baseAlpha * Math.max(0, s.fade);
      grad.addColorStop(0, `rgba(${primaryR}, ${primaryG}, ${primaryB}, ${alpha.toFixed(3)})`);
      grad.addColorStop(0.3, `rgba(${primaryR}, ${primaryG}, ${primaryB}, ${(alpha * 0.85).toFixed(3)})`);
      grad.addColorStop(0.7, `rgba(${secondaryR}, ${secondaryG}, ${secondaryB}, ${(alpha * 0.35).toFixed(3)})`);
      grad.addColorStop(1, `rgba(${primaryR}, ${primaryG}, ${primaryB}, 0)`);

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(head.x, head.y);
      for (let j = 1; j < s.history.length; j++) {
        ctx.lineTo(s.history[j].x, s.history[j].y);
      }

      ctx.strokeStyle = grad;
      ctx.lineWidth = s.lineWidth;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();

      const headAlpha = alpha * 0.95;
      ctx.beginPath();
      ctx.arc(head.x, head.y, Math.max(s.lineWidth * 0.9, 1.6), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${primaryR}, ${primaryG}, ${primaryB}, ${headAlpha.toFixed(3)})`;
      ctx.fill();

      ctx.restore();
    }

    // Draw and update Explosion Sparks
    for (let i = sparks.length - 1; i >= 0; i--) {
      const p = sparks[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.94;
      p.vy *= 0.94;
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        sparks.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${Math.max(0, p.alpha).toFixed(3)})`;
      ctx.fill();
      ctx.restore();
    }

    if (isVisible && enabled) {
      animId = requestAnimationFrame(updateAndDraw);
    }
  }

  // ── Visibility handling ───────────────────────────────────────────────────

  function handleVisibility(visible: boolean) {
    if (!visible) {
      isVisible = false;
      cancelAnimationFrame(animId);
    } else {
      if (!isVisible) {
        isVisible = true;
        lastFrameTime = performance.now();
        if (enabled) animId = requestAnimationFrame(updateAndDraw);
      }
    }
  }

  const onVisibilityChange = () => handleVisibility(!document.hidden);
  const onBlur = () => handleVisibility(false);
  const onFocus = () => handleVisibility(true);

  // ── Lifecycle ─────────────────────────────────────────────────────────────

  function startAnimation() {
    if (!canvas || !enabled) return;
    resolveColors();
    ctx = canvas.getContext('2d');
    resize();
    initStreamers();
    lastFrameTime = performance.now();
    animId = requestAnimationFrame(updateAndDraw);
  }

  function stopAnimation() {
    cancelAnimationFrame(animId);
    animId = 0;
    if (ctx && width && height) {
      ctx.clearRect(0, 0, width, height);
    }
    streamers = [];
    sparks = [];
    ctx = null;
  }

  $effect(() => {
    if (!mounted) return;
    if (enabled) {
      resolveColors();
      startAnimation();
    } else {
      stopAnimation();
    }
  });

  // Re-resolve colors when props change while running
  $effect(() => {
    // Track props
    void color;
    void secondaryColor;
    if (mounted && enabled && ctx) {
      resolveColors();
    }
  });

  onMount(() => {
    mounted = true;

    const ro = new ResizeObserver(() => resize());
    if (canvas) ro.observe(canvas);
    document.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('blur', onBlur);
    window.addEventListener('focus', onFocus);

    return () => {
      stopAnimation();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('blur', onBlur);
      window.removeEventListener('focus', onFocus);
    };
  });

  onDestroy(() => {
    if (typeof cancelAnimationFrame !== 'undefined' && animId) {
      cancelAnimationFrame(animId);
    }
  });
</script>

<canvas
  bind:this={canvas}
  class="absolute inset-0 pointer-events-none w-full h-full z-0 {customClass}"
  aria-hidden="true"
></canvas>
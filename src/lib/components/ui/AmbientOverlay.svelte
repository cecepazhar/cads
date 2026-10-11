<script lang="ts">
  import type { BaseComponentProps } from './types';

  type AmbientMode = 'accent' | 'rgb-cycle' | 'aurora';
  type AmbientEffect = 'none' | 'breathing' | 'wave';
  type GlowStyle = 'diffused' | 'neon' | 'chroma';

  export interface AmbientOverlayProps extends BaseComponentProps {
    /** On/off toggle. @default false */
    enabled?: boolean;
    /** Color mode. @default 'accent' */
    mode?: AmbientMode;
    /** Primary accent color. @default var(--ca-brand) */
    color?: string;
    /** Bicolor secondary color. @default var(--ca-success) */
    secondaryColor?: string;
    /** Overlay opacity 0-1. @default 0.5 */
    intensity?: number;
    /** Animation speed in seconds. @default 4 */
    speed?: number;
    /** Blur radius in px. @default 40 */
    blur?: number;
    /** Animation effect. @default 'breathing' */
    effect?: AmbientEffect;
    /** Glow rendering style. @default 'diffused' */
    glowStyle?: GlowStyle;
    /** Enable bicolor dual-axis gradient. @default false */
    bicolor?: boolean;
  }

  let {
    enabled = false,
    mode = 'accent',
    color = 'var(--ca-brand)',
    secondaryColor = 'var(--ca-success)',
    intensity = 0.5,
    speed = 4,
    blur = 40,
    effect = 'breathing',
    glowStyle = 'diffused',
    bicolor = false,
    class: customClass = '',
  }: AmbientOverlayProps = $props();

  const isGradientMode = $derived(mode === 'rgb-cycle' || mode === 'aurora');

  // CSS custom properties for gradient keyframes (avoids hex literals)
  // glow colors used in template via direct prop binding

  // Effective bicolor state
  const effectiveBicolor = $derived(bicolor && mode === 'accent');

  // Box-shadow computation for diffused/neon styles
  const glowBoxShadow = $derived.by(() => {
    if (!enabled || isGradientMode || effectiveBicolor) return 'none';

    const blurPx = blur;
    const spread = Math.round(blurPx / 4);

    if (glowStyle === 'neon') {
      const tightBlur = Math.max(6, Math.round(blurPx * 0.4));
      return `-1px -1px 0px 1px ${color}, 0 0 ${tightBlur}px 1px ${color}, -2px -2px ${blurPx}px 2px ${color}`;
    }

    // diffused (default)
    return `0 0 ${blurPx}px ${spread}px ${color}, -3px -3px ${blurPx * 1.4}px ${spread}px ${color}`;
  });

  const animationDuration = $derived(`${speed}s`);
  const rgbCycleBg = $derived(`linear-gradient(135deg, ${color}, ${secondaryColor})`);

  // Chroma-beam conic gradient background
  const chromaBackground = $derived.by(() => {
    if (isGradientMode) {
      return 'conic-gradient(from 0deg, transparent 0deg, transparent 200deg, var(--ca-glow-from) 240deg, var(--ca-glow-to) 280deg, var(--ca-glow-mid) 320deg, var(--ca-glow-accent) 360deg)';
    }
    if (effectiveBicolor) {
      return `conic-gradient(from 0deg, transparent 0deg, transparent 200deg, ${secondaryColor}88 260deg, ${secondaryColor} 300deg, ${color} 360deg)`;
    }
    return `conic-gradient(from 0deg, transparent 0deg, transparent 240deg, ${color}88 300deg, ${color} 360deg)`;
  });

  // Bicolor radial gradient background
  const bicolorBackground = $derived(
    `radial-gradient(ellipse at 80% 20%, ${color} 0%, transparent 65%), radial-gradient(ellipse at 20% 80%, ${secondaryColor} 0%, transparent 65%), conic-gradient(from 180deg at 30% 30%, ${secondaryColor} 0deg, ${color} 180deg, ${secondaryColor} 360deg)`,
  );
</script>

{#if enabled}
  <div
    class="pointer-events-none absolute inset-0 z-0 overflow-visible transition-opacity duration-150 will-change-[filter,opacity] {customClass}"
    style:opacity={intensity}
    aria-hidden="true"
  >
    {#if glowStyle === 'chroma' && !isGradientMode}
      <!-- Chroma Border Beam: rotating conic laser sweep -->
      <div class="relative w-full h-full overflow-hidden p-[1.5px]">
        <div
          class="absolute -inset-full card-glow-spin"
          style:animation-duration={animationDuration}
          style:background={chromaBackground}
        ></div>
        <div class="w-full h-full bg-transparent"></div>
      </div>
    {:else if isGradientMode}
      <!-- Gradient Aura: animated RGB or Aurora wave -->
      <div
        class="w-full h-full will-change-[filter,transform] {mode === 'rgb-cycle' ? 'ambient-rgb-cycle' : 'ambient-aurora-wave'} {effect === 'breathing' ? 'ambient-breathe' : ''}"
        style:animation-duration={animationDuration}
        style:filter="blur({blur}px)"
        style:--ca-glow-from={color}
        style:--ca-glow-to={secondaryColor}
        style:background={mode === 'rgb-cycle' ? rgbCycleBg : undefined}
      ></div>
    {:else if effectiveBicolor}
      <!-- Bicolor Dual-Axis Gradient -->
      <div
        class="w-full h-full will-change-[filter,opacity] {effect === 'breathing' ? 'ambient-breathe' : ''} {effect === 'wave' ? 'ambient-pulse-slow' : ''}"
        style:background={bicolorBackground}
        style:filter="blur({blur}px)"
        style:animation-duration={animationDuration}
      ></div>
    {:else}
      <!-- Diffused / Neon: static single accent with optional breathing -->
      <div
        class="w-full h-full will-change-[filter,opacity] {effect === 'breathing' ? 'ambient-breathe' : ''} {effect === 'wave' ? 'ambient-pulse-slow' : ''}"
        style:box-shadow={glowBoxShadow}
        style:animation-duration={animationDuration}
      ></div>
    {/if}
  </div>
{/if}

<style>
  @keyframes ambient-breathe {
    0%,
    100% {
      opacity: 0.35;
      transform: scale(0.998);
    }
    50% {
      opacity: 1;
      transform: scale(1.002);
    }
  }

  @keyframes ambient-pulse-slow {
    0%,
    100% {
      opacity: 0.5;
    }
    50% {
      opacity: 0.95;
    }
  }

  @keyframes ambient-rgb-cycle {
    0% {
      filter: hue-rotate(0deg);
    }
    100% {
      filter: hue-rotate(360deg);
    }
  }

  @keyframes ambient-aurora-wave {
    0%,
    100% {
      background: radial-gradient(
        circle at 10% 20%,
        var(--ca-glow-from, var(--ca-brand)),
        var(--ca-glow-to, var(--ca-success)) 50%,
        var(--ca-glow-from, var(--ca-brand)) 90%
      );
      transform: scale(1);
    }
    50% {
      background: radial-gradient(
        circle at 80% 80%,
        var(--ca-glow-to, var(--ca-success)),
        var(--ca-glow-from, var(--ca-brand)) 50%,
        var(--ca-glow-to, var(--ca-success)) 90%
      );
      transform: scale(1.01);
    }
  }

  @keyframes card-glow-spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .card-glow-spin {
    animation: card-glow-spin var(--duration, 4s) linear infinite;
  }

  .ambient-breathe {
    animation: ambient-breathe var(--duration, 4s) ease-in-out infinite;
  }

  .ambient-pulse-slow {
    animation: ambient-pulse-slow var(--duration, 4s) ease-in-out infinite;
  }

  .ambient-rgb-cycle {
    animation: ambient-rgb-cycle var(--duration, 6s) linear infinite;
  }

  .ambient-aurora-wave {
    animation: ambient-aurora-wave var(--duration, 8s) ease-in-out infinite;
  }
</style>
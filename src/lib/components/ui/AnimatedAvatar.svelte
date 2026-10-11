<script lang="ts">
  import type { Snippet } from 'svelte';
  import {
    User, Users, Cat, Mountain, Trees, Rocket, Code, Terminal, Zap, Home,
    Crown, Diamond, Shield, Cpu, Brain, Orbit, Flame, Star, Heart, Sparkles,
    Box, Compass, Feather, Key, Atom, Ghost, Globe, Eye, Target,
    Mail, Bell, Settings, Search, Camera, Music
  } from 'lucide-svelte';
  import type { ComponentVariant, ComponentSize, BaseComponentProps } from './types';

  export type AnimatedAvatarVariant = Extract<ComponentVariant, 'primary' | 'brand'>;
  export type AnimatedAvatarSize = Extract<ComponentSize, 'xs' | 'sm' | 'md' | 'lg' | 'xl'>;
  export type AnimatedAvatarHalo = 'none' | 'comet-beam' | 'dual-photons' | 'chroma-ring';

  type LucideIcon = typeof User;

  export interface AnimatedAvatarProps extends BaseComponentProps {
    /** Image URL. When set, renders an `<img>` with `alt`. @default '' */
    src?: string;
    /** Alt text for the image / accessible name. @default 'Avatar' */
    alt?: string;
    /** Fallback initials shown when no image is provided. @default '' */
    fallback?: string;
    /** Size in px, or a shared size token (xs=24 sm=32 md=40 lg=56 xl=80). @default 40 */
    size?: number | AnimatedAvatarSize;
    /** Visual variant (superset of Avatar). @default 'primary' */
    variant?: AnimatedAvatarVariant;
    /** Animated halo effect. @default 'none' */
    halo?: AnimatedAvatarHalo;
    /** Halo accent color (any CSS color). @default 'var(--ca-brand)' */
    haloColor?: string;
    /** Halo animation duration in seconds. @default 4 */
    haloSpeed?: number;
    /** Halo opacity, 0-1. @default 0.65 */
    haloIntensity?: number;
    /** Gradient start color of the fallback background. @default 'var(--ca-brand)' */
    gradientFrom?: string;
    /** Gradient end color of the fallback background. @default 'var(--ca-info)' */
    gradientTo?: string;
    /** lucide icon name (kebab-case) for the fallback display. @default '' */
    icon?: string;
    /** Custom fallback content (superset of Avatar). */
    children?: Snippet;
  }

  let {
    src = '',
    alt = 'Avatar',
    fallback = '',
    size = 40,
    variant = 'primary',
    halo = 'none',
    haloColor = 'var(--ca-brand)',
    haloSpeed = 4,
    haloIntensity = 0.65,
    gradientFrom = 'var(--ca-brand)',
    gradientTo = 'var(--ca-info)',
    icon = '',
    class: customClass = '',
    children,
  }: AnimatedAvatarProps = $props();

  let imgFailed = $state(false);

  /** Shared size tokens resolved to px (matches Avatar.svelte sizing). */
  const SIZE_PX: Record<AnimatedAvatarSize, number> = {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 56,
    xl: 80,
  };

  const pxSize = $derived(typeof size === 'number' ? size : SIZE_PX[size]);
  const stroke = $derived(Math.max(2, Math.round(pxSize * 0.08)));
  const iconSize = $derived(Math.round(pxSize * 0.6));
  const fallbackFontSize = $derived(Math.round(pxSize * 0.4));
  const intensity = $derived(Math.min(1, Math.max(0, haloIntensity)));

  const IconComponent: LucideIcon = $derived(resolveIcon(icon));

  const variantClasses: Record<AnimatedAvatarVariant, string> = {
    primary: '',
    brand: 'ring-2 ring-[var(--ca-brand)] shadow-[0_0_12px_var(--ca-brand)]',
  };

  function resolveIcon(name: string): LucideIcon {
    return ICON_MAP[name] ?? User;
  }

  /** lucide icon names (kebab-case) accepted by the `icon` prop. */
  const ICON_MAP: Record<string, LucideIcon> = {
    'user': User,
    'users': Users,
    'family': Users,
    'cat': Cat,
    'mountain': Mountain,
    'tree': Trees,
    'trees': Trees,
    'rocket': Rocket,
    'code': Code,
    'terminal': Terminal,
    'zap': Zap,
    'bolt': Zap,
    'home': Home,
    'crown': Crown,
    'diamond': Diamond,
    'shield': Shield,
    'cpu': Cpu,
    'brain': Brain,
    'orbit': Orbit,
    'flame': Flame,
    'fire': Flame,
    'star': Star,
    'heart': Heart,
    'sparkles': Sparkles,
    'box': Box,
    'cube': Box,
    'compass': Compass,
    'feather': Feather,
    'key': Key,
    'atom': Atom,
    'ghost': Ghost,
    'globe': Globe,
    'eye': Eye,
    'target': Target,
    'mail': Mail,
    'bell': Bell,
    'settings': Settings,
    'search': Search,
    'camera': Camera,
    'music': Music,
  };
</script>

<span
  class="relative inline-flex items-center justify-center shrink-0 {customClass}"
  style="width: {pxSize}px; height: {pxSize}px; --halo-speed: {haloSpeed}s; --halo-opacity: {intensity}; --halo-color: {haloColor};"
>
  {#if halo !== 'none'}
    {#if halo === 'comet-beam'}
      <!-- Effect 1: Conic Comet Beam (120 degree laser sweep with tail) -->
      <span class="avatar-halo-layer comet-beam-halo" aria-hidden="true">
        <span class="comet-sweep" style="--meteor-stroke: {stroke}px;"></span>
        <span class="comet-core-glow"></span>
      </span>
    {:else if halo === 'dual-photons'}
      <!-- Effect 2: Dual Photons (2 satellite dots chasing 180 degrees apart) -->
      <span class="avatar-halo-layer dual-photons-halo" aria-hidden="true">
        <span class="photon-ring" style="--meteor-stroke: {stroke}px;"></span>
        <span class="dual-core-pulse"></span>
      </span>
    {:else if halo === 'chroma-ring'}
      <!-- Effect 3: Reactive Chroma Ring (rotating conic gradient + blur) -->
      <span class="avatar-halo-layer chroma-ring-halo" aria-hidden="true">
        <span class="chroma-spin"></span>
        <span class="chroma-blur"></span>
      </span>
    {/if}
  {/if}

  <span
    class="relative z-10 inline-flex items-center justify-center rounded-full shrink-0 overflow-hidden select-none {variantClasses[variant]}"
    style="width: {pxSize}px; height: {pxSize}px; background: linear-gradient(135deg, {gradientFrom}, {gradientTo});"
  >
    {#if src && !imgFailed}
      <img
        {src}
        {alt}
        onerror={() => (imgFailed = true)}
        class="w-full h-full object-cover rounded-full"
      />
    {:else if icon}
      <span role="img" aria-label={fallback || alt}>
        <IconComponent size={iconSize} class="text-white" />
      </span>
    {:else if fallback}
      <span
        class="font-medium uppercase tracking-wider text-white"
        style="font-size: {fallbackFontSize}px;"
        aria-label={fallback || alt}
      >{fallback.slice(0, 2)}</span>
    {:else if children}
      {@render children()}
    {:else}
      <span role="img" aria-label={fallback || alt}>
        <User size={iconSize} class="text-white" />
      </span>
    {/if}
  </span>
</span>

<style>
  .avatar-halo-layer {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 1;
    will-change: transform;
    transform: translateZ(0);
  }

  /* 1. Conic Comet Beam (120 deg laser sweep) */
  .comet-beam-halo .comet-sweep {
    position: absolute;
    inset: -14%;
    border-radius: 9999px;
    background: conic-gradient(
      from 0deg,
      transparent 0deg,
      transparent 240deg,
      color-mix(in srgb, var(--halo-color) 20%, transparent) 280deg,
      var(--halo-color) 350deg,
      color-mix(in srgb, var(--halo-color) 60%, white) 360deg
    );
    -webkit-mask: radial-gradient(
      closest-side,
      transparent calc(100% - var(--meteor-stroke, 3px) - 1px),
      black calc(100% - var(--meteor-stroke, 3px)),
      black 100%,
      transparent 100%
    );
    mask: radial-gradient(
      closest-side,
      transparent calc(100% - var(--meteor-stroke, 3px) - 1px),
      black calc(100% - var(--meteor-stroke, 3px)),
      black 100%,
      transparent 100%
    );
    animation: halo-spin var(--halo-speed, 4s) linear infinite;
    opacity: var(--halo-opacity, 0.65);
    filter: drop-shadow(0 0 6px var(--halo-color));
  }
  .comet-beam-halo .comet-core-glow {
    position: absolute;
    inset: -4px;
    border-radius: 9999px;
    border: 1px solid color-mix(in srgb, var(--halo-color) 40%, transparent);
    box-shadow: 0 0 10px color-mix(in srgb, var(--halo-color) 50%, transparent);
    opacity: calc(var(--halo-opacity, 0.65) * 0.7);
    animation: halo-pulse 2.2s ease-in-out infinite alternate;
  }

  /* 2. Dual Photons (2 satellites 180 deg apart) */
  .dual-photons-halo .photon-ring {
    position: absolute;
    inset: -14%;
    border-radius: 9999px;
    background: conic-gradient(
      from 0deg,
      transparent 0deg,
      transparent 120deg,
      color-mix(in srgb, var(--halo-color) 30%, transparent) 150deg,
      var(--halo-color) 178deg,
      color-mix(in srgb, var(--halo-color) 55%, white) 180deg,
      transparent 181deg,
      transparent 300deg,
      color-mix(in srgb, var(--halo-color) 30%, transparent) 330deg,
      var(--halo-color) 358deg,
      color-mix(in srgb, var(--halo-color) 55%, white) 360deg
    );
    -webkit-mask: radial-gradient(
      closest-side,
      transparent calc(100% - var(--meteor-stroke, 3px) - 1px),
      black calc(100% - var(--meteor-stroke, 3px)),
      black 100%,
      transparent 100%
    );
    mask: radial-gradient(
      closest-side,
      transparent calc(100% - var(--meteor-stroke, 3px) - 1px),
      black calc(100% - var(--meteor-stroke, 3px)),
      black 100%,
      transparent 100%
    );
    animation: halo-spin calc(var(--halo-speed, 4s) * 0.8) linear infinite;
    opacity: var(--halo-opacity, 0.65);
    filter: drop-shadow(0 0 7px var(--halo-color));
  }
  .dual-photons-halo .dual-core-pulse {
    position: absolute;
    inset: -3px;
    border-radius: 9999px;
    border: 1.5px solid color-mix(in srgb, var(--halo-color) 40%, transparent);
    box-shadow:
      0 0 8px color-mix(in srgb, var(--halo-color) 60%, transparent),
      inset 0 0 6px color-mix(in srgb, var(--halo-color) 50%, transparent);
    opacity: calc(var(--halo-opacity, 0.65) * 0.75);
    animation: halo-pulse 1.8s ease-in-out infinite alternate;
  }

  /* 3. Reactive Chroma Ring (rotating conic gradient + blurred aura) */
  .chroma-ring-halo .chroma-spin {
    position: absolute;
    inset: -3px;
    border-radius: 9999px;
    background: conic-gradient(
      from 0deg,
      transparent 0deg,
      color-mix(in srgb, var(--halo-color) 25%, transparent) 90deg,
      var(--halo-color) 180deg,
      color-mix(in srgb, var(--halo-color) 25%, transparent) 270deg,
      transparent 360deg
    );
    animation: halo-spin var(--halo-speed, 4s) linear infinite;
    opacity: var(--halo-opacity, 0.65);
  }
  .chroma-ring-halo .chroma-blur {
    position: absolute;
    inset: -4px;
    border-radius: 9999px;
    background: radial-gradient(circle, var(--halo-color) 0%, transparent 70%);
    filter: blur(4px);
    opacity: calc(var(--halo-opacity, 0.65) * 0.8);
    animation: halo-pulse 2.5s ease-in-out infinite alternate;
  }

  @keyframes halo-spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes halo-pulse {
    0% { transform: scale(0.97); opacity: calc(var(--halo-opacity, 0.65) * 0.5); }
    100% { transform: scale(1.05); opacity: var(--halo-opacity, 0.65); }
  }

  @media (prefers-reduced-motion: reduce) {
    .comet-sweep,
    .comet-core-glow,
    .photon-ring,
    .dual-core-pulse,
    .chroma-spin,
    .chroma-blur {
      animation: none;
    }
  }
</style>

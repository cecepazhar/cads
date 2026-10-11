<script lang="ts">
  import type { ComponentSize } from './types';

  type AmbientGlowSize = Extract<ComponentSize, 'sm' | 'md' | 'lg' | 'xl'>;

  interface Props {
    color?: string;
    intensity?: number;
    size?: AmbientGlowSize;
    class?: string;
  }

  let {
    color = 'var(--ca-brand)',
    intensity = 0.25,
    size = 'lg',
    class: customClass = '',
  }: Props = $props();

  const sizeMap: Record<AmbientGlowSize, string> = {
    sm: 'w-40 h-40',
    md: 'w-64 h-64',
    lg: 'w-96 h-96',
    xl: 'w-[32rem] h-[32rem]',
  };

  const blurMap: Record<AmbientGlowSize, string> = {
    sm: 'blur-2xl',
    md: 'blur-3xl',
    lg: 'blur-[100px]',
    xl: 'blur-[128px]',
  };

  const glowStyle = $derived(
    `background: radial-gradient(circle, ${color} ${Math.round(intensity * 100)}%, transparent 70%); opacity: ${intensity};`
  );
</script>

<div
  aria-hidden="true"
  class="pointer-events-none absolute inset-0 flex items-center justify-center {sizeMap[size]} {blurMap[size]} {customClass}"
  style={glowStyle}
></div>

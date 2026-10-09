<script lang="ts">
  import type { Snippet } from 'svelte';

  export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  interface Props {
    src?: string;
    alt?: string;
    fallback?: string;
    size?: AvatarSize;
    halo?: 'none' | 'pro' | 'brand';
    class?: string;
    children?: Snippet;
  }

  let {
    src = '',
    alt = 'Avatar',
    fallback = '',
    size = 'md',
    halo = 'none',
    class: customClass = '',
    children,
  }: Props = $props();

  let imgFailed = $state(false);

  const sizeClasses: Record<AvatarSize, string> = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base font-semibold',
    xl: 'w-20 h-20 text-xl font-bold',
  };

  const haloClasses: Record<string, string> = {
    none: '',
    pro: 'ring-2 ring-violet-500/80 shadow-[0_0_12px_rgba(139,92,246,0.6)] animate-pulse',
    brand: 'ring-2 ring-[var(--ca-brand)] shadow-[0_0_12px_var(--ca-brand)]',
  };
</script>

<div
  class="relative inline-flex shrink-0 items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 select-none overflow-hidden transition-all {sizeClasses[size]} {haloClasses[halo]} {customClass}"
>
  {#if src && !imgFailed}
    <img
      {src}
      {alt}
      onerror={() => (imgFailed = true)}
      class="w-full h-full object-cover rounded-full"
    />
  {:else if fallback}
    <span class="font-medium uppercase tracking-wider">{fallback.slice(0, 2)}</span>
  {:else if children}
    {@render children()}
  {:else}
    <svg class="w-1/2 h-1/2 text-neutral-400" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
    </svg>
  {/if}
</div>

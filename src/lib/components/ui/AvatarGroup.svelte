<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ComponentVariant, ComponentSize } from './types';

  type AvatarGroupVariant = Extract<ComponentVariant, 'primary' | 'brand'>;
  type AvatarGroupSize = Extract<ComponentSize, 'xs' | 'sm' | 'md' | 'lg' | 'xl'>;

  interface Props {
    max?: number;
    count?: number;
    spacing?: 'tight' | 'normal' | 'loose';
    variant?: AvatarGroupVariant;
    size?: AvatarGroupSize;
    ariaLabel?: string;
    class?: string;
    children?: Snippet;
  }

  let {
    max,
    count,
    spacing = 'tight',
    variant = 'primary',
    size = 'md',
    ariaLabel,
    class: customClass = '',
    children,
  }: Props = $props();

  let containerEl: HTMLDivElement | undefined = $state();
  let domCount = $state(0);

  const spacingClasses: Record<string, string> = {
    tight: '-space-x-3',
    normal: '-space-x-2',
    loose: '-space-x-1',
  };

  const overflowSizeClasses: Record<AvatarGroupSize, string> = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base',
    xl: 'w-20 h-20 text-xl',
  };

  const variantClasses: Record<AvatarGroupVariant, string> = {
    primary: 'bg-neutral-700 dark:bg-neutral-600 text-white border-neutral-800 dark:border-neutral-900',
    brand: 'bg-[var(--ca-brand)]/20 text-[var(--ca-brand)] border-[var(--ca-brand)]/30',
  };

  $effect(() => {
    if (!containerEl) return;
    const children = Array.from(containerEl.children).filter(
      (el) => !el.hasAttribute('data-overflow')
    );
    domCount = children.length;
    if (max !== undefined) {
      children.forEach((el, i) => {
        (el as HTMLElement).style.display = i >= max ? 'none' : '';
      });
    }
  });

  let totalCount = $derived(count ?? domCount);
  let overflowCount = $derived(max !== undefined ? Math.max(0, totalCount - max) : 0);
</script>

<div
  role="group"
  aria-label={ariaLabel ?? `${totalCount} avatar${totalCount === 1 ? '' : 's'}`}
  class="inline-flex items-center {spacingClasses[spacing]} {customClass}"
>
  <div bind:this={containerEl} class="contents">
    {@render children?.()}
  </div>
  {#if overflowCount > 0}
    <div
      data-overflow
      class="relative z-10 inline-flex items-center justify-center rounded-full border-2 {overflowSizeClasses[size]} {variantClasses[variant]}"
      aria-label="{overflowCount} more avatars"
    >
      +{overflowCount}
    </div>
  {/if}
</div>
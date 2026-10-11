<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ComponentVariant, ComponentSize } from './types';
  import { uid } from '../../utils/a11y';

  export type CardVariant = Extract<ComponentVariant, 'primary' | 'secondary' | 'outline' | 'ghost'>;
  export type CardSize = Extract<ComponentSize, 'sm' | 'md' | 'lg'>;

  interface Props {
    variant?: CardVariant;
    size?: CardSize;
    /** Heading level (1–6). Default: 3. */
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    title?: string;
    description?: string;
    class?: string;
    headerAction?: Snippet;
    children?: Snippet;
  }

  let {
    variant = 'primary',
    size = 'md',
    level = 3,
    title,
    description,
    class: customClass = '',
    headerAction,
    children,
  }: Props = $props();

  const headingId = uid('card-heading');

  const variantClasses: Record<CardVariant, string> = {
    primary:
      'bg-[var(--ca-surface)] border border-[var(--ca-border)]',
    secondary:
      'bg-[var(--ca-surface-subtle)] border border-[var(--ca-border)]',
    outline:
      'bg-transparent border border-[var(--ca-border)]',
    ghost:
      'bg-transparent',
  };

  const sizeClasses: Record<CardSize, string> = {
    sm: 'p-3 rounded-lg',
    md: 'p-5 rounded-xl',
    lg: 'p-7 rounded-2xl',
  };
</script>

<div
  role={title ? 'region' : undefined}
  aria-labelledby={title ? headingId : undefined}
  class="transition-colors {variantClasses[variant]} {sizeClasses[size]} {customClass}"
>
  {#if title || headerAction}
    <div class="flex items-start justify-between gap-4 mb-4 pb-3 border-b border-[var(--ca-border)]">
      <div>
        {#if title}
          <svelte:element this={"h" + level} id={headingId} class="font-bold text-[var(--ca-text-primary)] text-xs sm:text-sm tracking-tight">{title}</svelte:element>
        {/if}
        {#if description}
          <p class="text-[11px] text-[var(--ca-text-muted)] mt-0.5 leading-relaxed">{description}</p>
        {/if}
      </div>
      {#if headerAction}
        <div class="shrink-0 flex items-center gap-2">
          {@render headerAction()}
        </div>
      {/if}
    </div>
  {/if}

  {@render children?.()}
</div>
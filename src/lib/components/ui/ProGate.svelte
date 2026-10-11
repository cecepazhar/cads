<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ComponentVariant } from './types';
  import { Lock } from 'lucide-svelte';

  type ProGateVariant = Extract<ComponentVariant, 'primary' | 'secondary' | 'danger' | 'ghost'>;

  interface Props {
    children?: Snippet;
    featureName?: string;
    variant?: ProGateVariant;
    /** Set true to show the upgrade prompt instead of children. */
    locked?: boolean;
    onUpgrade?: () => void;
    class?: string;
  }

  let {
    children,
    featureName = 'This',
    variant: _variant = 'primary',
    locked = false,
    onUpgrade,
    class: customClass = '',
  }: Props = $props();

  const buttonCls: Record<ProGateVariant, string> = {
    primary: 'bg-[var(--ca-brand)] text-white hover:opacity-90',
    secondary: 'bg-[var(--ca-surface-subtle)] border border-[var(--ca-border)] text-[var(--ca-text-primary)] hover:opacity-80',
    danger: 'bg-rose-500 text-white hover:bg-rose-600',
    ghost: 'bg-transparent text-[var(--ca-text-secondary)] hover:bg-[var(--ca-surface-subtle)]',
  };
</script>

{#if !locked}
  {@render children?.()}
{:else}
  <div
    role="region"
    aria-label="{featureName} requires Pro"
    class="rounded-xl border border-dashed border-[var(--ca-border)] bg-[var(--ca-surface-subtle)] p-6 text-center {customClass}"
  >
    <div class="flex flex-col items-center gap-2 text-[var(--ca-text-muted)]">
      <Lock class="w-5 h-5" aria-hidden="true" />
      <p class="text-sm font-medium">
        {featureName} is a <span class="font-semibold text-[var(--ca-brand)]">Pro</span> feature.
      </p>
      <button
        type="button"
        onclick={onUpgrade}
        class="mt-2 inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-opacity duration-[var(--ca-motion-duration-fast)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)] {buttonCls[_variant]}"
      >
        Upgrade now
      </button>
    </div>
  </div>
{/if}

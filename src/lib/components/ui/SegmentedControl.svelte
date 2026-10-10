<script lang="ts">
  import type { ComponentVariant, ComponentSize } from '../ui/types';

  type SegmentedVariant = Extract<ComponentVariant, 'primary' | 'outline' | 'ghost'>;
  type SegmentedSize = Extract<ComponentSize, 'sm' | 'md' | 'lg'>;

  interface SegmentOption {
    value: string;
    label: string;
    icon?: string;
    disabled?: boolean;
  }

  interface Props {
    options: SegmentOption[];
    value?: string;
    variant?: SegmentedVariant;
    size?: SegmentedSize;
    class?: string;
  }

  let {
    options = [],
    value = $bindable(options[0]?.value || ''),
    variant = 'primary',
    size = 'md',
    class: customClass = '',
  }: Props = $props();

  const sizeClasses: Record<SegmentedSize, string> = {
    sm: 'p-0.5 text-[11px]',
    md: 'p-1 text-xs',
    lg: 'p-1.5 text-sm',
  };

  const variantClasses: Record<SegmentedVariant, string> = {
    primary: 'bg-[var(--ca-surface-subtle)] border-[var(--ca-border)]',
    outline: 'bg-transparent border-[var(--ca-border)]',
    ghost: 'bg-transparent border-transparent',
  };

  function handleKeydown(e: KeyboardEvent, index: number) {
    const enabled = options.filter((o) => !o.disabled);
    const currentEnabledIndex = enabled.findIndex((o) => o.value === options[index].value);
    let nextIndex = -1;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = (currentEnabledIndex + 1) % enabled.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = (currentEnabledIndex - 1 + enabled.length) % enabled.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIndex = enabled.length - 1;
    }

    if (nextIndex >= 0) {
      const nextOpt = enabled[nextIndex];
      value = nextOpt.value;
      const nextBtn = document.getElementById(`segment-${nextOpt.value}`);
      nextBtn?.focus();
    }
  }
</script>

<div
  role="radiogroup"
  class="inline-flex items-center rounded-lg border {variantClasses[variant]} {sizeClasses[size]} {customClass}"
>
  {#each options as opt, i}
    <button
      id="segment-{opt.value}"
      type="button"
      role="radio"
      aria-checked={value === opt.value}
      disabled={opt.disabled}
      tabindex={value === opt.value ? 0 : -1}
      onclick={() => (value = opt.value)}
      onkeydown={(e) => handleKeydown(e, i)}
      class="px-3 py-1 rounded-md font-medium transition-all select-none cursor-pointer disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)] {value === opt.value ? 'bg-[var(--ca-surface-subtle)] text-[var(--ca-text-primary)] shadow-sm font-semibold' : 'text-[var(--ca-text-muted)] hover:text-[var(--ca-text-secondary)]'}"
    >
      {opt.label}
    </button>
  {/each}
</div>
<script lang="ts">
  import type { ComponentVariant, ComponentSize } from './types';
  import { uid } from '../../utils/a11y';
  import { Plus, Minus } from 'lucide-svelte';

  export type NumberInputVariant = Extract<ComponentVariant, 'primary' | 'outline' | 'ghost'>;
  export type NumberInputSize = Extract<ComponentSize, 'sm' | 'md' | 'lg'>;

  interface Props {
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    readonly?: boolean;
    placeholder?: string;
    label?: string;
    error?: string;
    id?: string;
    variant?: NumberInputVariant;
    size?: NumberInputSize;
    class?: string;
    onchange?: (val: number) => void;
  }

  let {
    value = $bindable(0),
    min,
    max,
    step = 1,
    disabled = false,
    readonly = false,
    placeholder = '',
    label = '',
    error = '',
    id,
    variant = 'primary',
    size = 'md',
    class: customClass = '',
    onchange,
  }: Props = $props();

  const inputId = $derived(id ?? uid('number-input'));
  const errorId = $derived(`${inputId}-error`);

  const clampedValue = $derived(() => {
    let v = value;
    if (min !== undefined) v = Math.max(min, v);
    if (max !== undefined) v = Math.min(max, v);
    return v;
  });

  const isAtMin = $derived(min !== undefined && value <= min);
  const isAtMax = $derived(max !== undefined && value >= max);

  function increment() {
    if (disabled || readonly || isAtMax) return;
    const next = value + step;
    value = max !== undefined ? Math.min(max, next) : next;
    onchange?.(value);
  }

  function decrement() {
    if (disabled || readonly || isAtMin) return;
    const next = value - step;
    value = min !== undefined ? Math.max(min, next) : next;
    onchange?.(value);
  }

  function handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    const raw = input.valueAsNumber;
    if (Number.isNaN(raw)) return;
    let v = raw;
    if (min !== undefined) v = Math.max(min, v);
    if (max !== undefined) v = Math.min(max, v);
    value = v;
    onchange?.(value);
  }

  const variantClasses: Record<NumberInputVariant, string> = {
    primary:
      'bg-[var(--ca-surface)] border-[var(--ca-border)] text-[var(--ca-text-primary)]',
    outline:
      'bg-transparent border-[var(--ca-border)] text-[var(--ca-text-primary)]',
    ghost:
      'bg-transparent border-transparent text-[var(--ca-text-primary)] hover:border-[var(--ca-border)]',
  };

  const sizeClasses: Record<NumberInputSize, { input: string; button: string; icon: string }> = {
    sm: { input: 'text-xs px-2', button: 'h-6 w-6', icon: 'h-3 w-3' },
    md: { input: 'text-xs px-3', button: 'h-8 w-8', icon: 'h-3.5 w-3.5' },
    lg: { input: 'text-sm px-3', button: 'h-9 w-9', icon: 'h-4 w-4' },
  };
</script>

<div class="flex flex-col gap-1.5 w-full {customClass}">
  {#if label}
    <label for={inputId} class="text-xs font-medium text-[var(--ca-text-secondary)]">{label}</label>
  {/if}

  <div
    class="flex items-center rounded-lg border transition-colors
      {variantClasses[variant]}
      {error ? 'border-rose-500' : ''}
      {disabled ? 'opacity-50 cursor-not-allowed' : ''}"
  >
    <button
      type="button"
      aria-label="Decrease"
      {disabled}
      onclick={decrement}
      class="flex items-center justify-center shrink-0 {sizeClasses[size].button}
        text-[var(--ca-text-muted)] hover:text-[var(--ca-text-primary)]
        disabled:opacity-40 disabled:cursor-not-allowed
        transition-colors
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-inset"
    >
      <Minus class={sizeClasses[size].icon} />
    </button>

    <input
      type="number"
      id={inputId}
      {placeholder}
      {disabled}
      {readonly}
      {min}
      {max}
      {step}
      {value}
      role="spinbutton"
      aria-valuenow={value}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-invalid={!!error || undefined}
      aria-describedby={error ? errorId : undefined}
      oninput={handleInput}
      class="w-full min-w-0 text-center bg-transparent border-x border-[var(--ca-border)] {sizeClasses[size].input}
        focus-visible:outline-none
        disabled:cursor-not-allowed
        [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none
        text-[var(--ca-text-primary)] placeholder-[var(--ca-text-muted)]"
    />

    <button
      type="button"
      aria-label="Increase"
      {disabled}
      onclick={increment}
      class="flex items-center justify-center shrink-0 {sizeClasses[size].button}
        text-[var(--ca-text-muted)] hover:text-[var(--ca-text-primary)]
        disabled:opacity-40 disabled:cursor-not-allowed
        transition-colors
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-inset"
    >
      <Plus class={sizeClasses[size].icon} />
    </button>
  </div>

  {#if error}
    <span id={errorId} class="text-[11px] text-rose-400">{error}</span>
  {/if}
</div>
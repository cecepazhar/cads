<script lang="ts">
  import type { ComponentVariant, ComponentSize } from './types';

  type SliderVariant = Extract<ComponentVariant, 'primary' | 'brand'>;
  type SliderSize = Extract<ComponentSize, 'sm' | 'md' | 'lg'>;

  interface Props {
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    variant?: SliderVariant;
    size?: SliderSize;
    label?: string;
    ariaLabel?: string;
    ariaValueText?: string;
    class?: string;
    onchange?: (val: number) => void;
  }

  let {
    value = $bindable(0),
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    variant: _variant = 'primary',
    size = 'md',
    label,
    ariaLabel,
    ariaValueText,
    class: customClass = '',
    onchange,
  }: Props = $props();

  function handleInput(e: Event) {
    const val = Number((e.target as HTMLInputElement).value);
    value = val;
    onchange?.(val);
  }

  const sizeClasses: Record<SliderSize, string> = {
    sm: 'h-1',
    md: 'h-1.5',
    lg: 'h-2',
  };
</script>

<div class="relative w-full flex items-center {customClass}">
  {#if label}
    <label class="text-xs text-[var(--ca-text-secondary)] mr-2">{label}</label>
  {/if}
  <input
    type="range"
    {min}
    {max}
    {step}
    {disabled}
    value={value}
    aria-label={ariaLabel || label || 'Slider'}
    aria-valuetext={ariaValueText}
    oninput={handleInput}
    class="w-full {sizeClasses[size]} bg-[var(--ca-surface-subtle)] rounded-lg appearance-none cursor-pointer accent-[var(--ca-brand)] disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)]"
  />
</div>
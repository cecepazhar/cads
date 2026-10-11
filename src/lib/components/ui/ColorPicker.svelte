<script lang="ts">
  import type { ComponentVariant, ComponentSize } from './types';
  import { DEFAULT_COLOR_PRESETS } from '../../tokens/palettes';
  import type { ColorPreset } from '../../tokens/palettes';

  type ColorPickerVariant = Extract<ComponentVariant, 'primary' | 'outline'>;
  type ColorPickerSize = Extract<ComponentSize, 'sm' | 'md' | 'lg'>;

  interface Props {
    value?: string;
    label?: string;
    presets?: ColorPreset[];
    variant?: ColorPickerVariant;
    size?: ColorPickerSize;
    class?: string;
  }

  let {
    value = $bindable(DEFAULT_COLOR_PRESETS[2].hex),
    label = '',
    presets = DEFAULT_COLOR_PRESETS,
    variant = 'primary',
    size = 'md',
    class: customClass = '',
  }: Props = $props();

  const variantBorderClasses: Record<ColorPickerVariant, string> = {
    primary: 'border-[var(--ca-border)]',
    outline: 'border-[var(--ca-border)]',
  };

  const sizeClasses: Record<ColorPickerSize, string> = {
    sm: 'gap-1.5',
    md: 'gap-2',
    lg: 'gap-3',
  };

  const swatchSizeClasses: Record<ColorPickerSize, string> = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };
</script>

<div class="flex flex-col text-left {sizeClasses[size]} {customClass}">
  {#if label}
    <label class="text-xs font-medium text-[var(--ca-text-secondary)]">{label}</label>
  {/if}
  <div class="flex items-center gap-3">
    <div class="relative">
      <input
        type="color"
        bind:value
        class="h-8 w-8 rounded cursor-pointer border {variantBorderClasses[variant]} bg-[var(--ca-surface-elevated)] p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)]"
      />
    </div>
    <span class="font-mono text-xs text-[var(--ca-text-secondary)] bg-[var(--ca-surface-elevated)] border border-[var(--ca-border)] px-2 py-1 rounded">{value}</span>
  </div>
  <div class="flex items-center gap-1.5 pt-1">
    {#each presets as preset (preset.hex)}
      <button
        type="button"
        onclick={() => (value = preset.hex)}
        class="{swatchSizeClasses[size]} rounded-full border border-white/20 transition-transform hover:scale-110 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)] {value === preset.hex ? 'ring-2 ring-white ring-offset-2 ring-offset-[var(--ca-surface-elevated)]' : ''}"
        style="background-color: {preset.hex};"
        aria-label="Preset color {preset.name}"
      ></button>
    {/each}
  </div>
</div>
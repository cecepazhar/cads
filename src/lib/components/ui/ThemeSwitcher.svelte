<script lang="ts">
  import Icon from './Icon.svelte';
  import type { ComponentVariant, ComponentSize } from './types';
  import { ACCENT_SWATCHES } from '../../tokens/palettes';
  import type { AccentSwatch } from '../../tokens/palettes';

  type ThemeSwitcherVariant = Extract<ComponentVariant, 'primary' | 'ghost' | 'outline'>;
  type ThemeSwitcherSize = Extract<ComponentSize, 'sm' | 'md'>;

  interface Props {
    showAccentPicker?: boolean;
    variant?: ThemeSwitcherVariant;
    size?: ThemeSwitcherSize;
    class?: string;
  }

  let {
    showAccentPicker = true,
    variant = 'primary',
    size = 'md',
    class: customClass = '',
  }: Props = $props();

  const brandAccents: AccentSwatch[] = ACCENT_SWATCHES;

  let isDark = $state(true);
  let selectedAccent = $state(ACCENT_SWATCHES[1].hex);

  const borderClasses: Record<ThemeSwitcherVariant, string> = {
    primary: 'border-[var(--ca-border)]',
    ghost: 'border-transparent',
    outline: 'border-[var(--ca-border)]',
  };

  function toggleTheme(dark: boolean) {
    isDark = dark;
    if (typeof document !== 'undefined') {
      if (dark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }
  }

  function setBrandAccent(hex: string) {
    selectedAccent = hex;
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--ca-brand', hex);
      localStorage.setItem('ca-brand', hex);
    }
  }
</script>

<div class="flex items-center gap-3 font-sans text-xs select-none {customClass}">
  <!-- Dark / Light Toggle -->
  <div
    class="inline-flex items-center p-0.5 rounded-lg border {borderClasses[variant]} bg-[var(--ca-surface-elevated)]"
    role="radiogroup"
    aria-label="Theme mode"
  >
    <button
      type="button"
      onclick={() => toggleTheme(false)}
      class="p-1.5 rounded-md transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)] {!isDark ? 'bg-[var(--ca-surface)] text-amber-500 shadow-xs' : 'text-[var(--ca-text-muted)] hover:text-[var(--ca-text-primary)]'}"
      aria-label="Light Mode"
      aria-pressed={!isDark}
    >
      <Icon name="sun" size={14} />
    </button>
    <button
      type="button"
      onclick={() => toggleTheme(true)}
      class="p-1.5 rounded-md transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)] {isDark ? 'bg-[var(--ca-surface-subtle)] text-[var(--ca-text-primary)] shadow-xs' : 'text-[var(--ca-text-muted)] hover:text-[var(--ca-text-primary)]'}"
      aria-label="Dark Mode"
      aria-pressed={isDark}
    >
      <Icon name="moon" size={14} />
    </button>
  </div>

  <!-- Pro Brand Accent Swatches -->
  {#if showAccentPicker}
    <div
      class="flex items-center gap-1.5 pl-2 border-l border-[var(--ca-border)]"
      role="radiogroup"
      aria-label="Brand accent color"
    >
      {#each brandAccents as b (b.hex)}
        <button
          type="button"
          onclick={() => setBrandAccent(b.hex)}
          class="w-4 h-4 rounded-full border transition-all cursor-pointer relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)] {selectedAccent === b.hex ? 'ring-2 ring-white/60 scale-110 border-white' : 'border-black/40 opacity-70 hover:opacity-100'}"
          style="background-color: {b.hex};"
          aria-label={b.name}
          aria-pressed={selectedAccent === b.hex}
        >
          {#if selectedAccent === b.hex}
            <span class="absolute inset-0 flex items-center justify-center text-[8px] text-white font-bold leading-none">✓</span>
          {/if}
        </button>
      {/each}
    </div>
  {/if}
</div>
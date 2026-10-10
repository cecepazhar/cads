<script lang="ts">
  import { getLocale, setLocale } from '../../i18n.svelte';
  import type { Locale } from '../../i18n.svelte';
  import type { ComponentVariant, ComponentSize } from './types';

  type LanguageSwitcherVariant = Extract<ComponentVariant, 'primary' | 'ghost' | 'outline'>;
  type LanguageSwitcherSize = Extract<ComponentSize, 'sm' | 'md'>;

  interface LocaleOption {
    code: string;
    label: string;
  }

  interface Props {
    compact?: boolean;
    locales?: LocaleOption[];
    value?: string;
    onchange?: (locale: string) => void;
    variant?: LanguageSwitcherVariant;
    size?: LanguageSwitcherSize;
    class?: string;
  }

  let {
    compact = false,
    locales = [
      { code: 'en', label: 'EN' },
      { code: 'id', label: 'ID' }
    ],
    value,
    onchange,
    variant = 'primary',
    size = 'md',
    class: customClass = '',
  }: Props = $props();

  const internalLocale = $derived(getLocale());
  const current = $derived(value ?? internalLocale);

  const borderClasses: Record<LanguageSwitcherVariant, string> = {
    primary: 'border-[var(--ca-border)]',
    ghost: 'border-transparent',
    outline: 'border-[var(--ca-border)]',
  };

  const sizeClasses: Record<LanguageSwitcherSize, string> = {
    sm: 'text-[10px] px-2 py-1',
    md: 'text-xs px-2.5 py-1.5',
  };

  function selectLocale(code: string) {
    setLocale(code as Locale);
    onchange?.(code);
  }

  function toggle() {
    const idx = locales.findIndex((l) => l.code === current);
    const next = locales[(idx + 1) % locales.length];
    selectLocale(next.code);
  }
</script>

{#if compact}
  <div
    class="inline-flex items-center rounded-lg border {borderClasses[variant]} bg-[var(--ca-surface-elevated)] {customClass}"
    role="radiogroup"
    aria-label="Language"
  >
    {#each locales as locale}
      <button
        type="button"
        onclick={() => selectLocale(locale.code)}
        class="font-mono font-semibold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)] {sizeClasses[size]} {current === locale.code
          ? 'bg-[var(--ca-surface-subtle)] text-[var(--ca-text-primary)] shadow-xs'
          : 'text-[var(--ca-text-muted)] hover:text-[var(--ca-text-primary)]'}"
        role="radio"
        aria-checked={current === locale.code}
      >
        {locale.label}
      </button>
    {/each}
  </div>
{:else}
  <button
    onclick={toggle}
    class="flex items-center gap-1.5 rounded-lg border {borderClasses[variant]} bg-[var(--ca-surface-elevated)] hover:bg-[var(--ca-surface-subtle)] font-mono font-semibold text-[var(--ca-text-secondary)] hover:text-[var(--ca-text-primary)] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)] {sizeClasses[size]} {customClass}"
    title="Switch Language"
  >
    <span class="text-[var(--ca-text-primary)] font-bold">{current.toUpperCase()}</span>
  </button>
{/if}
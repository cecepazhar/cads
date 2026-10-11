<script lang="ts">
  import type { ComponentSize } from './types';

  type ProfileAvatarVariant = 'primary' | 'secondary' | 'ghost';
  type ProfileAvatarSize = Extract<ComponentSize, 'xs' | 'sm' | 'md' | 'lg' | 'xl'>;

  interface Props {
    variant?: ProfileAvatarVariant;
    size?: ProfileAvatarSize;
    name?: string;
    initials?: string;
    url?: string;
    class?: string;
  }

  let {
    variant = 'primary',
    size = 'md',
    name = '',
    initials,
    url = '',
    class: customClass = '',
  }: Props = $props();

  let imgFailed = $state(false);

  const derivedInitials = $derived(
    initials ??
      name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0]?.toUpperCase() ?? '')
        .join('')
  );

  const sizeCls: Record<ProfileAvatarSize, string> = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base',
    xl: 'w-20 h-20 text-xl',
  };

  const variantCls: Record<ProfileAvatarVariant, string> = {
    primary: 'bg-[var(--ca-brand)]/15 text-[var(--ca-brand)]',
    secondary: 'bg-[var(--ca-surface-subtle)] text-[var(--ca-text-secondary)]',
    ghost: 'bg-transparent border border-[var(--ca-border)] text-[var(--ca-text-secondary)]',
  };
</script>

<span
  role="img"
  aria-label={name || 'Profile avatar'}
  class="relative inline-flex shrink-0 items-center justify-center rounded-full overflow-hidden select-none font-semibold {sizeCls[size]} {variantCls[variant]} {customClass}"
>
  {#if url && !imgFailed}
    <img
      src={url}
      alt={name}
      onerror={() => (imgFailed = true)}
      class="w-full h-full object-cover"
    />
  {:else if derivedInitials}
    <span aria-hidden="true">{derivedInitials}</span>
  {:else}
    <svg class="w-1/2 h-1/2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  {/if}
</span>

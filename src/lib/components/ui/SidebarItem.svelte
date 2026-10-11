<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ComponentVariant, ComponentSize } from './types';

  type SidebarItemVariant = Extract<ComponentVariant, 'primary' | 'ghost' | 'outline'>;
  type SidebarItemSize = Extract<ComponentSize, 'sm' | 'md'>;

  interface Props {
    active?: boolean;
    label: string;
    icon?: Snippet;
    badge?: string | number;
    badgeVariant?: 'default' | 'brand' | 'success' | 'warning' | 'danger';
    statusDot?: 'online' | 'busy' | 'offline' | 'warning';
    collapsed?: boolean;
    href?: string;
    onclick?: (e: MouseEvent) => void;
    variant?: SidebarItemVariant;
    size?: SidebarItemSize;
    class?: string;
  }

  let {
    active = false,
    label,
    icon,
    badge,
    badgeVariant = 'default',
    statusDot,
    collapsed = false,
    href,
    onclick,
    variant = 'primary',
    size = 'md',
    class: customClass = '',
  }: Props = $props();

  const badgeStyles: Record<string, string> = {
    default: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-300 dark:border-neutral-700',
    brand: 'bg-[var(--ca-brand)]/15 text-[var(--ca-brand)] border border-[var(--ca-brand)]/30',
    success: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30',
    warning: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30',
    danger: 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30',
  };

  const statusDotStyles: Record<string, string> = {
    online: 'bg-emerald-500 ring-2 ring-emerald-500/20',
    busy: 'bg-rose-500 ring-2 ring-rose-500/20',
    offline: 'bg-neutral-500',
    warning: 'bg-amber-500 ring-2 ring-amber-500/20',
  };

  const activeVariantClasses: Record<SidebarItemVariant, string> = {
    primary: 'bg-neutral-100 dark:bg-[var(--ca-surface-subtle)] text-neutral-950 dark:text-white font-semibold',
    ghost: 'bg-neutral-100/50 dark:bg-[var(--ca-surface-subtle)]/50 text-neutral-950 dark:text-white font-semibold',
    outline: 'bg-neutral-100 dark:bg-[var(--ca-surface-subtle)] text-neutral-950 dark:text-white font-semibold border border-neutral-300 dark:border-[var(--ca-border)]',
  };

  const inactiveVariantClasses: Record<SidebarItemVariant, string> = {
    primary: 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-[var(--ca-surface-elevated)] hover:text-neutral-900 dark:hover:text-neutral-200',
    ghost: 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50/50 dark:hover:bg-[var(--ca-surface-elevated)]/50 hover:text-neutral-900 dark:hover:text-neutral-200',
    outline: 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-[var(--ca-surface-elevated)] hover:text-neutral-900 dark:hover:text-neutral-200',
  };

  const sizeClasses: Record<SidebarItemSize, string> = {
    sm: 'text-[11px] px-2.5 py-1.5',
    md: 'text-xs px-3 py-2',
  };
</script>

<svelte:element
  this={href ? 'a' : 'button'}
  {href}
  type={href ? undefined : 'button'}
  {onclick}
  title={collapsed ? label : undefined}
  aria-current={active && href ? 'page' : undefined}
  class="w-full flex items-center gap-3 rounded-lg font-medium transition-all group relative cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)] {active ? activeVariantClasses[variant] : inactiveVariantClasses[variant]} {collapsed ? 'justify-center px-0 py-2.5' : sizeClasses[size]} {customClass}"
>
  {#if active}
    <span class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4.5 bg-[var(--ca-brand)] rounded-r"></span>
  {/if}

  {#if icon}
    <div class="relative shrink-0 flex items-center justify-center {active ? 'text-[var(--ca-brand)]' : 'text-neutral-500 group-hover:text-neutral-700 dark:group-hover:text-neutral-300'}">
      {@render icon()}
      {#if statusDot}
        <span class="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full {statusDotStyles[statusDot]}"></span>
      {/if}
    </div>
  {/if}

  {#if !collapsed}
    <span class="flex-1 text-left truncate">{label}</span>

    {#if badge !== undefined && badge !== null}
      <span class="text-[10px] px-1.5 py-0.2 rounded-full font-mono font-medium leading-normal {badgeStyles[badgeVariant]}">
        {badge}
      </span>
    {/if}
  {/if}
</svelte:element>
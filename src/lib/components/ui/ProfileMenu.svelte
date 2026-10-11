<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ComponentSize, ComponentVariant } from './types';
  import { clickOutside, uid } from '../../utils/a11y';
  import ProfileAvatar from './ProfileAvatar.svelte';

  export interface ProfileMenuItem {
    id?: string;
    label: string;
    icon?: Snippet;
    divider?: boolean;
    danger?: boolean;
    disabled?: boolean;
    shortcut?: string;
    action?: () => void;
  }

  type ProfileMenuVariant = Extract<ComponentVariant, 'primary' | 'secondary' | 'ghost'>;
  type ProfileMenuSize = Extract<ComponentSize, 'sm' | 'md' | 'lg'>;

  interface Props {
    items?: ProfileMenuItem[];
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    avatar?: { name?: string; initials?: string; url?: string };
    size?: ProfileMenuSize;
    variant?: ProfileMenuVariant;
    align?: 'start' | 'end';
    class?: string;
    children?: Snippet;
  }

  let {
    items = [],
    open = $bindable(false),
    onOpenChange,
    avatar,
    size = 'md',
    variant: _variant = 'primary',
    align = 'end',
    class: customClass = '',
    children,
  }: Props = $props();

  const menuId = uid('profile-menu');
  let triggerRef = $state<HTMLButtonElement | null>(null);

  function toggle() {
    open = !open;
    onOpenChange?.(open);
  }

  function close() {
    if (!open) return;
    open = false;
    onOpenChange?.(false);
    triggerRef?.focus();
  }

  function activateItem(item: ProfileMenuItem) {
    if (item.disabled || item.divider) return;
    item.action?.();
    close();
  }
</script>

<div class="relative inline-block text-left {customClass}" use:clickOutside={close}>
  <button
    type="button"
    bind:this={triggerRef}
    aria-haspopup="menu"
    aria-expanded={open}
    aria-controls={open ? menuId : undefined}
    onclick={toggle}
    class="inline-flex items-center gap-2 p-1 rounded-full hover:bg-[var(--ca-surface-subtle)] transition-colors duration-[var(--ca-motion-duration-fast)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)]"
  >
    {#if avatar}
      <ProfileAvatar {size} name={avatar.name} initials={avatar.initials} url={avatar.url} />
    {:else}
      <svg class="w-5 h-5 text-[var(--ca-text-secondary)]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    {/if}
    {@render children?.()}
  </button>

  {#if open}
    <div
      id={menuId}
      role="menu"
      class="absolute z-50 mt-1 min-w-[160px] rounded-xl bg-[var(--ca-surface-elevated)] border border-[var(--ca-border)] shadow-xl p-1 backdrop-blur-md {align === 'end' ? 'right-0' : 'left-0'}"
    >
      <div class="py-1">
        {#each items as item, idx (item.id ?? `item-${idx}`)}
          {#if item.divider}
            <hr class="my-1 border-[var(--ca-border)]" />
          {:else}
            <button
              type="button"
              role="menuitem"
              disabled={item.disabled}
              aria-disabled={item.disabled || undefined}
              onclick={() => activateItem(item)}
              class="w-full text-left flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-sm transition-colors duration-[var(--ca-motion-duration-fast)] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)]
                {item.danger
                  ? 'text-rose-400 hover:bg-rose-500/10'
                  : 'text-[var(--ca-text-primary)] hover:bg-[var(--ca-surface-subtle)]'}"
            >
              {#if item.icon}
                {@render item.icon()}
              {/if}
              <span class="flex-1">{item.label}</span>
              {#if item.shortcut}
                <kbd class="text-[10px] text-[var(--ca-text-muted)]">{item.shortcut}</kbd>
              {/if}
            </button>
          {/if}
        {/each}
      </div>
    </div>
  {/if}
</div>

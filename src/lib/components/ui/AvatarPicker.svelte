<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ComponentSize } from './types';
  import Modal from './Modal.svelte';
  import Avatar from './Avatar.svelte';

  type AvatarPickerSize = Extract<ComponentSize, 'sm' | 'md' | 'lg'>;

  interface Props {
    value?: string;
    onChange?: (url: string) => void;
    close?: () => void;
    open?: boolean;
    options?: string[];
    size?: AvatarPickerSize;
    title?: string;
    class?: string;
    children?: Snippet;
  }

  let {
    value = '',
    onChange,
    close,
    open = $bindable(false),
    options = [],
    size = 'md',
    title = 'Choose an avatar',
    class: customClass = '',
    children,
  }: Props = $props();

  const gridSize: Record<AvatarPickerSize, string> = {
    sm: 'grid-cols-5',
    md: 'grid-cols-4',
    lg: 'grid-cols-3',
  };
  const avatarSize: Record<AvatarPickerSize, 'sm' | 'md' | 'lg'> = { sm: 'sm', md: 'md', lg: 'lg' };

  function pick(url: string) {
    onChange?.(url);
    open = false;
    close?.();
  }
</script>

<Modal bind:open {title} class={customClass} onclose={close}>
  <div class="grid {gridSize[size]} gap-3">
    {@render children?.()}
    {#each options as url (url)}
      <button
        type="button"
        aria-label="Select avatar"
        aria-pressed={value === url}
        onclick={() => pick(url)}
        class="rounded-full p-1 transition-all duration-[var(--ca-motion-duration-fast)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] {value === url
          ? 'ring-2 ring-[var(--ca-brand)] ring-offset-2 ring-offset-[var(--ca-surface-elevated)]'
          : 'hover:ring-2 hover:ring-[var(--ca-border-hover)]'}"
      >
        <Avatar src={url} alt="Avatar option" size={avatarSize[size]} halo={value === url ? 'brand' : 'none'} />
      </button>
    {/each}
  </div>

  {#snippet footer()}
    <button
      type="button"
      onclick={() => { open = false; close?.(); }}
      class="px-4 py-2 text-sm rounded-lg text-[var(--ca-text-secondary)] hover:text-[var(--ca-text-primary)] hover:bg-[var(--ca-surface-subtle)] transition-colors duration-[var(--ca-motion-duration-fast)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)]"
    >
      Cancel
    </button>
  {/snippet}
</Modal>

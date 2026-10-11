<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ComponentSize } from './types';
  import Modal from './Modal.svelte';

  type AboutModalVariant = 'primary' | 'secondary' | 'destructive' | 'ghost';
  type AboutModalSize = Extract<ComponentSize, 'sm' | 'md' | 'lg'>;

  interface Props {
    version: string;
    appName: string;
    variant?: AboutModalVariant;
    size?: AboutModalSize;
    open?: boolean;
    onDismiss?: () => void;
    class?: string;
    children?: Snippet;
  }

  let {
    version,
    appName,
    variant: _variant = 'primary',
    size = 'sm',
    open = $bindable(false),
    onDismiss,
    class: customClass = '',
    children,
  }: Props = $props();

  function dismiss() {
    open = false;
    onDismiss?.();
  }
</script>

<Modal bind:open title="About {appName}" {size} class={customClass} onclose={dismiss}>
  <div class="space-y-3 text-sm text-[var(--ca-text-secondary)]">
    {#if children}
      {@render children()}
    {:else}
      <p>
        <span class="font-semibold text-[var(--ca-text-primary)]">{appName}</span>
        is part of the CAUI design system.
      </p>
      <p>
        Version <span class="font-mono text-[var(--ca-text-primary)]">{version}</span>
      </p>
    {/if}
  </div>

  {#snippet footer()}
    <button
      type="button"
      onclick={dismiss}
      class="px-4 py-2 text-sm font-semibold rounded-lg bg-[var(--ca-brand)] text-white hover:opacity-90 transition-opacity duration-[var(--ca-motion-duration-fast)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)]"
    >
      Close
    </button>
  {/snippet}
</Modal>

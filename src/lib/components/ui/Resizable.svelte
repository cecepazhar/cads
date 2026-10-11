<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ComponentSize } from './types';
  import { uid } from '../../utils/a11y';

  type ResizableSize = Extract<ComponentSize, 'sm' | 'md'>;

  export interface ResizableProps {
    direction?: 'horizontal' | 'vertical';
    initialSplit?: number;
    minSize?: number;
    maxSize?: number;
    size?: ResizableSize;
    class?: string;
    firstSlot: Snippet;
    secondSlot: Snippet;
  }

  let {
    direction = 'horizontal',
    initialSplit = 50,
    minSize = 10,
    maxSize = 90,
    size = 'md',
    class: customClass = '',
    firstSlot,
    secondSlot,
  }: ResizableProps = $props();

  const separatorId = uid('resizable');

  let split = $state(initialSplit);
  let isDragging = $state(false);
  let containerEl = $state<HTMLDivElement | null>(null);

  /* ── Clamp initial values ──────────────────────────────────── */
  const clampedMin = $derived(Math.max(0, minSize));
  const clampedMax = $derived(Math.min(100, maxSize));

  $effect(() => {
    split = Math.max(clampedMin, Math.min(clampedMax, initialSplit));
  });

  /* ── Pointer events (mouse + touch via PointerEvent) ──────── */
  function handlePointerDown(e: PointerEvent) {
    if (!containerEl) return;
    isDragging = true;

    (e.target as HTMLElement).setPointerCapture(e.pointerId);

    function onPointerMove(moveEvent: PointerEvent) {
      if (!isDragging || !containerEl) return;

      const containerRect = containerEl.getBoundingClientRect();
      let percent: number;

      if (direction === 'horizontal') {
        const offset = moveEvent.clientX - containerRect.left;
        percent = (offset / containerRect.width) * 100;
      } else {
        const offset = moveEvent.clientY - containerRect.top;
        percent = (offset / containerRect.height) * 100;
      }

      split = Math.max(clampedMin, Math.min(clampedMax, percent));
    }

    function onPointerUp() {
      isDragging = false;
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerup', onPointerUp);
    }

    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);
  }

  /* ── Keyboard ──────────────────────────────────────────────── */
  function handleKeydown(e: KeyboardEvent) {
    const step = 1;
    let handled = false;

    if (direction === 'horizontal') {
      if (e.key === 'ArrowLeft') {
        split = Math.max(clampedMin, split - step);
        handled = true;
      } else if (e.key === 'ArrowRight') {
        split = Math.min(clampedMax, split + step);
        handled = true;
      }
    } else {
      if (e.key === 'ArrowUp') {
        split = Math.max(clampedMin, split - step);
        handled = true;
      } else if (e.key === 'ArrowDown') {
        split = Math.min(clampedMax, split + step);
        handled = true;
      }
    }

    if (e.key === 'Home') {
      split = clampedMin;
      handled = true;
    } else if (e.key === 'End') {
      split = clampedMax;
      handled = true;
    }

    if (handled) {
      e.preventDefault();
    }
  }

  /* ── Size styles (handle thickness) ─────────────────────────── */
  const handleSizeClasses: Record<ResizableSize, string> = {
    sm: direction === 'horizontal' ? 'w-0.5' : 'h-0.5',
    md: direction === 'horizontal' ? 'w-1' : 'h-1',
  };

  const cursorClass = direction === 'horizontal' ? 'cursor-col-resize' : 'cursor-row-resize';
  const flexDir = direction === 'horizontal' ? 'flex-row' : 'flex-col';
  const splitProp = direction === 'horizontal' ? 'width' : 'height';
</script>

<div
  bind:this={containerEl}
  class="flex-1 w-full h-full flex {flexDir} overflow-hidden relative {customClass}"
>
  <!-- First pane -->
  <div
    style:--ca-split="{split}%"
    style="{splitProp}: {split}%"
    class="overflow-auto"
  >
    {@render firstSlot()}
  </div>

  <!-- Resize handle -->
  <div
    id={separatorId}
    role="separator"
    tabindex="0"
    aria-orientation={direction === 'horizontal' ? 'vertical' : 'horizontal'}
    aria-valuenow={Math.round(split)}
    aria-valuemin={clampedMin}
    aria-valuemax={clampedMax}
    aria-label="Resize panels"
    onpointerdown={handlePointerDown}
    onkeydown={handleKeydown}
    class="shrink-0 select-none transition-colors relative z-20
      {handleSizeClasses[size]} {cursorClass}
      bg-[var(--ca-border)] hover:bg-[var(--ca-brand)] active:bg-[var(--ca-brand)]
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)]
      {isDragging ? 'bg-[var(--ca-brand)]' : ''}"
  ></div>

  <!-- Second pane -->
  <div
    style="{splitProp}: {100 - split}%"
    class="overflow-auto"
  >
    {@render secondSlot()}
  </div>
</div>
<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    direction?: 'horizontal' | 'vertical';
    initialSplit?: number; // 0 to 100 percentage
    minSize?: number; // min percentage
    firstSlot: Snippet;
    secondSlot: Snippet;
  }

  let {
    direction = 'horizontal',
    initialSplit = 50,
    minSize = 15,
    firstSlot,
    secondSlot
  }: Props = $props();

  let split = $state(initialSplit);
  let isDragging = $state(false);

  function handleMouseDown(e: MouseEvent) {
    isDragging = true;
    const startX = e.clientX;
    const startY = e.clientY;
    const initialRatio = split;

    function handleMouseMove(moveEvent: MouseEvent) {
      if (!isDragging) return;
      if (direction === 'horizontal') {
        const deltaPercent = ((moveEvent.clientX - startX) / window.innerWidth) * 100;
        split = Math.max(minSize, Math.min(100 - minSize, initialRatio + deltaPercent));
      } else {
        const deltaPercent = ((moveEvent.clientY - startY) / window.innerHeight) * 100;
        split = Math.max(minSize, Math.min(100 - minSize, initialRatio + deltaPercent));
      }
    }

    function handleMouseUp() {
      isDragging = false;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }

  function handleKeydown(e: KeyboardEvent) {
    const step = 1;
    let handled = false;

    if (direction === 'horizontal') {
      if (e.key === 'ArrowLeft') {
        split = Math.max(minSize, split - step);
        handled = true;
      } else if (e.key === 'ArrowRight') {
        split = Math.min(100 - minSize, split + step);
        handled = true;
      }
    } else {
      if (e.key === 'ArrowUp') {
        split = Math.max(minSize, split - step);
        handled = true;
      } else if (e.key === 'ArrowDown') {
        split = Math.min(100 - minSize, split + step);
        handled = true;
      }
    }

    if (handled) {
      e.preventDefault();
    }
  }
</script>

<div class="flex-1 w-full h-full flex {direction === 'horizontal' ? 'flex-row' : 'flex-col'} overflow-hidden relative">
  <!-- First Pane -->
  <div style="{direction === 'horizontal' ? `width: ${split}%` : `height: ${split}%`}" class="overflow-auto">
    {@render firstSlot()}
  </div>

  <!-- Draggable Divider Line -->
  <div
    role="separator"
    tabindex="0"
    aria-orientation={direction === 'horizontal' ? 'vertical' : 'horizontal'}
    aria-valuenow={Math.round(split)}
    aria-valuemin={minSize}
    aria-valuemax={100 - minSize}
    onmousedown={handleMouseDown}
    onkeydown={handleKeydown}
    class="{direction === 'horizontal' ? 'w-1 cursor-col-resize hover:bg-[var(--ca-brand)]' : 'h-1 cursor-row-resize hover:bg-[var(--ca-brand)]'} bg-[var(--ca-border)] transition-colors relative z-20 shrink-0 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)] {isDragging ? 'bg-[var(--ca-brand)]' : ''}"
  ></div>

  <!-- Second Pane -->
  <div style="{direction === 'horizontal' ? `width: ${100 - split}%` : `height: ${100 - split}%`}" class="overflow-auto">
    {@render secondSlot()}
  </div>
</div>
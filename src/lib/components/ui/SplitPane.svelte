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
    onmousedown={handleMouseDown}
    class="{direction === 'horizontal' ? 'w-1 cursor-col-resize hover:bg-[var(--ca-brand,#ef4444)]' : 'h-1 cursor-row-resize hover:bg-[var(--ca-brand,#ef4444)]'} bg-[#1E1E24] transition-colors relative z-20 shrink-0 select-none {isDragging ? 'bg-[var(--ca-brand,#ef4444)]' : ''}"
  ></div>

  <!-- Second Pane -->
  <div style="{direction === 'horizontal' ? `width: ${100 - split}%` : `height: ${100 - split}%`}" class="overflow-auto">
    {@render secondSlot()}
  </div>
</div>

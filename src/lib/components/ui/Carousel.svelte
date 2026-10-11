<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ComponentVariant, ComponentSize } from './types';
  import { uid } from '../../utils/a11y';
  import { ChevronLeft, ChevronRight } from 'lucide-svelte';

  type CarouselVariant = Extract<ComponentVariant, 'primary' | 'outline'>;
  type CarouselSize = Extract<ComponentSize, 'sm' | 'md' | 'lg'>;

  export interface CarouselProps {
    items?: number;
    autoplay?: boolean;
    interval?: number;
    showDots?: boolean;
    showArrows?: boolean;
    loop?: boolean;
    variant?: CarouselVariant;
    size?: CarouselSize;
    /** Accessible label for the carousel region. */
    'aria-label'?: string;
    class?: string;
    children?: Snippet;
  }

  let {
    items: itemsProp,
    autoplay = false,
    interval = 5000,
    showDots = true,
    showArrows = true,
    loop = true,
    variant = 'primary',
    size = 'md',
    'aria-label': ariaLabel = 'Carousel',
    class: customClass = '',
    children,
  }: CarouselProps = $props();

  const carouselId = uid('carousel');

  let current = $state(0);
  let total = $state(itemsProp ?? 1);
  let isPaused = $state(false);
  let containerEl = $state<HTMLDivElement | null>(null);
  let slidesEl = $state<HTMLDivElement | null>(null);
  let autoplayTimer: ReturnType<typeof setInterval> | undefined;

  /* ── Auto-count slides from children ───────────────────────── */
  $effect(() => {
    if (itemsProp !== undefined) {
      total = itemsProp;
      return;
    }
    if (slidesEl) {
      const count = slidesEl.children.length;
      if (count > 0) total = count;
    }
  });

  /* ── Clamp current when total changes ──────────────────────── */
  $effect(() => {
    if (current >= total) current = Math.max(0, total - 1);
  });

  /* ── Autoplay ──────────────────────────────────────────────── */
  function startAutoplay() {
    stopAutoplay();
    if (!autoplay || isPaused) return;
    autoplayTimer = setInterval(() => {
      goNext();
    }, interval);
  }

  function stopAutoplay() {
    if (autoplayTimer !== undefined) {
      clearInterval(autoplayTimer);
      autoplayTimer = undefined;
    }
  }

  $effect(() => {
    if (autoplay && !isPaused && total > 1) {
      startAutoplay();
    } else {
      stopAutoplay();
    }
    return () => stopAutoplay();
  });

  function pause() {
    isPaused = true;
  }

  function resume() {
    isPaused = false;
  }

  /* ── Navigation ────────────────────────────────────────────── */
  function goNext() {
    if (total <= 1) return;
    if (current < total - 1) {
      current += 1;
    } else if (loop) {
      current = 0;
    }
  }

  function goPrev() {
    if (total <= 1) return;
    if (current > 0) {
      current -= 1;
    } else if (loop) {
      current = total - 1;
    }
  }

  function goTo(index: number) {
    if (index >= 0 && index < total) {
      current = index;
    }
  }

  /* ── Keyboard ──────────────────────────────────────────────── */
  function handleContainerKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && autoplay) {
      e.preventDefault();
      stopAutoplay();
      isPaused = true;
      return;
    }
  }

  function handleDotKeydown(e: KeyboardEvent, index: number) {
    let nextIndex = -1;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = (index + 1) % total;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = (index - 1 + total) % total;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIndex = total - 1;
    }

    if (nextIndex >= 0) {
      goTo(nextIndex);
      const nextBtn = document.getElementById(`${carouselId}-dot-${nextIndex}`);
      nextBtn?.focus();
    }
  }

  /* ── Variant styles ────────────────────────────────────────── */
  const variantClasses: Record<CarouselVariant, string> = {
    primary: 'bg-[var(--ca-surface)] border border-[var(--ca-border)]',
    outline: 'bg-transparent border border-[var(--ca-border)]',
  };

  const sizeClasses: Record<CarouselSize, { wrapper: string; arrow: string; dot: string }> = {
    sm: {
      wrapper: 'rounded-lg',
      arrow: 'p-1',
      dot: 'w-1.5 h-1.5',
    },
    md: {
      wrapper: 'rounded-xl',
      arrow: 'p-1.5',
      dot: 'w-2 h-2',
    },
    lg: {
      wrapper: 'rounded-2xl',
      arrow: 'p-2',
      dot: 'w-2.5 h-2.5',
    },
  };

  const arrowBase =
    'inline-flex items-center justify-center rounded-full cursor-pointer select-none transition-colors ' +
    'bg-[var(--ca-surface-elevated)] text-[var(--ca-text-secondary)] ' +
    'hover:bg-[var(--ca-surface-subtle)] hover:text-[var(--ca-text-primary)] ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)]';

  const dotBase =
    'rounded-full cursor-pointer select-none transition-colors ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)]';
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  bind:this={containerEl}
  id={carouselId}
  role="region"
  aria-roledescription="carousel"
  aria-label={ariaLabel}
  aria-live={autoplay ? 'off' : 'polite'}
  onmouseenter={pause}
  onmouseleave={resume}
  onfocusin={pause}
  onfocusout={resume}
  onkeydown={handleContainerKeydown}
  class="relative overflow-hidden {variantClasses[variant]} {sizeClasses[size].wrapper} {customClass}"
>
  <!-- Slides track -->
  <div
    bind:this={slidesEl}
    class="flex transition-transform duration-300 ease-in-out [&>*]:shrink-0 [&>*]:w-full"
    style:transform="translateX(-{current * 100}%)"
  >
    {#if children}
      {@render children()}
    {/if}
  </div>

  <!-- Previous arrow -->
  {#if showArrows && total > 1}
    <button
      type="button"
      aria-label="Previous slide"
      onclick={goPrev}
      class="absolute left-2 top-1/2 -translate-y-1/2 z-10 {arrowBase} {sizeClasses[size].arrow}"
    >
      <ChevronLeft class="w-4 h-4" />
    </button>
  {/if}

  <!-- Next arrow -->
  {#if showArrows && total > 1}
    <button
      type="button"
      aria-label="Next slide"
      onclick={goNext}
      class="absolute right-2 top-1/2 -translate-y-1/2 z-10 {arrowBase} {sizeClasses[size].arrow}"
    >
      <ChevronRight class="w-4 h-4" />
    </button>
  {/if}

  <!-- Dots -->
  {#if showDots && total > 1}
    <div
      role="tablist"
      aria-label="Slide navigation"
      class="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5"
    >
      {#each { length: total } as _, i (i)}
        <button
          id="{carouselId}-dot-{i}"
          type="button"
          role="tab"
          aria-selected={current === i}
          aria-label="Go to slide {i + 1}"
          tabindex={current === i ? 0 : -1}
          onclick={() => goTo(i)}
          onkeydown={(e) => handleDotKeydown(e, i)}
          class="{dotBase} {sizeClasses[size].dot} {current === i
            ? 'bg-[var(--ca-brand)]'
            : 'bg-[var(--ca-text-muted)] hover:bg-[var(--ca-text-secondary)]'}"
        ></button>
      {/each}
    </div>
  {/if}
</div>
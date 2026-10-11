<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ComponentSize } from './types';
  import Modal from './Modal.svelte';
  import { Star, Mail } from 'lucide-svelte';

  type FeedbackModalVariant = 'primary' | 'secondary' | 'destructive' | 'ghost';
  type FeedbackModalSize = Extract<ComponentSize, 'sm' | 'md' | 'lg'>;

  interface Props {
    variant?: FeedbackModalVariant;
    size?: FeedbackModalSize;
    title?: string;
    description?: string;
    onSubmit?: (data: { text: string; rating: number; email?: string }) => Promise<void>;
    open?: boolean;
    class?: string;
    children?: Snippet;
  }

  let {
    variant = 'primary',
    size = 'md',
    title = 'Send feedback',
    description = 'Help us improve',
    onSubmit,
    open = $bindable(false),
    class: customClass = '',
    children,
  }: Props = $props();

  let text = $state('');
  let rating = $state(0);
  let email = $state('');
  let submitting = $state(false);
  let error = $state<string | null>(null);

  const submitLabel: Record<FeedbackModalVariant, string> = {
    primary: 'bg-[var(--ca-brand)] text-white hover:opacity-90',
    secondary: 'bg-[var(--ca-surface-subtle)] border border-[var(--ca-border)] text-[var(--ca-text-primary)] hover:opacity-80',
    destructive: 'bg-rose-500 text-white hover:bg-rose-600',
    ghost: 'bg-transparent text-[var(--ca-text-secondary)] hover:bg-[var(--ca-surface-subtle)]',
  };

  function reset() {
    text = '';
    rating = 0;
    email = '';
    error = null;
  }

  async function submit() {
    if (!text.trim()) {
      error = 'Please enter your feedback.';
      return;
    }
    if (rating === 0) {
      error = 'Please choose a rating.';
      return;
    }
    submitting = true;
    error = null;
    try {
      await onSubmit?.({ text: text.trim(), rating, email: email.trim() || undefined });
      open = false;
      reset();
    } catch (e) {
      error = e instanceof Error ? e.message : 'Submission failed.';
    } finally {
      submitting = false;
    }
  }
</script>

<Modal bind:open {title} {description} {size} class={customClass} onclose={reset}>
  <div class="space-y-4">
    {@render children?.()}

    <div role="radiogroup" aria-label="Rating">
      <span class="block text-sm font-medium text-[var(--ca-text-primary)] mb-1.5">Rating</span>
      <div class="flex gap-1">
        {#each [1, 2, 3, 4, 5] as star (star)}
          <button
            type="button"
            role="radio"
            aria-checked={rating === star}
            aria-label="{star} star{star > 1 ? 's' : ''}"
            onclick={() => { rating = star; error = null; }}
            class="p-1 rounded transition-colors duration-[var(--ca-motion-duration-fast)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)]"
          >
            <Star
              class="w-6 h-6 {rating >= star ? 'text-amber-400 fill-amber-400' : 'text-[var(--ca-text-muted)]'}"
              aria-hidden="true"
            />
          </button>
        {/each}
      </div>
    </div>

    <div>
      <label for="ca-feedback-text" class="block text-sm font-medium text-[var(--ca-text-primary)] mb-1.5">
        Feedback
      </label>
      <textarea
        id="ca-feedback-text"
        bind:value={text}
        rows={4}
        placeholder="Tell us what you think..."
        class="w-full resize-none rounded-lg bg-[var(--ca-surface)] border border-[var(--ca-border)] px-3 py-2 text-sm text-[var(--ca-text-primary)] placeholder:text-[var(--ca-text-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)]"
      ></textarea>
    </div>

    <div>
      <label for="ca-feedback-email" class="flex items-center gap-1.5 text-sm font-medium text-[var(--ca-text-primary)] mb-1.5">
        <Mail class="w-3.5 h-3.5" aria-hidden="true" /> Email <span class="text-[var(--ca-text-muted)]">(optional)</span>
      </label>
      <input
        id="ca-feedback-email"
        type="email"
        bind:value={email}
        placeholder="you@example.com"
        class="w-full rounded-lg bg-[var(--ca-surface)] border border-[var(--ca-border)] px-3 py-2 text-sm text-[var(--ca-text-primary)] placeholder:text-[var(--ca-text-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)]"
      />
    </div>

    {#if error}
      <p class="text-sm text-rose-400" role="alert">{error}</p>
    {/if}
  </div>

  {#snippet footer()}
    <button
      type="button"
      onclick={() => { open = false; reset(); }}
      class="px-4 py-2 text-sm rounded-lg text-[var(--ca-text-secondary)] hover:text-[var(--ca-text-primary)] hover:bg-[var(--ca-surface-subtle)] transition-colors duration-[var(--ca-motion-duration-fast)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)]"
    >
      Cancel
    </button>
    <button
      type="button"
      disabled={submitting}
      aria-busy={submitting || undefined}
      onclick={submit}
      class="px-4 py-2 text-sm font-semibold rounded-lg transition-opacity duration-[var(--ca-motion-duration-fast)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] {submitLabel[variant]}"
    >
      {submitting ? 'Submitting…' : 'Submit'}
    </button>
  {/snippet}
</Modal>

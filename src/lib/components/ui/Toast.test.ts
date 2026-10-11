import { render, screen, fireEvent } from '@testing-library/svelte';
import { tick } from 'svelte';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Toast from './Toast.svelte';
import { toast } from './toast.svelte';

describe('Toast', () => {
  beforeEach(() => {
    toast.toasts = [];
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders nothing when toast store is empty', () => {
    const { container } = render(Toast);
    expect(container.querySelector('[role="status"]')).toBeNull();
    expect(container.querySelector('[role="alert"]')).toBeNull();
  });

  it('renders a toast from the store', async () => {
    render(Toast);
    toast.show({ title: 'Hello', description: 'World' });
    await tick();
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('World')).toBeInTheDocument();
  });

  it('renders non-error toast with role="status" and aria-live="polite"', async () => {
    render(Toast);
    toast.show({ title: 'Info', type: 'info' });
    await tick();
    const el = screen.getByText('Info').closest('[role="status"]');
    expect(el).toBeInTheDocument();
    expect(el).toHaveAttribute('aria-live', 'polite');
  });

  it('renders error toast with role="alert" and aria-live="assertive"', async () => {
    render(Toast);
    toast.show({ title: 'Oops', type: 'error' });
    await tick();
    const el = screen.getByText('Oops').closest('[role="alert"]');
    expect(el).toBeInTheDocument();
    expect(el).toHaveAttribute('aria-live', 'assertive');
  });

  it('renders dismiss button with aria-label', async () => {
    render(Toast);
    toast.show({ title: 'Dismissible' });
    await tick();
    const btn = screen.getByRole('button', { name: 'Dismiss notification' });
    expect(btn).toBeInTheDocument();
  });

  it('dismisses toast when dismiss button is clicked', async () => {
    render(Toast);
    toast.show({ title: 'Bye', duration: 0 });
    await tick();
    const btn = screen.getByRole('button', { name: 'Dismiss notification' });
    await fireEvent.click(btn);
    await tick();
    expect(screen.queryByText('Bye')).not.toBeInTheDocument();
  });

  it('auto-removes toast after duration', async () => {
    render(Toast);
    toast.show({ title: 'Temporary', duration: 5000 });
    await tick();
    expect(screen.getByText('Temporary')).toBeInTheDocument();
    vi.advanceTimersByTime(5000);
    await tick();
    expect(screen.queryByText('Temporary')).not.toBeInTheDocument();
  });

  it('calls toast.pause on mouseenter', async () => {
    const pauseSpy = vi.spyOn(toast, 'pause');
    render(Toast);
    toast.show({ title: 'Pausable', duration: 10000 });
    await tick();
    const toastEl = screen.getByText('Pausable').closest('[role]')!;
    await fireEvent.mouseEnter(toastEl);
    expect(pauseSpy).toHaveBeenCalled();
    pauseSpy.mockRestore();
  });

  it('applies size classes', async () => {
    render(Toast, { props: { size: 'sm' } });
    toast.show({ title: 'Small' });
    await tick();
    const toastEl = screen.getByText('Small').closest('[role]')!;
    expect(toastEl.className).toContain('p-2.5');
  });

  it('applies success type styling', async () => {
    render(Toast);
    toast.show({ title: 'Done', type: 'success' });
    await tick();
    const toastEl = screen.getByText('Done').closest('[role]')!;
    expect(toastEl.className).toContain('emerald');
  });

  it('passes through custom class', () => {
    const { container } = render(Toast, { props: { class: 'my-toasts' } });
    expect((container.firstElementChild as HTMLElement).className).toContain('my-toasts');
  });
});
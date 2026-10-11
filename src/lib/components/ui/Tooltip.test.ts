import { tick } from 'svelte';
import { render, screen, fireEvent, act } from '@testing-library/svelte';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Tooltip from './Tooltip.svelte';

describe('Tooltip', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders wrapper element', () => {
    const { container } = render(Tooltip, {
      props: { content: 'Helpful tip' },
    });
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toBeInTheDocument();
    expect(wrapper.className).toContain('relative');
  });

  it('does not show tooltip bubble initially', () => {
    render(Tooltip, { props: { content: 'Hidden tip' } });
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('shows tooltip on mouseenter', async () => {
    const { container } = render(Tooltip, {
      props: { content: 'Hover tip' },
    });
    const wrapper = container.firstElementChild!;
    await fireEvent.mouseEnter(wrapper);
    const tooltip = screen.getByRole('tooltip');
    expect(tooltip).toBeInTheDocument();
    expect(tooltip.textContent).toBe('Hover tip');
  });

  it('hides tooltip on mouseleave', async () => {
    const { container } = render(Tooltip, {
      props: { content: 'Gone' },
    });
    const wrapper = container.firstElementChild!;
    await fireEvent.mouseEnter(wrapper);
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    await fireEvent.mouseLeave(wrapper);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('shows tooltip on focusin', async () => {
    const { container } = render(Tooltip, {
      props: { content: 'Focus tip' },
    });
    const wrapper = container.firstElementChild!;
    await fireEvent.focusIn(wrapper);
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  it('hides tooltip on focusout', async () => {
    const { container } = render(Tooltip, {
      props: { content: 'Blur away' },
    });
    const wrapper = container.firstElementChild!;
    await fireEvent.focusIn(wrapper);
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    await fireEvent.focusOut(wrapper);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('tooltip bubble has role="tooltip"', async () => {
    const { container } = render(Tooltip, {
      props: { content: 'Tip' },
    });
    await fireEvent.mouseEnter(container.firstElementChild!);
    const tooltip = screen.getByRole('tooltip');
    expect(tooltip).toHaveAttribute('role', 'tooltip');
  });

  it('trigger span has aria-describedby linked to tooltip id', async () => {
    const { container } = render(Tooltip, {
      props: { content: 'Described' },
    });
    const triggerSpan = container.querySelector('span')!;
    expect(triggerSpan).not.toHaveAttribute('aria-describedby');
    await fireEvent.mouseEnter(container.firstElementChild!);
    const tooltip = screen.getByRole('tooltip');
    const tooltipId = tooltip.getAttribute('id');
    expect(triggerSpan.getAttribute('aria-describedby')).toBe(tooltipId);
  });

  it('respects delay prop', async () => {
    const { container } = render(Tooltip, {
      props: { content: 'Delayed', delay: 300 },
    });
    await fireEvent.mouseEnter(container.firstElementChild!);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    act(() => vi.advanceTimersByTime(300));
    await tick();
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  it('dismisses on Escape key', async () => {
    const { container } = render(Tooltip, {
      props: { content: 'Escapable' },
    });
    await fireEvent.mouseEnter(container.firstElementChild!);
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    await fireEvent.keyDown(container.firstElementChild!, { key: 'Escape' });
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('applies placement classes for bottom', async () => {
    const { container } = render(Tooltip, {
      props: { content: 'Below', placement: 'bottom' },
    });
    await fireEvent.mouseEnter(container.firstElementChild!);
    const tooltip = screen.getByRole('tooltip');
    expect(tooltip.className).toContain('top-full');
  });

  it('applies placement classes for left', async () => {
    const { container } = render(Tooltip, {
      props: { content: 'Left', placement: 'left' },
    });
    await fireEvent.mouseEnter(container.firstElementChild!);
    const tooltip = screen.getByRole('tooltip');
    expect(tooltip.className).toContain('right-full');
  });

  it('does not show tooltip when content is empty', async () => {
    const { container } = render(Tooltip, {
      props: { content: '' },
    });
    await fireEvent.mouseEnter(container.firstElementChild!);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('passes through custom class', () => {
    const { container } = render(Tooltip, {
      props: { content: 'Tip', class: 'my-tip' },
    });
    expect((container.firstElementChild as HTMLElement).className).toContain('my-tip');
  });
});
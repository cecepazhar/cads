import { render, screen, fireEvent } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import Switch from './Switch.svelte';

describe('Switch', () => {
  it('renders with default props', () => {
    render(Switch);
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  // --- role="switch" ---

  it('has role="switch"', () => {
    render(Switch);
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  // --- aria-checked toggle ---

  it('has aria-checked="false" by default', () => {
    render(Switch);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
  });

  it('toggles aria-checked on click', async () => {
    render(Switch);
    const switchEl = screen.getByRole('switch');
    await fireEvent.click(switchEl);
    expect(switchEl).toHaveAttribute('aria-checked', 'true');
    await fireEvent.click(switchEl);
    expect(switchEl).toHaveAttribute('aria-checked', 'false');
  });

  it('fires onchange callback with new value', async () => {
    const onchange = vi.fn();
    render(Switch, { props: { onchange } });
    await fireEvent.click(screen.getByRole('switch'));
    expect(onchange).toHaveBeenCalledWith(true);
    await fireEvent.click(screen.getByRole('switch'));
    expect(onchange).toHaveBeenCalledWith(false);
  });

  // --- Disabled ---

  it('disables the switch when disabled prop is true', () => {
    render(Switch, { props: { disabled: true } });
    expect(screen.getByRole('switch')).toBeDisabled();
  });

  it('does not toggle when disabled', async () => {
    const onchange = vi.fn();
    render(Switch, { props: { disabled: true, onchange } });
    await fireEvent.click(screen.getByRole('switch'));
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
    expect(onchange).not.toHaveBeenCalled();
  });

  // --- Variant (primary/brand) ---

  it.each(['primary', 'brand'] as const)('renders %s variant without error', (variant) => {
    render(Switch, { props: { variant } });
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  // --- Size (sm/md/lg) ---

  it.each(['sm', 'md', 'lg'] as const)('renders %s size without error', (size) => {
    render(Switch, { props: { size } });
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('applies sm track size classes', () => {
    render(Switch, { props: { size: 'sm' } });
    const switchEl = screen.getByRole('switch');
    expect(switchEl.className).toContain('w-7');
    expect(switchEl.className).toContain('h-4');
  });

  it('applies lg track size classes', () => {
    render(Switch, { props: { size: 'lg' } });
    const switchEl = screen.getByRole('switch');
    expect(switchEl.className).toContain('w-11');
    expect(switchEl.className).toContain('h-6');
  });

  // --- aria-labelledby with label ---

  it('sets aria-labelledby when label is provided', () => {
    render(Switch, { props: { label: 'Dark mode' } });
    const switchEl = screen.getByRole('switch', { name: 'Dark mode' });
    expect(switchEl).toHaveAttribute('aria-labelledby');
    const labelledBy = switchEl.getAttribute('aria-labelledby');
    expect(document.getElementById(labelledBy!)).toHaveTextContent('Dark mode');
  });

  it('sets aria-label when no visible label but ariaLabel prop is provided', () => {
    render(Switch, { props: { 'aria-label': 'Toggle notifications' } });
    expect(screen.getByRole('switch', { name: 'Toggle notifications' })).toBeInTheDocument();
  });

  // --- focus-visible ---

  it('has focus-visible ring classes', () => {
    render(Switch);
    expect(screen.getByRole('switch').className).toContain('focus-visible:ring-2');
    expect(screen.getByRole('switch').className).toContain('focus-visible:ring-offset-2');
  });

  // --- Custom class passthrough ---

  it('applies custom class passthrough', () => {
    render(Switch, { props: { class: 'my-switch' } });
    // The custom class is on the <label> wrapper (the root element)
    const switchEl = screen.getByRole('switch');
    const label = switchEl.closest('label')!;
    expect(label.className).toContain('my-switch');
  });

  // --- Token compliance ---

  it('does not contain hex color values in rendered DOM', () => {
    const { container } = render(Switch);
    expect(container.innerHTML).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });
});
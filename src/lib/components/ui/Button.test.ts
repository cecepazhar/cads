import { render, screen, fireEvent } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import Button from './Button.svelte';

describe('Button', () => {
  it('renders with default props', () => {
    const { getByRole } = render(Button);
    const button = getByRole('button');

    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
    // default variant is 'secondary', default size is 'md'
    expect(button.className).toContain('px-3.5');
  });

  it('applies variant classes', () => {
    const { getByRole } = render(Button, { props: { variant: 'danger' } });
    const button = getByRole('button');

    expect(button.className).toContain('rose');
  });

  it('applies primary variant', () => {
    const { getByRole } = render(Button, { props: { variant: 'primary' } });
    const button = getByRole('button');

    expect(button.className).toContain('ca-brand');
  });

  it('disables when disabled prop is true', () => {
    const { getByRole } = render(Button, { props: { disabled: true } });
    expect(getByRole('button')).toBeDisabled();
  });

  it('disables when loading prop is true', () => {
    const { getByRole } = render(Button, { props: { loading: true } });
    expect(getByRole('button')).toBeDisabled();
  });

  it('fires onclick handler', async () => {
    const handleClick = vi.fn();
    const { getByRole } = render(Button, { props: { onclick: handleClick } });

    await fireEvent.click(getByRole('button'));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('applies size classes', () => {
    const { getByRole } = render(Button, { props: { size: 'sm' } });
    expect(getByRole('button').className).toContain('px-2.5');
  });

  // --- Variant / size matrix ---

  it.each(['primary', 'secondary', 'outline', 'ghost', 'danger', 'brand', 'neutral', 'info', 'success', 'warning'] as const)(
    'renders %s variant without error',
    (variant) => {
      render(Button, { props: { variant } });
      expect(screen.getByRole('button')).toBeInTheDocument();
    }
  );

  it.each(['sm', 'md', 'lg'] as const)('renders %s size without error', (size) => {
    render(Button, { props: { size } });
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders icon size with aria-label', () => {
    render(Button, { props: { size: 'icon', 'aria-label': 'Close' } });
    const button = screen.getByRole('button', { name: 'Close' });
    expect(button).toBeInTheDocument();
    expect(button.className).toContain('p-1.5');
  });

  // --- ARIA loading ---

  it('sets aria-busy when loading', () => {
    render(Button, { props: { loading: true } });
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
  });

  it('does not set aria-busy when not loading', () => {
    render(Button);
    expect(screen.getByRole('button')).not.toHaveAttribute('aria-busy');
  });

  it('renders loading spinner SVG when loading', () => {
    const { container } = render(Button, { props: { loading: true } });
    expect(container.querySelector('svg.animate-spin')).toBeInTheDocument();
  });

  it('does not render loading spinner when not loading', () => {
    const { container } = render(Button);
    expect(container.querySelector('svg.animate-spin')).not.toBeInTheDocument();
  });

  // --- aria-label on icon-only ---

  it('does not apply aria-label when size is not icon', () => {
    render(Button, { props: { size: 'md', 'aria-label': 'Ignored' } });
    expect(screen.getByRole('button')).not.toHaveAttribute('aria-label');
  });

  // --- focus-visible ---

  it('has focus-visible ring classes', () => {
    render(Button);
    const button = screen.getByRole('button');
    expect(button.className).toContain('focus-visible:ring-2');
    expect(button.className).toContain('focus-visible:ring-[var(--ca-brand)]');
    expect(button.className).toContain('focus-visible:ring-offset-2');
  });

  // --- Custom class passthrough ---

  it('applies custom class passthrough', () => {
    render(Button, { props: { class: 'my-custom-class' } });
    expect(screen.getByRole('button').className).toContain('my-custom-class');
  });

  // --- Token compliance ---

  it('does not contain hex color values in rendered DOM', () => {
    const { container } = render(Button);
    expect(container.innerHTML).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });
});

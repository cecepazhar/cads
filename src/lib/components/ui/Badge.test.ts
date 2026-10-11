import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import { createRawSnippet } from 'svelte';
import Badge from './Badge.svelte';

const allVariants = ['primary', 'secondary', 'outline', 'ghost', 'brand', 'neutral', 'info', 'success', 'warning', 'danger'] as const;
const allSizes = ['xs', 'sm', 'md'] as const;

describe('Badge', () => {
  it('renders with default props', () => {
    render(Badge);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  // --- Variant matrix ---

  it.each(allVariants)('renders %s variant without error', (variant) => {
    render(Badge, { props: { variant } });
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('applies info variant color classes', () => {
    render(Badge, { props: { variant: 'info' } });
    expect(screen.getByRole('status').className).toContain('sky');
  });

  it('applies success variant color classes', () => {
    render(Badge, { props: { variant: 'success' } });
    expect(screen.getByRole('status').className).toContain('emerald');
  });

  it('applies danger variant color classes', () => {
    render(Badge, { props: { variant: 'danger' } });
    expect(screen.getByRole('status').className).toContain('rose');
  });

  // --- Size matrix ---

  it.each(allSizes)('renders %s size without error', (size) => {
    render(Badge, { props: { size } });
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('applies xs size classes', () => {
    render(Badge, { props: { size: 'xs' } });
    expect(screen.getByRole('status').className).toContain('text-[10px]');
  });

  it('applies sm size classes', () => {
    render(Badge, { props: { size: 'sm' } });
    expect(screen.getByRole('status').className).toContain('text-xs');
  });

  it('applies md size classes', () => {
    render(Badge, { props: { size: 'md' } });
    expect(screen.getByRole('status').className).toContain('text-sm');
  });

  // --- role="status" ---

  it('has role="status"', () => {
    render(Badge);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  // --- Children content ---

  it('renders children content', () => {
    render(Badge, {
      props: {
        children: createRawSnippet(() => ({ render: () => '<span>Active</span>' })),
      },
    });
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  // --- Custom class passthrough ---

  it('applies custom class passthrough', () => {
    render(Badge, { props: { class: 'my-badge' } });
    expect(screen.getByRole('status').className).toContain('my-badge');
  });

  // --- Token compliance ---

  it('does not contain hex color values in rendered DOM', () => {
    const { container } = render(Badge);
    expect(container.innerHTML).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });
});
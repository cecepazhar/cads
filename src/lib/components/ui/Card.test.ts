import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import { createRawSnippet } from 'svelte';
import Card from './Card.svelte';

describe('Card', () => {
  it('renders without title (no region role)', () => {
    const { container } = render(Card);
    expect(container.firstElementChild).toBeInTheDocument();
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
  });

  // --- Title and description ---

  it('renders title and description', () => {
    render(Card, { props: { title: 'Card Title', description: 'A description.' } });
    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('A description.')).toBeInTheDocument();
  });

  // --- Heading level ---

  it.each([1, 2, 3, 4, 5, 6] as const)('renders h%d heading when level is %d', (level) => {
    render(Card, { props: { title: 'My Card', level } });
    const heading = screen.getByRole('heading', { level, name: 'My Card' });
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe(`H${level}`);
  });

  it('defaults to h3 heading', () => {
    render(Card, { props: { title: 'Default Level' } });
    expect(screen.getByRole('heading', { level: 3, name: 'Default Level' })).toBeInTheDocument();
  });

  // --- role="region" ---

  it('has role="region" when title is present', () => {
    render(Card, { props: { title: 'Region Card' } });
    const region = screen.getByRole('region', { name: 'Region Card' });
    expect(region).toBeInTheDocument();
    expect(region).toHaveAttribute('aria-labelledby');
  });

  it('does not have role="region" when title is absent', () => {
    render(Card, { props: { description: 'No title' } });
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
  });

  // --- Variant matrix ---

  it.each(['primary', 'secondary', 'outline', 'ghost'] as const)(
    'renders %s variant without error',
    (variant) => {
      const { container } = render(Card, { props: { variant } });
      expect(container.firstElementChild).toBeInTheDocument();
    }
  );

  it('applies ghost variant classes', () => {
    const { container } = render(Card, { props: { variant: 'ghost' } });
    expect((container.firstElementChild as HTMLElement).className).toContain('bg-transparent');
  });

  // --- Size matrix ---

  it.each(['sm', 'md', 'lg'] as const)('renders %s size without error', (size) => {
    const { container } = render(Card, { props: { size } });
    expect(container.firstElementChild).toBeInTheDocument();
  });

  it('applies sm size padding', () => {
    const { container } = render(Card, { props: { size: 'sm' } });
    expect((container.firstElementChild as HTMLElement).className).toContain('p-3');
  });

  it('applies lg size padding', () => {
    const { container } = render(Card, { props: { size: 'lg' } });
    expect((container.firstElementChild as HTMLElement).className).toContain('p-7');
  });

  // --- Children content ---

  it('renders children content', () => {
    render(Card, {
      props: {
        title: 'With Body',
        children: createRawSnippet(() => ({ render: () => '<p>Body text</p>' })),
      },
    });
    expect(screen.getByText('Body text')).toBeInTheDocument();
  });

  // --- Custom class passthrough ---

  it('applies custom class passthrough', () => {
    const { container } = render(Card, { props: { class: 'my-card' } });
    expect((container.firstElementChild as HTMLElement).className).toContain('my-card');
  });

  // --- Token compliance ---

  it('does not contain hex color values in rendered DOM', () => {
    const { container } = render(Card, { props: { title: 'T' } });
    expect(container.innerHTML).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });
});
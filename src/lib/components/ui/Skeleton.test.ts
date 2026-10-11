import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Skeleton from './Skeleton.svelte';

describe('Skeleton', () => {
  it('renders with role="status"', () => {
    render(Skeleton);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('has aria-busy="true"', () => {
    render(Skeleton);
    expect(screen.getByRole('status')).toHaveAttribute('aria-busy', 'true');
  });

  it('has aria-label="Loading"', () => {
    render(Skeleton);
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading');
  });

  it('applies animate-pulse class', () => {
    render(Skeleton);
    expect(screen.getByRole('status').className).toContain('animate-pulse');
  });

  it('applies text variant classes by default', () => {
    render(Skeleton);
    expect(screen.getByRole('status').className).toContain('rounded-md');
    expect(screen.getByRole('status').className).toContain('h-4');
  });

  it('applies circular variant classes', () => {
    render(Skeleton, { props: { variant: 'circular' } });
    const el = screen.getByRole('status');
    expect(el.className).toContain('rounded-full');
    expect(el.className).toContain('w-10');
    expect(el.className).toContain('h-10');
  });

  it('applies rectangular variant classes', () => {
    render(Skeleton, { props: { variant: 'rectangular' } });
    const el = screen.getByRole('status');
    expect(el.className).toContain('rounded-sm');
    expect(el.className).toContain('h-24');
  });

  it('applies sm size for text variant', () => {
    render(Skeleton, { props: { size: 'sm' } });
    expect(screen.getByRole('status').className).toContain('h-3');
  });

  it('applies lg size for text variant', () => {
    render(Skeleton, { props: { size: 'lg' } });
    expect(screen.getByRole('status').className).toContain('h-5');
  });

  it('applies sm size for circular variant', () => {
    render(Skeleton, { props: { variant: 'circular', size: 'sm' } });
    const el = screen.getByRole('status');
    expect(el.className).toContain('w-8');
    expect(el.className).toContain('h-8');
  });

  it('applies lg size for circular variant', () => {
    render(Skeleton, { props: { variant: 'circular', size: 'lg' } });
    const el = screen.getByRole('status');
    expect(el.className).toContain('w-14');
    expect(el.className).toContain('h-14');
  });

  it('applies lg size for rectangular variant', () => {
    render(Skeleton, { props: { variant: 'rectangular', size: 'lg' } });
    expect(screen.getByRole('status').className).toContain('h-32');
  });

  it('passes through custom class', () => {
    const { container } = render(Skeleton, { props: { class: 'my-skel' } });
    expect((container.firstElementChild as HTMLElement).className).toContain('my-skel');
  });
});
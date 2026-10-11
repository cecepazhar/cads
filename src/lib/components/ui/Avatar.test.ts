import { render, screen, fireEvent } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import Avatar from './Avatar.svelte';

describe('Avatar', () => {
  it('renders with default props', () => {
    const { container } = render(Avatar);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toBeInTheDocument();
    expect(wrapper.className).toContain('w-10');
    expect(wrapper.className).toContain('rounded-full');
  });

  it('renders image when src is provided', () => {
    render(Avatar, { props: { src: '/avatar.png', alt: 'User avatar' } });
    const img = screen.getByAltText('User avatar');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/avatar.png');
  });

  it('shows fallback initials when image fails to load', async () => {
    const { container } = render(Avatar, { props: { src: '/broken.png', fallback: 'JD' } });
    const img = container.querySelector('img')!;
    await fireEvent.error(img);
    expect(screen.getByLabelText('JD')).toBeInTheDocument();
    expect(screen.getByLabelText('JD').textContent).toBe('JD');
  });

  it('shows fallback initials when no src is provided', () => {
    render(Avatar, { props: { fallback: 'AB' } });
    expect(screen.getByLabelText('AB')).toBeInTheDocument();
    expect(screen.getByLabelText('AB').textContent).toBe('AB');
  });

  it('applies primary variant classes by default', () => {
    const { container } = render(Avatar);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.className).toContain('neutral-200');
  });

  it('applies brand variant classes', () => {
    const { container } = render(Avatar, { props: { variant: 'brand' } });
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.className).toContain('ca-brand');
  });

  it('applies xs size classes', () => {
    const { container } = render(Avatar, { props: { size: 'xs' } });
    expect((container.firstElementChild as HTMLElement).className).toContain('w-6');
  });

  it('applies sm size classes', () => {
    const { container } = render(Avatar, { props: { size: 'sm' } });
    expect((container.firstElementChild as HTMLElement).className).toContain('w-8');
  });

  it('applies lg size classes', () => {
    const { container } = render(Avatar, { props: { size: 'lg' } });
    expect((container.firstElementChild as HTMLElement).className).toContain('w-14');
  });

  it('applies xl size classes', () => {
    const { container } = render(Avatar, { props: { size: 'xl' } });
    expect((container.firstElementChild as HTMLElement).className).toContain('w-20');
  });

  it('applies halo pro ring classes', () => {
    const { container } = render(Avatar, { props: { halo: 'pro' } });
    expect((container.firstElementChild as HTMLElement).className).toContain('ring-2');
    expect((container.firstElementChild as HTMLElement).className).toContain('animate-pulse');
  });

  it('applies halo brand ring classes', () => {
    const { container } = render(Avatar, { props: { halo: 'brand' } });
    expect((container.firstElementChild as HTMLElement).className).toContain('ring-2');
  });

  it('passes through custom class', () => {
    const { container } = render(Avatar, { props: { class: 'my-avatar' } });
    expect((container.firstElementChild as HTMLElement).className).toContain('my-avatar');
  });

  it('shows default SVG when no src, fallback, or children', () => {
    const { container } = render(Avatar);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
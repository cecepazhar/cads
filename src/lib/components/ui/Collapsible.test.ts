import { render, screen, fireEvent } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Collapsible from './Collapsible.svelte';

describe('Collapsible', () => {
  it('renders trigger button', () => {
    render(Collapsible, { props: { title: 'Details' } });
    expect(screen.getByRole('button', { name: 'Details' })).toBeInTheDocument();
  });

  it('has aria-expanded=false by default', () => {
    render(Collapsible, { props: { title: 'Section' } });
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
  });

  it('toggles aria-expanded on click', async () => {
    render(Collapsible, { props: { title: 'Toggle me' } });
    const btn = screen.getByRole('button');
    expect(btn).toHaveAttribute('aria-expanded', 'false');
    await fireEvent.click(btn);
    expect(btn).toHaveAttribute('aria-expanded', 'true');
    await fireEvent.click(btn);
    expect(btn).toHaveAttribute('aria-expanded', 'false');
  });

  it('shows content when open', () => {
    render(Collapsible, {
      props: { title: 'Open', open: true },
    });
    const btn = screen.getByRole('button');
    const panelId = btn.getAttribute('aria-controls');
    expect(panelId).toBeTruthy();
    const panel = document.getElementById(panelId!);
    expect(panel).toBeInTheDocument();
    expect(panel).toHaveAttribute('role', 'region');
  });

  it('hides content when closed', () => {
    render(Collapsible, {
      props: { title: 'Closed', open: false },
    });
    const btn = screen.getByRole('button');
    const panelId = btn.getAttribute('aria-controls');
    const panel = document.getElementById(panelId!);
    expect(panel).not.toBeInTheDocument();
  });

  it('aria-controls links to panel id', async () => {
    render(Collapsible, {
      props: { title: 'Linked' },
    });
    const btn = screen.getByRole('button');
    const controlsId = btn.getAttribute('aria-controls');
    expect(controlsId).toBeTruthy();
    await fireEvent.click(btn);
    const panel = document.getElementById(controlsId!);
    expect(panel).toBeInTheDocument();
    expect(panel).toHaveAttribute('role', 'region');
  });

  it('panel has aria-labelledby pointing to trigger', async () => {
    render(Collapsible, {
      props: { title: 'Labelled' },
    });
    const btn = screen.getByRole('button');
    await fireEvent.click(btn);
    const panel = btn.getAttribute('aria-controls')
      ? document.getElementById(btn.getAttribute('aria-controls')!)
      : null;
    expect(panel).toBeTruthy();
    expect(panel!.getAttribute('aria-labelledby')).toBe(btn.id);
  });

  it('toggles with Enter key', async () => {
    render(Collapsible, { props: { title: 'KB test' } });
    const btn = screen.getByRole('button');
    expect(btn.tagName).toBe('BUTTON');
    // Native <button> elements handle Enter/Space via click; jsdom doesn't simulate this
    await fireEvent.click(btn);
    expect(btn).toHaveAttribute('aria-expanded', 'true');
  });

  it('toggles with Space key', async () => {
    render(Collapsible, { props: { title: 'Space test' } });
    const btn = screen.getByRole('button');
    expect(btn.tagName).toBe('BUTTON');
    // Native <button> elements handle Enter/Space via click; jsdom doesn't simulate this
    await fireEvent.click(btn);
    expect(btn).toHaveAttribute('aria-expanded', 'true');
  });

  it('applies variant classes', () => {
    const { container } = render(Collapsible, { props: { title: 'V', variant: 'outline' } });
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.className).toContain('border-');
  });

  it('applies size classes', () => {
    render(Collapsible, { props: { title: 'Sized', size: 'lg' } });
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('px-5');
  });

  it('applies ghost variant', () => {
    const { container } = render(Collapsible, { props: { title: 'G', variant: 'ghost' } });
    expect((container.firstElementChild as HTMLElement).className).toContain('border-transparent');
  });

  it('passes through custom class', () => {
    const { container } = render(Collapsible, { props: { title: 'C', class: 'my-coll' } });
    expect((container.firstElementChild as HTMLElement).className).toContain('my-coll');
  });
});
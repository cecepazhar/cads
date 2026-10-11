import { render, screen, fireEvent } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import { createRawSnippet } from 'svelte';
import Tabs from './Tabs.svelte';

const items = [
  { id: 'general', label: 'General' },
  { id: 'security', label: 'Security' },
  { id: 'billing', label: 'Billing' },
];

const children = createRawSnippet(() => ({ render: () => '<div>Panel</div>' }));

describe('Tabs', () => {
  it('renders tab buttons', () => {
    render(Tabs, { props: { items } });
    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(3);
    expect(tabs[0]).toHaveTextContent('General');
    expect(tabs[1]).toHaveTextContent('Security');
    expect(tabs[2]).toHaveTextContent('Billing');
  });

  // --- ARIA roles ---

  it('has role="tablist" on the container', () => {
    render(Tabs, { props: { items } });
    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });

  it('has role="tabpanel" when children are provided', () => {
    render(Tabs, { props: { items, children } });
    expect(screen.getByRole('tabpanel')).toBeInTheDocument();
  });

  it('does not render tabpanel without children', () => {
    render(Tabs, { props: { items } });
    expect(screen.queryByRole('tabpanel')).not.toBeInTheDocument();
  });

  it('tabpanel has aria-labelledby pointing to the active tab', () => {
    render(Tabs, { props: { items, children } });
    const tabpanel = screen.getByRole('tabpanel');
    expect(tabpanel).toHaveAttribute('aria-labelledby', 'tab-general');
  });

  // --- aria-selected ---

  it('marks the first tab as selected by default', () => {
    render(Tabs, { props: { items } });
    const tabs = screen.getAllByRole('tab');
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[1]).toHaveAttribute('aria-selected', 'false');
    expect(tabs[2]).toHaveAttribute('aria-selected', 'false');
  });

  it('updates aria-selected on tab click', async () => {
    render(Tabs, { props: { items } });
    const tabs = screen.getAllByRole('tab');
    await fireEvent.click(tabs[1]);
    expect(tabs[0]).toHaveAttribute('aria-selected', 'false');
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
  });

  // --- Keyboard navigation ---

  it('ArrowRight moves focus and activates next tab', async () => {
    render(Tabs, { props: { items } });
    const tabs = screen.getAllByRole('tab');
    tabs[0].focus();
    await fireEvent.keyDown(tabs[0], { key: 'ArrowRight' });
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
    expect(document.activeElement).toBe(tabs[1]);
  });

  it('ArrowLeft moves focus and activates previous tab', async () => {
    render(Tabs, { props: { items } });
    const tabs = screen.getAllByRole('tab');
    tabs[1].focus();
    await fireEvent.keyDown(tabs[1], { key: 'ArrowLeft' });
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    expect(document.activeElement).toBe(tabs[0]);
  });

  // --- Variant ---

  it.each(['underline', 'pills', 'segmented'] as const)('renders %s variant without error', (variant) => {
    render(Tabs, { props: { items, variant } });
    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });

  it('applies segmented variant styles', () => {
    render(Tabs, { props: { items, variant: 'segmented' } });
    expect(screen.getByRole('tablist').className).toContain('rounded-lg');
  });

  // --- Size ---

  it.each(['sm', 'md', 'lg'] as const)('renders %s size without error', (size) => {
    render(Tabs, { props: { items, size } });
    expect(screen.getAllByRole('tab')[0]).toBeInTheDocument();
  });

  it('applies sm size classes', () => {
    render(Tabs, { props: { items, size: 'sm' } });
    expect(screen.getAllByRole('tab')[0].className).toContain('text-[11px]');
  });

  it('applies lg size classes', () => {
    render(Tabs, { props: { items, size: 'lg' } });
    expect(screen.getAllByRole('tab')[0].className).toContain('text-sm');
  });

  // --- Disabled tab ---

  it('disables a tab item', () => {
    const itemsWithDisabled = [
      { id: 'general', label: 'General' },
      { id: 'admin', label: 'Admin', disabled: true },
    ];
    render(Tabs, { props: { items: itemsWithDisabled } });
    const tabs = screen.getAllByRole('tab');
    expect(tabs[1]).toBeDisabled();
  });

  // --- Custom class passthrough ---

  it('applies custom class passthrough', () => {
    const { container } = render(Tabs, { props: { items, class: 'my-tabs' } });
    expect((container.firstElementChild as HTMLElement).className).toContain('my-tabs');
  });

  // --- Token compliance ---

  it('does not contain hex color values in rendered DOM', () => {
    const { container } = render(Tabs, { props: { items } });
    expect(container.innerHTML).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });
});
import { render, screen, fireEvent } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Combobox from './Combobox.svelte';

const options = [
  { value: 'svelte', label: 'Svelte' },
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
];

describe('Combobox', () => {
  it('renders input with role=combobox', () => {
    render(Combobox, { props: { options } });
    const input = screen.getByRole('combobox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
  });

  it('has aria-expanded=false initially', () => {
    render(Combobox, { props: { options } });
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false');
  });

  it('opens listbox on focus', async () => {
    render(Combobox, { props: { options } });
    const input = screen.getByRole('combobox');
    await fireEvent.focus(input);
    expect(input).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('renders options with role=option', async () => {
    render(Combobox, { props: { options } });
    await fireEvent.focus(screen.getByRole('combobox'));
    const opts = screen.getAllByRole('option');
    expect(opts).toHaveLength(3);
    expect(opts[0].textContent).toBe('Svelte');
    expect(opts[1].textContent).toBe('React');
  });

  it('filters options based on query', async () => {
    render(Combobox, { props: { options } });
    const input = screen.getByRole('combobox');
    await fireEvent.focus(input);
    await fireEvent.input(input, { target: { value: 'sv' } });
    const opts = screen.getAllByRole('option');
    expect(opts).toHaveLength(1);
    expect(opts[0].textContent).toBe('Svelte');
  });

  it('selects option on click', async () => {
    render(Combobox, { props: { options } });
    const input = screen.getByRole('combobox') as HTMLInputElement;
    await fireEvent.focus(input);
    const opt = screen.getAllByRole('option')[1];
    await fireEvent.click(opt);
    expect(input.value).toBe('React');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('navigates with ArrowDown', async () => {
    render(Combobox, { props: { options } });
    const input = screen.getByRole('combobox');
    await fireEvent.focus(input);
    await fireEvent.keyDown(input, { key: 'ArrowDown' });
    const firstOption = screen.getAllByRole('option')[0];
    expect(firstOption).toHaveAttribute('aria-selected', 'true');
  });

  it('navigates with ArrowUp', async () => {
    render(Combobox, { props: { options } });
    const input = screen.getByRole('combobox');
    await fireEvent.focus(input);
    await fireEvent.keyDown(input, { key: 'ArrowDown' });
    await fireEvent.keyDown(input, { key: 'ArrowDown' });
    await fireEvent.keyDown(input, { key: 'ArrowUp' });
    const firstOption = screen.getAllByRole('option')[0];
    expect(firstOption).toHaveAttribute('aria-selected', 'true');
  });

  it('selects with Enter key', async () => {
    render(Combobox, { props: { options } });
    const input = screen.getByRole('combobox') as HTMLInputElement;
    await fireEvent.focus(input);
    await fireEvent.keyDown(input, { key: 'ArrowDown' });
    await fireEvent.keyDown(input, { key: 'Enter' });
    expect(input.value).toBe('Svelte');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('closes on Escape key', async () => {
    render(Combobox, { props: { options } });
    const input = screen.getByRole('combobox');
    await fireEvent.focus(input);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    await fireEvent.keyDown(input, { key: 'Escape' });
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(input).toHaveAttribute('aria-expanded', 'false');
  });

  it('sets aria-activedescendant when navigating', async () => {
    render(Combobox, { props: { options } });
    const input = screen.getByRole('combobox');
    await fireEvent.focus(input);
    await fireEvent.keyDown(input, { key: 'ArrowDown' });
    const descId = input.getAttribute('aria-activedescendant');
    expect(descId).toBeTruthy();
    expect(document.getElementById(descId!)?.textContent).toBe('Svelte');
  });

  it('applies variant classes', () => {
    render(Combobox, { props: { options, variant: 'outline' } });
    const input = screen.getByRole('combobox');
    expect(input.className).toContain('bg-transparent');
  });

  it('applies size classes', () => {
    render(Combobox, { props: { options, size: 'sm' } });
    const input = screen.getByRole('combobox');
    expect(input.className).toContain('px-2.5');
  });

  it('passes through custom class', () => {
    const { container } = render(Combobox, { props: { options, class: 'my-combo' } });
    expect((container.firstElementChild as HTMLElement).className).toContain('my-combo');
  });
});
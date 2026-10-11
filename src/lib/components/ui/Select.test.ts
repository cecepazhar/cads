import { render, screen, fireEvent } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import Select from './Select.svelte';

const options = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
  { value: 'c', label: 'Gamma', disabled: true },
];

describe('Select', () => {
  it('renders with placeholder', () => {
    render(Select, { props: { options } });
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select).toBeInTheDocument();
    expect(select.options[select.selectedIndex].textContent).toBe('Select option...');
  });

  it('renders all options', () => {
    render(Select, { props: { options } });
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    const optElements = Array.from(select.options).filter((o) => o.value !== '');
    expect(optElements).toHaveLength(3);
    expect(optElements[0].textContent).toBe('Alpha');
    expect(optElements[1].textContent).toBe('Beta');
  });

  it('marks disabled option as disabled', () => {
    render(Select, { props: { options } });
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    const gammaOpt = Array.from(select.options).find((o) => o.value === 'c')!;
    expect(gammaOpt.disabled).toBe(true);
  });

  it('renders label with for attribute matching select id', () => {
    render(Select, { props: { options, id: 'my-select', label: 'Pick one' } });
    const label = screen.getByText('Pick one');
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('for', 'my-select');
    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute('id', 'my-select');
  });

  it('sets aria-invalid when error is provided', () => {
    render(Select, { props: { options, error: 'Required field' } });
    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Required field')).toBeInTheDocument();
  });

  it('does not set aria-invalid when no error', () => {
    render(Select, { props: { options } });
    expect(screen.getByRole('combobox')).not.toHaveAttribute('aria-invalid');
  });

  it('is disabled when disabled prop is true', () => {
    render(Select, { props: { options, disabled: true } });
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('applies variant classes', () => {
    const { container } = render(Select, { props: { options, variant: 'outline' } });
    const select = container.querySelector('select')!;
    expect(select.className).toContain('bg-transparent');
  });

  it('applies ghost variant', () => {
    const { container } = render(Select, { props: { options, variant: 'ghost' } });
    const select = container.querySelector('select')!;
    expect(select.className).toContain('border-transparent');
  });

  it('applies size classes', () => {
    const { container } = render(Select, { props: { options, size: 'lg' } });
    const select = container.querySelector('select')!;
    expect(select.className).toContain('py-2.5');
  });

  it('passes through custom class', () => {
    const { container } = render(Select, { props: { options, class: 'my-select' } });
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.className).toContain('my-select');
  });

  it('sets aria-describedby when error is present', () => {
    render(Select, { props: { options, error: 'Oops' } });
    const select = screen.getByRole('combobox');
    const descId = select.getAttribute('aria-describedby');
    expect(descId).toBeTruthy();
    const errorEl = document.getElementById(descId!);
    expect(errorEl?.textContent).toBe('Oops');
  });
});
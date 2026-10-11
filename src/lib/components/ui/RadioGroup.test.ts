import { render, screen, fireEvent } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import RadioGroup from './RadioGroup.svelte';

const options = [
  { value: 's', label: 'Small' },
  { value: 'm', label: 'Medium' },
  { value: 'l', label: 'Large', disabled: true },
];

describe('RadioGroup', () => {
  it('renders with role="radiogroup"', () => {
    render(RadioGroup, { props: { options } });
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
  });

  it('renders all radio inputs', () => {
    render(RadioGroup, { props: { options } });
    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(3);
  });

  it('renders option labels', () => {
    render(RadioGroup, { props: { options } });
    expect(screen.getByText('Small')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
    expect(screen.getByText('Large')).toBeInTheDocument();
  });

  it('checks the radio matching the value prop', () => {
    render(RadioGroup, { props: { options, value: 'm' } });
    const radios = screen.getAllByRole('radio') as HTMLInputElement[];
    expect(radios[0].checked).toBe(false);
    expect(radios[1].checked).toBe(true);
    expect(radios[2].checked).toBe(false);
  });

  it('selects a radio on click', async () => {
    const { component } = render(RadioGroup, { props: { options, value: '' } });
    const radios = screen.getAllByRole('radio') as HTMLInputElement[];
    await fireEvent.click(radios[0]);
    // Svelte bindable: value updates via onchange
    // We verify the input is now checked
    expect(radios[0].checked).toBe(true);
  });

  it('disables individual options', () => {
    render(RadioGroup, { props: { options } });
    const radios = screen.getAllByRole('radio') as HTMLInputElement[];
    expect(radios[2]).toBeDisabled();
    expect(radios[0]).not.toBeDisabled();
    expect(radios[1]).not.toBeDisabled();
  });

  it('applies variant classes', () => {
    render(RadioGroup, { props: { options, variant: 'brand' } });
    const radios = screen.getAllByRole('radio') as HTMLInputElement[];
    expect(radios[0].className).toContain('ca-brand');
  });

  it('applies size classes', () => {
    render(RadioGroup, { props: { options, size: 'lg' } });
    const radios = screen.getAllByRole('radio') as HTMLInputElement[];
    expect(radios[0].className).toContain('h-5');
  });

  it('associates label with radiogroup via aria-labelledby', () => {
    render(RadioGroup, { props: { options, label: 'Pick a size' } });
    const group = screen.getByRole('radiogroup');
    const labelId = group.getAttribute('aria-labelledby');
    expect(labelId).toBeTruthy();
    expect(document.getElementById(labelId!)?.textContent).toBe('Pick a size');
  });

  it('uses aria-label when no label prop', () => {
    render(RadioGroup, { props: { options } });
    expect(screen.getByRole('radiogroup')).toHaveAttribute('aria-label', 'Radio group');
  });

  it('passes through custom class', () => {
    const { container } = render(RadioGroup, { props: { options, class: 'my-rg' } });
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.className).toContain('my-rg');
  });

  it('applies horizontal orientation', () => {
    const { container } = render(RadioGroup, { props: { options, orientation: 'horizontal' } });
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.className).toContain('flex-row');
  });

  it('applies vertical orientation by default', () => {
    const { container } = render(RadioGroup, { props: { options } });
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.className).toContain('flex-col');
  });
});
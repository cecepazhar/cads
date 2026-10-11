import { render, screen, fireEvent } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import Checkbox from './Checkbox.svelte';

describe('Checkbox', () => {
  it('renders with role="checkbox"', () => {
    render(Checkbox);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('has aria-checked="false" by default', () => {
    render(Checkbox);
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'false');
  });

  it('has aria-checked="true" when checked', () => {
    render(Checkbox, { props: { checked: true } });
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'true');
  });

  it('has aria-checked="mixed" when indeterminate', () => {
    render(Checkbox, { props: { indeterminate: true } });
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'mixed');
  });

  it('toggles checked on click', async () => {
    const handleChange = vi.fn();
    render(Checkbox, { props: { onchange: handleChange } });
    const cb = screen.getByRole('checkbox');
    await fireEvent.click(cb);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('does not toggle when disabled', async () => {
    const handleChange = vi.fn();
    render(Checkbox, { props: { disabled: true, onchange: handleChange } });
    await fireEvent.click(screen.getByRole('checkbox'));
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('disables the checkbox button', () => {
    render(Checkbox, { props: { disabled: true } });
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('renders label text', () => {
    render(Checkbox, { props: { label: 'Accept terms' } });
    expect(screen.getByText('Accept terms')).toBeInTheDocument();
  });

  it('renders description and sets aria-describedby', () => {
    render(Checkbox, { props: { label: 'Opt in', description: 'You can opt out later' } });
    const cb = screen.getByRole('checkbox');
    const descId = cb.getAttribute('aria-describedby');
    expect(descId).toBeTruthy();
    expect(document.getElementById(descId!)?.textContent).toBe('You can opt out later');
  });

  it('does not set aria-describedby when no description', () => {
    render(Checkbox, { props: { label: 'No desc' } });
    expect(screen.getByRole('checkbox')).not.toHaveAttribute('aria-describedby');
  });

  it('applies variant classes', () => {
    render(Checkbox, { props: { variant: 'brand', checked: true } });
    const cb = screen.getByRole('checkbox');
    expect(cb.className).toContain('ca-brand');
  });

  it('applies size classes', () => {
    render(Checkbox, { props: { size: 'lg' } });
    const cb = screen.getByRole('checkbox');
    expect(cb.className).toContain('w-5');
  });

  it('passes through custom class on label', () => {
    const { container } = render(Checkbox, { props: { class: 'my-cb' } });
    const label = container.querySelector('label')!;
    expect(label.className).toContain('my-cb');
  });

  it('applies focus-visible classes', () => {
    render(Checkbox);
    const cb = screen.getByRole('checkbox');
    expect(cb.className).toContain('focus-visible:ring-2');
  });
});
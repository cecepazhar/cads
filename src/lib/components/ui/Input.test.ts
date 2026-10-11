import { render, screen, fireEvent } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import Input from './Input.svelte';

describe('Input', () => {
  it('renders default input', () => {
    render(Input);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).not.toBeDisabled();
  });

  // --- Variant matrix ---

  it.each(['primary', 'outline', 'ghost'] as const)('renders %s variant without error', (variant) => {
    render(Input, { props: { variant } });
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('applies primary variant classes', () => {
    render(Input, { props: { variant: 'primary' } });
    expect(screen.getByRole('textbox').className).toContain('border');
  });

  it('applies outline variant classes', () => {
    render(Input, { props: { variant: 'outline' } });
    expect(screen.getByRole('textbox').className).toContain('bg-transparent');
  });

  it('applies ghost variant classes', () => {
    render(Input, { props: { variant: 'ghost' } });
    const input = screen.getByRole('textbox');
    expect(input.className).toContain('bg-transparent');
    expect(input.className).toContain('border-transparent');
  });

  // --- Size matrix ---

  it.each(['sm', 'md', 'lg'] as const)('renders %s size without error', (size) => {
    render(Input, { props: { size } });
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('applies size-specific classes', () => {
    const { container: smContainer } = render(Input, { props: { size: 'sm' } });
    expect(smContainer.querySelector('input')!.className).toContain('py-1.5');

    const { container: lgContainer } = render(Input, { props: { size: 'lg' } });
    expect(lgContainer.querySelector('input')!.className).toContain('py-2.5');
  });

  // --- Label association ---

  it('associates label with input via for/id', () => {
    render(Input, { props: { id: 'email', label: 'Email address' } });
    const label = screen.getByText('Email address');
    expect(label).toHaveAttribute('for', 'email');
    const input = screen.getByLabelText('Email address');
    expect(input).toHaveAttribute('id', 'email');
  });

  // --- ARIA: error state ---

  it('sets aria-invalid when error is provided', () => {
    render(Input, { props: { error: 'Required field' } });
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('does not set aria-invalid when no error', () => {
    render(Input);
    expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-invalid');
  });

  it('sets aria-describedby linking to error message', () => {
    render(Input, { props: { error: 'Required field' } });
    const input = screen.getByRole('textbox');
    const describedBy = input.getAttribute('aria-describedby');
    expect(describedBy).toBeTruthy();
    const errorEl = document.getElementById(describedBy!);
    expect(errorEl).toHaveTextContent('Required field');
  });

  // --- Disabled ---

  it('disables input when disabled prop is true', () => {
    render(Input, { props: { disabled: true } });
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  // --- focus-visible ---

  it('has focus-visible ring classes', () => {
    render(Input);
    const input = screen.getByRole('textbox');
    expect(input.className).toContain('focus-visible:ring-2');
    expect(input.className).toContain('focus-visible:ring-offset-2');
  });

  // --- Event callbacks ---

  it('fires oninput callback', async () => {
    const oninput = vi.fn();
    render(Input, { props: { oninput } });
    const input = screen.getByRole('textbox');
    await fireEvent.input(input, { target: { value: 'hello' } });
    expect(oninput).toHaveBeenCalledOnce();
  });

  it('fires onkeydown callback', async () => {
    const onkeydown = vi.fn();
    render(Input, { props: { onkeydown } });
    await fireEvent.keyDown(screen.getByRole('textbox'), { key: 'a' });
    expect(onkeydown).toHaveBeenCalledOnce();
  });

  // --- Custom class passthrough ---

  it('applies custom class to wrapper div', () => {
    const { container } = render(Input, { props: { class: 'my-input-class' } });
    expect(container.firstChild as HTMLElement).toHaveAttribute('class', expect.stringContaining('my-input-class'));
  });

  // --- Token compliance ---

  it('does not contain hex color values in rendered DOM', () => {
    const { container } = render(Input);
    expect(container.innerHTML).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });
});
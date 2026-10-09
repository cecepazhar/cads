import { render, fireEvent } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import Button from './Button.svelte';

describe('Button', () => {
  it('renders with default props', () => {
    const { getByRole } = render(Button);
    const button = getByRole('button');

    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
    // default variant is 'secondary', default size is 'md'
    expect(button.className).toContain('px-3.5');
  });

  it('applies variant classes', () => {
    const { getByRole } = render(Button, { props: { variant: 'danger' } });
    const button = getByRole('button');

    expect(button.className).toContain('rose');
  });

  it('applies primary variant', () => {
    const { getByRole } = render(Button, { props: { variant: 'primary' } });
    const button = getByRole('button');

    expect(button.className).toContain('bg-white');
  });

  it('disables when disabled prop is true', () => {
    const { getByRole } = render(Button, { props: { disabled: true } });
    expect(getByRole('button')).toBeDisabled();
  });

  it('disables when loading prop is true', () => {
    const { getByRole } = render(Button, { props: { loading: true } });
    expect(getByRole('button')).toBeDisabled();
  });

  it('fires onclick handler', async () => {
    const handleClick = vi.fn();
    const { getByRole } = render(Button, { props: { onclick: handleClick } });

    await fireEvent.click(getByRole('button'));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('applies size classes', () => {
    const { getByRole } = render(Button, { props: { size: 'sm' } });
    expect(getByRole('button').className).toContain('px-2.5');
  });
});

import { render, screen, fireEvent } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import Alert from './Alert.svelte';

describe('Alert', () => {
  it('renders with default variant (info)', () => {
    render(Alert);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  // --- Variant matrix ---

  it.each(['neutral', 'info', 'success', 'warning', 'danger'] as const)(
    'renders %s variant without error',
    (variant) => {
      render(Alert, { props: { variant } });
      expect(screen.getByRole('alert')).toBeInTheDocument();
    }
  );

  it('resolves deprecated "error" alias to "danger"', () => {
    render(Alert, { props: { variant: 'error' } });
    const alert = screen.getByRole('alert');
    expect(alert.className).toContain('rose');
  });

  it('applies danger variant classes', () => {
    render(Alert, { props: { variant: 'danger' } });
    expect(screen.getByRole('alert').className).toContain('rose');
  });

  it('applies success variant classes', () => {
    render(Alert, { props: { variant: 'success' } });
    expect(screen.getByRole('alert').className).toContain('emerald');
  });

  // --- Size matrix ---

  it.each(['sm', 'md', 'lg'] as const)('renders %s size without error', (size) => {
    render(Alert, { props: { size } });
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('applies sm size padding', () => {
    render(Alert, { props: { size: 'sm' } });
    expect(screen.getByRole('alert').className).toContain('p-2.5');
  });

  it('applies lg size padding', () => {
    render(Alert, { props: { size: 'lg' } });
    expect(screen.getByRole('alert').className).toContain('p-4');
  });

  // --- role="alert" and aria-live ---

  it('has role="alert"', () => {
    render(Alert);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('uses aria-live="assertive" for danger variant', () => {
    render(Alert, { props: { variant: 'danger' } });
    expect(screen.getByRole('alert')).toHaveAttribute('aria-live', 'assertive');
  });

  it('uses aria-live="assertive" for error alias', () => {
    render(Alert, { props: { variant: 'error' } });
    expect(screen.getByRole('alert')).toHaveAttribute('aria-live', 'assertive');
  });

  it('uses aria-live="polite" for non-danger variants', () => {
    render(Alert, { props: { variant: 'info' } });
    expect(screen.getByRole('alert')).toHaveAttribute('aria-live', 'polite');
  });

  // --- Title and description ---

  it('renders title and description', () => {
    render(Alert, { props: { title: 'Heads up!', description: 'Something happened.' } });
    expect(screen.getByText('Heads up!')).toBeInTheDocument();
    expect(screen.getByText('Something happened.')).toBeInTheDocument();
  });

  // --- Dismissible ---

  it('renders dismiss button when dismissible is true', () => {
    render(Alert, { props: { dismissible: true } });
    expect(screen.getByRole('button', { name: 'Dismiss alert' })).toBeInTheDocument();
  });

  it('does not render dismiss button when dismissible is false', () => {
    render(Alert, { props: { dismissible: false } });
    expect(screen.queryByRole('button', { name: 'Dismiss alert' })).not.toBeInTheDocument();
  });

  it('dismisses the alert and calls ondismiss', async () => {
    const ondismiss = vi.fn();
    render(Alert, { props: { dismissible: true, ondismiss } });
    await fireEvent.click(screen.getByRole('button', { name: 'Dismiss alert' }));
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(ondismiss).toHaveBeenCalledOnce();
  });

  // --- Custom class passthrough ---

  it('applies custom class passthrough', () => {
    render(Alert, { props: { class: 'my-alert' } });
    expect(screen.getByRole('alert').className).toContain('my-alert');
  });

  // --- Token compliance ---

  it('does not contain hex color values in rendered DOM', () => {
    const { container } = render(Alert);
    expect(container.innerHTML).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });
});
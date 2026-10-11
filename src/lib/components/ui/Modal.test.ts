import { render, screen, fireEvent } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import Modal from './Modal.svelte';

describe('Modal', () => {
  // --- Open / Closed ---

  it('does not render when open is false (default)', () => {
    render(Modal);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders when open is true', () => {
    render(Modal, { props: { open: true } });
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  // --- ARIA roles and attributes ---

  it('has role="dialog" and aria-modal="true"', () => {
    render(Modal, { props: { open: true } });
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  it('sets aria-labelledby when title is provided', () => {
    render(Modal, { props: { open: true, title: 'Settings' } });
    const dialog = screen.getByRole('dialog', { name: 'Settings' });
    expect(dialog).toHaveAttribute('aria-labelledby');
    const labelledBy = dialog.getAttribute('aria-labelledby');
    expect(document.getElementById(labelledBy!)).toHaveTextContent('Settings');
  });

  it('does not set aria-labelledby when no title', () => {
    render(Modal, { props: { open: true } });
    expect(screen.getByRole('dialog')).not.toHaveAttribute('aria-labelledby');
  });

  // --- Escape closes ---

  it('closes when Escape is pressed', async () => {
    const onclose = vi.fn();
    render(Modal, { props: { open: true, title: 'Test', onclose } });
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(onclose).toHaveBeenCalledOnce();
  });

  it('does not close on Escape when closeOnEsc is false', async () => {
    render(Modal, { props: { open: true, closeOnEsc: false } });
    await fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  // --- Backdrop click ---

  it('closes when backdrop is clicked', async () => {
    const onclose = vi.fn();
    render(Modal, { props: { open: true, onclose } });
    const dialog = screen.getByRole('dialog');
    // The backdrop is the dialog overlay (the div with role="dialog")
    await fireEvent.click(dialog);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(onclose).toHaveBeenCalledOnce();
  });

  it('does not close on backdrop click when closeOnBackdrop is false', async () => {
    render(Modal, { props: { open: true, closeOnBackdrop: false } });
    await fireEvent.click(screen.getByRole('dialog'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  // --- Close button ---

  it('renders close button and it closes the modal', async () => {
    const onclose = vi.fn();
    render(Modal, { props: { open: true, title: 'Test', onclose } });
    const closeBtn = screen.getByRole('button', { name: 'Close' });
    expect(closeBtn).toBeInTheDocument();
    await fireEvent.click(closeBtn);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(onclose).toHaveBeenCalledOnce();
  });

  // --- Focus trap ---

  it('traps focus inside the dialog (Tab stays within)', async () => {
    render(Modal, { props: { open: true, title: 'Trap' } });
    const dialog = screen.getByRole('dialog');
    // focusTrap action should focus the dialog node on mount
    expect(document.activeElement).toBe(dialog);
    // Tab should keep focus within dialog (prevented default)
    const defaultPrevented = !(await fireEvent.keyDown(document, { key: 'Tab' }));
    expect(defaultPrevented).toBe(true);
    expect(dialog.contains(document.activeElement) || document.activeElement === dialog).toBe(true);
  });

  it('focuses the dialog node on open (initial focus)', () => {
    render(Modal, { props: { open: true } });
    const dialog = screen.getByRole('dialog');
    expect(document.activeElement).toBe(dialog);
  });

  // --- Return focus on close ---

  it('returns focus to previously focused element on close', async () => {
    const trigger = document.createElement('button');
    trigger.textContent = 'Open';
    document.body.appendChild(trigger);
    trigger.focus();

    const onclose = vi.fn();
    render(Modal, { props: { open: true, title: 'Test', onclose } });
    expect(document.activeElement).toBe(screen.getByRole('dialog'));

    await fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(document.activeElement).toBe(trigger);

    trigger.remove();
  });

  // --- Custom class passthrough ---

  it('applies custom class to inner content panel', () => {
    render(Modal, { props: { open: true, class: 'my-modal-class' } });
    const dialog = screen.getByRole('dialog');
    const innerPanel = dialog.firstElementChild!;
    expect(innerPanel.className).toContain('my-modal-class');
  });

  // --- Token compliance ---

  it('does not contain hex color values in rendered DOM', () => {
    const { container } = render(Modal, { props: { open: true, title: 'T' } });
    expect(container.innerHTML).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });
});
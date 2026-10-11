import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import ProgressBar from './ProgressBar.svelte';

describe('ProgressBar', () => {
  it('renders with role="progressbar"', () => {
    render(ProgressBar);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('has aria-valuenow matching value prop', () => {
    render(ProgressBar, { props: { value: 42 } });
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '42');
  });

  it('defaults aria-valuenow to 0', () => {
    render(ProgressBar);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
  });

  it('has aria-valuemin=0', () => {
    render(ProgressBar);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemin', '0');
  });

  it('has aria-valuemax matching max prop', () => {
    render(ProgressBar, { props: { max: 200 } });
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemax', '200');
  });

  it('defaults aria-valuemax to 100', () => {
    render(ProgressBar);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemax', '100');
  });

  it('has aria-label matching label prop', () => {
    render(ProgressBar, { props: { label: 'Upload progress' } });
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-label', 'Upload progress');
  });

  it('defaults aria-label to "Progress"', () => {
    render(ProgressBar);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-label', 'Progress');
  });

  it('shows label and percentage when showLabel is true', () => {
    render(ProgressBar, { props: { value: 50, showLabel: true, label: 'Download' } });
    expect(screen.getByText('Download')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('does not show label by default', () => {
    render(ProgressBar, { props: { value: 75 } });
    expect(screen.queryByText('75%')).not.toBeInTheDocument();
  });

  it('applies variant classes', () => {
    const { container } = render(ProgressBar, { props: { variant: 'success' } });
    const bar = container.querySelector('[style]')!;
    expect(bar.className).toContain('ca-success');
  });

  it('applies size classes', () => {
    const { container } = render(ProgressBar, { props: { size: 'lg' } });
    const track = container.querySelector('.rounded-full')!;
    expect(track.className).toContain('h-3');
  });

  it('applies sm size classes', () => {
    const { container } = render(ProgressBar, { props: { size: 'sm' } });
    const track = container.querySelector('.rounded-full')!;
    expect(track.className).toContain('h-1');
  });

  it('clamps percentage to 0-100', () => {
    render(ProgressBar, { props: { value: 150, max: 100, showLabel: true } });
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('passes through custom class', () => {
    const { container } = render(ProgressBar, { props: { class: 'my-bar' } });
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.className).toContain('my-bar');
  });
});
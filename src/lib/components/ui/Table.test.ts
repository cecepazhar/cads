import { render, screen, fireEvent } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import Table from './Table.svelte';

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'age', label: 'Age' },
];

const data = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
];

describe('Table', () => {
  it('renders data cells', () => {
    render(Table, { props: { columns, data } });
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('renders with custom caption as accessible name', () => {
    render(Table, { props: { columns, data, caption: 'Users' } });
    expect(screen.getByRole('table', { name: 'Users' })).toBeInTheDocument();
  });

  it('uses default caption when none provided', () => {
    render(Table, { props: { columns, data } });
    expect(screen.getByRole('table', { name: 'Data table' })).toBeInTheDocument();
  });

  // --- Sortable header + aria-sort ---

  it('toggles sort direction on click and updates aria-sort', async () => {
    render(Table, { props: { columns, data } });
    const sortBtn = screen.getByRole('button', { name: /Name/i });
    const th = sortBtn.closest('th')!;

    // Initial state: aria-sort="none" for sortable column
    expect(th).toHaveAttribute('aria-sort', 'none');

    // First click: ascending
    await fireEvent.click(sortBtn);
    expect(th).toHaveAttribute('aria-sort', 'ascending');

    // Second click: descending
    await fireEvent.click(sortBtn);
    expect(th).toHaveAttribute('aria-sort', 'descending');
  });

  it('fires onSort callback', async () => {
    const onSort = vi.fn();
    render(Table, { props: { columns, data, onSort } });
    const sortBtn = screen.getByRole('button', { name: /Name/i });

    await fireEvent.click(sortBtn);
    expect(onSort).toHaveBeenCalledWith('name', 'asc');

    await fireEvent.click(sortBtn);
    expect(onSort).toHaveBeenCalledWith('name', 'desc');
  });

  it('sort button is a native <button> element (keyboard-activatable)', () => {
    render(Table, { props: { columns, data } });
    const sortBtn = screen.getByRole('button', { name: /Name/i });
    expect(sortBtn.tagName).toBe('BUTTON');
    expect(sortBtn).toHaveAttribute('type', 'button');
  });

  // --- aria-busy loading ---

  it('sets aria-busy on the table when loading', () => {
    render(Table, { props: { columns, data, loading: true } });
    expect(screen.getByRole('table')).toHaveAttribute('aria-busy', 'true');
  });

  it('does not set aria-busy when not loading', () => {
    render(Table, { props: { columns, data } });
    expect(screen.getByRole('table')).not.toHaveAttribute('aria-busy');
  });

  // --- Variant ---

  it.each(['primary', 'outline'] as const)('renders %s variant without error', (variant) => {
    render(Table, { props: { columns, data, variant } });
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  // --- Size ---

  it.each(['sm', 'md', 'lg'] as const)('renders %s size without error', (size) => {
    render(Table, { props: { columns, data, size } });
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  // --- Empty state ---

  it('shows empty text when data is empty', () => {
    render(Table, { props: { columns, data: [], emptyText: 'Nothing here' } });
    expect(screen.getByText('Nothing here')).toBeInTheDocument();
  });

  // --- onRowClick ---

  it('fires onRowClick when a row is clicked', async () => {
    const onRowClick = vi.fn();
    render(Table, { props: { columns, data, onRowClick } });
    const rows = screen.getAllByRole('row');
    // rows[0] is header, rows[1] is first data row
    await fireEvent.click(rows[1]);
    expect(onRowClick).toHaveBeenCalledWith(data[0]);
  });

  it('fires onRowClick via keyboard Enter on a row', async () => {
    const onRowClick = vi.fn();
    render(Table, { props: { columns, data, onRowClick } });
    const dataRow = screen.getAllByRole('row')[1];
    dataRow.focus();
    await fireEvent.keyDown(dataRow, { key: 'Enter' });
    expect(onRowClick).toHaveBeenCalledWith(data[0]);
  });

  it('fires onRowClick via keyboard Space on a row', async () => {
    const onRowClick = vi.fn();
    render(Table, { props: { columns, data, onRowClick } });
    const dataRow = screen.getAllByRole('row')[1];
    dataRow.focus();
    await fireEvent.keyDown(dataRow, { key: ' ' });
    expect(onRowClick).toHaveBeenCalledWith(data[0]);
  });

  // --- Custom class passthrough ---

  it('applies custom class passthrough', () => {
    const { container } = render(Table, { props: { columns, data, class: 'my-table' } });
    expect((container.firstChild as HTMLElement).className).toContain('my-table');
  });

  // --- Token compliance ---

  it('does not contain hex color values in rendered DOM', () => {
    const { container } = render(Table, { props: { columns, data } });
    expect(container.innerHTML).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });
});
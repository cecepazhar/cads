/**
 * CAUI shared API vocabulary (v1.1.0).
 *
 * Every component declares the subset of these vocabularies it supports via
 * `Extract<...>` aliases (see VARIANT_SPEC.md). Naming is uniform across the
 * whole design system — semantic colors are shared, layout-style variants are
 * component-specific (e.g. Tabs: 'underline' | 'pills' | 'segmented').
 */

/** Semantic + style variants shared by all components. */
export type ComponentVariant =
	| 'primary'
	| 'secondary'
	| 'outline'
	| 'ghost'
	| 'brand'
	| 'neutral'
	| 'info'
	| 'success'
	| 'warning'
	| 'danger';

/** Shared size scale. Components use a subset of this scale. */
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon';

/** Visual/interactive state matrix every interactive component must cover. */
export type ComponentState =
	| 'default'
	| 'hover'
	| 'active'
	| 'focus'
	| 'disabled'
	| 'loading'
	| 'error'
	| 'success';

/** Status-only variant subset (Alert, Toast, Badge status styles). */
export type StatusVariant = Extract<ComponentVariant, 'info' | 'success' | 'warning' | 'danger'>;

/** Base props every CAUI component accepts. */
export interface BaseComponentProps {
	class?: string;
}

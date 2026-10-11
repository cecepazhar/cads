// CA Design System (CAUI) - Svelte 5 Library
export * from './components/ui';
export * from './components/templates';
export * from './i18n.svelte';
export * from './theme';
import './tokens/tokens.css';

// Shared type vocabulary
export type {
	ComponentVariant,
	ComponentSize,
	ComponentState,
	StatusVariant,
	BaseComponentProps
} from './components/ui/types';

// Accessibility utilities
export { focusTrap, clickOutside, uid } from './utils/a11y';

// Color palette data
export {
	DEFAULT_COLOR_PRESETS,
	ACCENT_SWATCHES,
	type ColorPreset,
	type AccentSwatch
} from './tokens/palettes';

/**
 * CAUI color palette DATA (not theme tokens).
 * Used by ColorPicker presets & ThemeSwitcher accents.
 */

export interface ColorPreset {
	name: string;
	hex: string;
}

export interface AccentSwatch {
	name: string;
	hex: string;
}

/** Default color picker presets (moved from ColorPicker.svelte). */
export const DEFAULT_COLOR_PRESETS: ColorPreset[] = [
	{ name: 'Gray', hex: '#71717a' },
	{ name: 'Red', hex: '#ef4444' },
	{ name: 'Cyan', hex: '#06b6d4' },
	{ name: 'Green', hex: '#10b981' },
	{ name: 'Purple', hex: '#8b5cf6' },
	{ name: 'Yellow', hex: '#eab308' },
	{ name: 'Blue', hex: '#3b82f6' }
];

/** App accent swatches for ThemeSwitcher (17 CA apps). */
export const ACCENT_SWATCHES: AccentSwatch[] = [
	{ name: 'Monochrome (Zinc)', hex: '#71717a' },
	{ name: 'Cyan (CATerm / CAMark)', hex: '#06b6d4' },
	{ name: 'Emerald (CACash)', hex: '#10b981' },
	{ name: 'Violet (CAStudio)', hex: '#8b5cf6' },
	{ name: 'Rose (Alert)', hex: '#f43f5e' },
	{ name: 'Blue (Core)', hex: '#3b82f6' }
];
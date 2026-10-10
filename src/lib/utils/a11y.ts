/**
 * CAUI shared accessibility utilities — focus trap, click-outside, id generator.
 * Used by overlay/dialog/menu components per WAI-ARIA 1.2 patterns.
 */

const FOCUSABLE_SELECTOR = [
	'a[href]',
	'button:not([disabled])',
	'textarea:not([disabled])',
	'input:not([disabled]):not([type="hidden"])',
	'select:not([disabled])',
	'[tabindex]:not([tabindex="-1"])'
].join(',');

function getFocusable(node: HTMLElement): HTMLElement[] {
	return Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
		(el) => el.offsetParent !== null || el === document.activeElement
	);
}

export interface FocusTrapOptions {
	/** Called when Escape is pressed inside the trap. */
	onEscape?: () => void;
	/** Restore focus to the previously focused element on destroy. Default: true. */
	returnFocus?: boolean;
	/** Element to focus on activation. Default: first focusable in node. */
	initialFocus?: HTMLElement | null;
}

/**
 * Svelte action: traps Tab focus inside `node` (WCAG 2.4.3 / 2.1.2),
 * handles Escape, and returns focus to the trigger on destroy.
 *
 * Usage: `<div use:focusTrap={{ onEscape: close }}>`
 */
export function focusTrap(node: HTMLElement, options: FocusTrapOptions = {}) {
	let opts = options;
	const previous = document.activeElement as HTMLElement | null;

	function onKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && opts.onEscape) {
			event.stopPropagation();
			opts.onEscape();
			return;
		}
		if (event.key !== 'Tab') return;

		const items = getFocusable(node);
		if (items.length === 0) {
			event.preventDefault();
			node.focus();
			return;
		}
		const first = items[0];
		const last = items[items.length - 1];
		const active = document.activeElement;

		if (event.shiftKey) {
			if (active === first || !node.contains(active)) {
				event.preventDefault();
				last.focus();
			}
		} else if (active === last || !node.contains(active)) {
			event.preventDefault();
			first.focus();
		}
	}

	function onFocusIn(event: FocusEvent) {
		if (!node.contains(event.target as Node)) {
			const items = getFocusable(node);
			(items[0] ?? node).focus();
		}
	}

	(opts.initialFocus ?? getFocusable(node)[0] ?? node).focus();
	document.addEventListener('keydown', onKeydown, true);
	document.addEventListener('focusin', onFocusIn, true);

	return {
		update(newOpts: FocusTrapOptions) {
			opts = newOpts;
		},
		destroy() {
			document.removeEventListener('keydown', onKeydown, true);
			document.removeEventListener('focusin', onFocusIn, true);
			if (opts.returnFocus !== false && previous && document.contains(previous)) {
				previous.focus();
			}
		}
	};
}

/**
 * Svelte action: invokes `handler` when a pointer event occurs outside `node`.
 *
 * Usage: `<div use:clickOutside={() => (open = false)}>`
 */
export function clickOutside(node: HTMLElement, handler: () => void) {
	function onPointerDown(event: PointerEvent) {
		if (!node.contains(event.target as Node)) handler();
	}
	// Deferred so the opening click doesn't immediately close the overlay.
	setTimeout(() => document.addEventListener('pointerdown', onPointerDown, true), 0);

	return {
		destroy() {
			document.removeEventListener('pointerdown', onPointerDown, true);
		}
	};
}

let idCounter = 0;

/** Stable DOM id generator for aria-controls / aria-labelledby wiring. */
export function uid(prefix = 'ca'): string {
	idCounter += 1;
	return `${prefix}-${idCounter}`;
}

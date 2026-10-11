import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
	plugins: [svelte({ hot: !process.env.VITEST })],
	test: {
		include: ['src/**/*.test.{js,ts}'],
		environment: 'jsdom',
		globals: true,
		setupFiles: ['./src/tests/setup.ts'],
		coverage: {
			provider: 'v8',
			include: ['src/lib/components/ui/**/*.svelte', 'src/lib/utils/**/*.ts', 'src/lib/tokens/**/*.ts'],
			exclude: ['src/**/*.test.{js,ts}', 'src/tests/**', 'src/lib/tokens/palettes.ts'],
			thresholds: {
				statements: 80,
				branches: 80,
				functions: 80,
				lines: 80
			}
		}
	},
	resolve: {
		conditions: ['mode=test', 'browser', 'development']
	}
});

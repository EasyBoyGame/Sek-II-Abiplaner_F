import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		proxy: {
			'/realms': {
				target: 'http://127.0.0.1:9090',
				changeOrigin: true
			},
			'/resources': {
				target: 'http://127.0.0.1:9090',
				changeOrigin: true
			},
			'/api': {
				target: 'http://127.0.0.1:8080',
				changeOrigin: true,
			},
		}
	},
});


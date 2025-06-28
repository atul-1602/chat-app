import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000,
		proxy: {
			"/api": {
				target: "http://localhost:5000",
				changeOrigin: true,
				secure: false,
			},
		},
	},
	build: {
		outDir: 'dist',
		sourcemap: false,
		minify: 'esbuild',
		target: 'es2015',
		rollupOptions: {
			output: {
				manualChunks: {
					vendor: ['react', 'react-dom'],
					router: ['react-router-dom'],
				},
			},
		},
		// Fix for Vercel build issues
		commonjsOptions: {
			include: [/node_modules/],
		},
	},
	// Optimize for Vercel
	optimizeDeps: {
		include: ['react', 'react-dom', 'react-router-dom'],
	},
});
/** @type {import('tailwindcss').Config} */
const { addDynamicIconSelectors } = require('@iconify/tailwind')
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
	},
	daisyui: {
		themes: [
			{
				mytheme: {
					"primary": "#4ade80",
					"secondary": "#B4FA72",
					"accent": "#2dd4bf",
					"neutral": "#111418",
					"base-100": "#0C0F11",
					"info": "#22d3ee",
					"success": "#00ff00",
					"warning": "#fbbf24",
					"error": "#dc2626",
				},
			},
		]
	},
	plugins: [require('daisyui'), addDynamicIconSelectors()],
}

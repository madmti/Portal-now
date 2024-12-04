// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import vercel from '@astrojs/vercel';

import preact from '@astrojs/preact';

export default defineConfig({
    site: import.meta.env.PUBLIC_VERCEL_URL,
    trailingSlash: 'always',
    integrations: [tailwind(), preact()],
    output: 'server',
    adapter: vercel(),
});
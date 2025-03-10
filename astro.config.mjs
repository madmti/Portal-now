// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import vercel from '@astrojs/vercel';

import preact from '@astrojs/preact';

import db from '@astrojs/db';
import pluginsIntegration from './integrations/build_plugins';

export default defineConfig({
    site: import.meta.env.PUBLIC_VERCEL_URL,
    trailingSlash: 'always',
    integrations: [tailwind(), preact(), db(), pluginsIntegration()],
    output: 'server',
    adapter: vercel(),
});
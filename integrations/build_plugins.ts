import { resolve } from 'path';
import { writeFile, readFile } from 'fs/promises';
import { plugins as plugins_config } from '../src/lib/plugins.ts';

const plugins = Object.fromEntries(
  Object.entries(plugins_config).map(([pluginId, plugin]) => {
    return [
      pluginId,
      {
        component: plugin.component
          ? resolve('src/plugins', plugin.component)
          : undefined,
        settings: plugin.settings
          ? resolve('src/plugins', plugin.settings)
          : undefined,
      },
    ];
  })
);

export default function pluginsIntegration() {
  return {
    name: 'astro-plugins-integration',
    hooks: {
      'astro:build:setup': async ({ vite, logger }:any) => {
        vite.build = vite.build || {};
        vite.build.rollupOptions = vite.build.rollupOptions || {};
        vite.build.rollupOptions.input = {
          ...vite.build.rollupOptions.input,
          ...Object.fromEntries(
            //@ts-ignore
            Object.entries(plugins).flatMap(([pluginId, paths]) => [
              paths.component ? [pluginId, paths.component] : null,
              paths.settings
                ? [`${pluginId}_settings`, paths.settings]
                : null,
            ].filter(Boolean))
          ),
        };

        logger.info('✅ Plugins y configuraciones registrados para la compilación.');
      },

      'astro:build:done': async ({ dir, logger }:any) => {
        const pluginsDir = resolve(dir.pathname, 'plugins');
        const outputDir = resolve('public/plugins');

        for (const [pluginName, paths] of Object.entries(plugins)) {
          if (paths.component) {
            const componentInputPath = resolve(pluginsDir, `${pluginName}.js`);
            const componentOutputPath = resolve(outputDir, `${pluginName}.js`);
            await writeFile(
              componentOutputPath,
              await readFile(componentInputPath),
              'utf-8'
            );
          }

          if (paths.settings) {
            const settingsInputPath = resolve(
              pluginsDir,
              `${pluginName}_settings.js`
            );
            const settingsOutputPath = resolve(
              outputDir,
              `${pluginName}_settings.js`
            );
            await writeFile(
              settingsOutputPath,
              await readFile(settingsInputPath),
              'utf-8'
            );
          }
        }

        logger.info('📦 Plugins y configuraciones generados y movidos a /public/plugins');
      },
    },
  };
}

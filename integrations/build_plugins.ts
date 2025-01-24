import { resolve } from 'path';
import { plugins as plugins_config } from '../src/lib/plugins.ts';
import { createClient } from '@libsql/client';

const db = createClient({
  url: import.meta.env.VITE_DB_REMOTE_URL ?? '',
  authToken: import.meta.env.VITE_DB_APP_TOKEN ?? '',
});

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
      'astro:build:setup': async ({ vite, logger }: any) => {
        vite.build = vite.build || {};
        vite.build.rollupOptions = vite.build.rollupOptions || {};
        vite.build.rollupOptions.input = {
          ...vite.build.rollupOptions.input,
          ...Object.fromEntries(
            //@ts-ignore
            Object.entries(plugins).flatMap(([pluginId, paths]) => [
              paths.component ? [`plugin_component_${pluginId}`, paths.component] : null,
              paths.settings
                ? [`plugin_component_${pluginId}_settings`, paths.settings]
                : null,
            ].filter(Boolean))
          ),
        };

        await db.execute("DELETE FROM PluginsPath");

        vite.build.rollupOptions.plugins = [
          ...(vite.build.rollupOptions.plugins || []),
          {
            name: 'capture-output-names',
            // @ts-ignore
            async generateBundle(outputOptions, bundle) {
              const outputMap = {};
              for (const [fileName, assetInfo] of Object.entries(bundle)) {
                //@ts-ignore
                if (assetInfo.type === 'chunk') {
                  if (fileName.endsWith('.mjs') || !fileName.startsWith('_astro') || !fileName.includes('plugin_component')) continue;
                  //@ts-ignore
                  outputMap[assetInfo.name] = fileName;
                }
              }
              for (const [pluginId, path] of Object.entries(outputMap)) {
                console.log(pluginId, path);
                await db.execute({
                  sql: "INSERT INTO PluginsPath VALUES ($1, $2)",
                  args: [pluginId, path as string]
                });
              }
            },
          },
        ];


        logger.info('✅ Plugins y configuraciones registrados para la compilación.');
      },
    },
  };
}

import { resolve } from 'path';
import { writeFile, readFile, mkdir } from 'fs/promises';
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
      'astro:build:setup': async ({ vite, logger }: any) => {
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
                  //@ts-ignore
                  outputMap[assetInfo.name] = fileName;
                }
              }
              process.env.PUBLIC_OUTPUT_MAP = JSON.stringify(outputMap);
              /* await writeFile(resolve('../','output', 'output-map.json'), JSON.stringify(outputMap, null, 2)); */
            },
          },
        ];

        logger.info('✅ Plugins y configuraciones registrados para la compilación.');
      },

      /* 'astro:build:done': async ({ dir, logger }: any) => {
        await mkdir(resolve(dir.pathname, '../','output', 'plugins'), { recursive: true });
        const outputDir = resolve(dir.pathname, '../','output', 'plugins');
        const outputMap = JSON.parse(await readFile(resolve('../','output', 'output-map.json'), 'utf-8'));

        for (const [pluginId, paths] of Object.entries(plugins)) {
          const pluginCompiledPath = outputMap[pluginId];
          if (paths.component) {
            const componentInputPath = resolve(dir.pathname, pluginCompiledPath);
            const componentOutputPath = resolve(outputDir, `${pluginId}.js`);
            await writeFile(
              componentOutputPath,
              await readFile(componentInputPath),
              'utf-8'
            );
          }

          const settingsCompiledPath = outputMap[`${pluginId}_settings`];
          if (paths.settings) {
            const settingsInputPath = resolve(dir.pathname, settingsCompiledPath);
            const settingsOutputPath = resolve(
              outputDir,
              `${pluginId}_settings.js`
            );
            await writeFile(
              settingsOutputPath,
              await readFile(settingsInputPath),
              'utf-8'
            );
          }
        }

        logger.info('📦 Plugins y configuraciones generados y movidos a /public/plugins');
      }, */
    },
  };
}

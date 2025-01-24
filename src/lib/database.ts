import { db, PluginsPath, PluginStorage, sql } from "astro:db";
import { plugins, type tPlugin } from "./plugins";

export async function getPluginStorage(user_uid: string) {
    const plugins_storages = await db.select({
        storage_group: PluginStorage.storage_group,
        data: PluginStorage.data,
    })
        .from(PluginStorage)
        .where(sql`user_uid = ${user_uid}`);

    return Object.fromEntries(plugins_storages.map(({ storage_group, data }) => [storage_group, data]));
}

export async function getPluginsPaths(plugin_ids: string[]) {
    const query = sql`id in (${plugin_ids.join(', ')})`;
    const plugins_paths = await db.select().from(PluginsPath).where(query);
    return plugins_paths.reduce((acc, plugin_path) => {
        acc[plugin_path.id] = plugin_path.path;
        return acc;
    }, {} as Record<string, string>);
}

export async function getPlugins({ on_production, on_settings, user_plugins }: {
    on_production?: boolean;
    on_settings?: boolean;
    user_plugins?: string[];
}): Promise<tPlugin[]> {
    const section_plugins = user_plugins || [];

    if (!on_production) {
        return section_plugins.map((plugin_id) => plugins[plugin_id]);
    }

    const plugin_db_ids = section_plugins.map((plugin_id) => `plugin_component_${plugin_id}${on_settings ? '_settings' : ''}`);
    const plugins_paths = await getPluginsPaths(plugin_db_ids);
    return section_plugins.map((plugin_id) => {
        const plugin_db_id = `plugin_component_${plugin_id}${on_settings ? '_settings' : ''}`;
        const plugin_path = plugins_paths[plugin_db_id];
        const plugin = plugins[plugin_id];
        return {
            ...plugin,
            [on_settings ? 'settings' : 'component']: `/${plugin_path}`,
        }
    }).filter((plug) => on_settings ? plug.settings !== '/undefined' : plug.component !== '/undefined');
}

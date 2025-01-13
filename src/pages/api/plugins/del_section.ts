import { plugins } from "@lib/plugins";
import type { APIRoute } from "astro";
import { db, PluginStorage, sql, Users } from "astro:db";

function sameStorageGroup(storage_group: string, plugins_dist: Record<string, string[]>, uniquePlugins: Set<string>): boolean {
    for (const plugin_id of uniquePlugins) {
        const plugin = plugins[plugin_id];
        if (plugin.storage_group === storage_group) {
            return true;
        }
    }
    return false;
}

export const POST: APIRoute = async ({ request, locals, redirect }) => {
    const formData = await request.formData();
    const section_name = formData.get('section_name') as string;
    const { uid: user_uid, plugins: plugins_dist } = locals.user;

    const deleted_plugins = plugins_dist[section_name];
    delete plugins_dist[section_name];

    const storage_groups = new Set<string>();
    for (const plugin_id of deleted_plugins) {
        const plugin = plugins[plugin_id];
        if (plugin.storage_group) {
            storage_groups.add(plugin.storage_group);
        }
    }
    const uniquePlugins = new Set(Object.values(plugins_dist).flat());

    for (const storage_group of storage_groups) {
        if (sameStorageGroup(storage_group, plugins_dist, uniquePlugins)) {
            continue;
        }

        try {
            await db.delete(PluginStorage).where(sql`user_uid = ${user_uid} AND storage_group = ${storage_group}`);
        } catch (e) {
            console.error(e);
        }
    }

    try {
        await db.update(Users).set({ plugins_dist }).where(sql`id = ${user_uid}`);
    } catch (e) {
        console.error(e);
    }

    return redirect('/home/settings/');
};
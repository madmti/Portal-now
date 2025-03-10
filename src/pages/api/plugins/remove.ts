import { plugins } from "@lib/plugins";
import type { APIRoute } from "astro";
import { db, PluginStorage, sql, Users } from "astro:db";

export const POST: APIRoute = async ({ request, locals, redirect }) => {
    const formData = await request.formData();
    const plugin_id = formData.get("plugin_id")?.toString();
    const storage_group = formData.get("storage_group")?.toString();
    const section_name = formData.get("section_name")?.toString();
    const user_uid = locals.user.uid;
    const plugins_dist = locals.user.plugins;

    if (!section_name || !plugin_id) {
        return redirect('/home/settings/');
    }

    const plugin_idx = plugins_dist[section_name].indexOf(plugin_id);
    if (plugin_idx === -1) {
        return redirect('/home/settings/');
    }

    plugins_dist[section_name].splice(plugin_idx, 1);

    try {
        await db.update(Users).set({ plugins_dist }).where(sql`id = ${user_uid}`);
    } catch (e) {
        console.error(e);
        return redirect('/home/settings/');
    }

    if (!storage_group) {
        return redirect('/home/settings/');
    }

    // Check if another plugin is using the same storage group
    const uniquePlugins = new Set(Object.values(plugins_dist).flat());
    for (const plugin_id of uniquePlugins) {
        const plugin = plugins[plugin_id];
        if (plugin.storage_group === storage_group) {
            return redirect('/home/settings/');
        }
    }

    try {
        await db.delete(PluginStorage).where(sql`user_uid = ${user_uid} AND storage_group = ${storage_group}`);
    } catch (e) {
        console.error(e);
    }

    return redirect('/home/settings/');
};
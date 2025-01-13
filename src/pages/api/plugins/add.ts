import type { APIRoute } from "astro";
import { db, PluginStorage, sql, Users } from "astro:db";

export const POST: APIRoute = async ({ request, locals, redirect }) => {
    const body = await request.json();
    const { id: plugin_id, storage_group, default_storage, section } = body;
    const { uid: user_uid, plugins: plugins_dist } = locals.user;

    if (!plugin_id || !section) {
        return new Response("Missing required fields", { status: 400 });
    }

    if (plugins_dist[section].includes(plugin_id)) {
        return new Response("Plugin already installed", { status: 400 });
    }

    try {
        plugins_dist[section].push(plugin_id);
        await db.update(Users).set({ plugins_dist }).where(sql`id = ${user_uid}`);
    } catch {
        return new Response("Error installing plugin", { status: 500 });
    }

    if (!storage_group) {
        return new Response("Plugin installed", { status: 200 });
    }

    const storage_group_exists = !!(await db.select().from(PluginStorage).where(sql`user_uid = ${user_uid} AND storage_group = ${storage_group}`)).length;
    if (storage_group_exists) {
        return new Response("Plugin installed", { status: 200 });
    }

    try {
        await db.insert(PluginStorage).values({ user_uid, storage_group, data: default_storage ?? {} });
    } catch {
        return new Response("Error installing plugin", { status: 500 });
    }

    return new Response("Plugin installed", { status: 200 });
};
import type { APIRoute } from "astro";
import { db, PluginStorage, sql, Users } from "astro:db";

export const POST: APIRoute = async ({ request, locals, redirect }) => {
    const body = await request.json();
    const { id: plugin_id, storage_group, default_storage } = body;
    const { uid: user_uid, plugins: plugins_arr } = locals.user;

    if (plugins_arr.includes(plugin_id)) {
        return new Response("Plugin already installed", { status: 200 });
    }

    try {
        await db.update(Users).set({ plugins: [...plugins_arr, plugin_id] }).where(sql`id = ${user_uid}`);
    } catch {
        return new Response("Failed to install plugin", { status: 500 });
    }

    if (!storage_group) {
        return new Response("Plugin installed", { status: 200 });
    }

    const storage_exists = await db.select().from(PluginStorage).where(sql`user_uid = ${user_uid} AND storage_group = ${storage_group}`);

    if (!!storage_exists.length) {
        return new Response("Plugin installed", { status: 200 });
    }

    try {
        await db.insert(PluginStorage).values({
            user_uid,
            storage_group,
            data: default_storage ?? {},
        });
    } catch {
        await db.update(Users).set({ plugins: plugins_arr }).where(sql`id = ${user_uid}`);
        return new Response("Failed to add plugin storage", { status: 500 });
    }

    return new Response("Plugin installed", { status: 200 });
};
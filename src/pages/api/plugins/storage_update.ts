import type { APIRoute } from "astro";
import { db, PluginStorage, sql, Users } from "astro:db";

export const POST: APIRoute = async ({ request, locals, redirect }) => {
    const body = await request.json();
    const user_uid = locals.user.uid;
    const storage_group = body.storage_group;
    const data = body.data;

    if (!storage_group) {
        return new Response('Storage group is required', { status: 400 });
    }

    if (!data) {
        return new Response('Data is required', { status: 400 });
    }

    try {
        const result = await db.select({ db_data: PluginStorage.data }).from(PluginStorage).where(sql`user_uid = ${user_uid} AND storage_group = ${storage_group}`);
        const db_data = Object(result[0].db_data);
        for (const key in data) {
            db_data[key] = data[key];
        }
        await db.update(PluginStorage).set({ data: db_data }).where(sql`user_uid = ${user_uid} AND storage_group = ${storage_group}`);
    } catch {
        return new Response('Storage group not found', { status: 404 });
    }

    return redirect('/home/settings/');
};
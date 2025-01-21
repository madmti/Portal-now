import type { APIRoute } from "astro";
import { db, PluginStorage, sql, Users } from "astro:db";

export const POST: APIRoute = async ({ request, locals, redirect }) => {
    const formData = await request.formData();
    const show_plugins_names = formData.get('show_plugins_names') === 'on';
    const user_uid = locals.user.uid;
    const preferences = locals.user.preferences;

    try {
        preferences.show_plugins_names = show_plugins_names;
        await db.update(Users).set({ preferences }).where(sql`id = ${user_uid}`);
    } catch (error) {
        console.error(error);
    } finally {
        return redirect('/home/dashboard/');
    }
};
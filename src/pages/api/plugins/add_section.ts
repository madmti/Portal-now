import type { APIRoute } from "astro";
import { db, PluginStorage, sql, Users } from "astro:db";

export const POST: APIRoute = async ({ request, locals, redirect }) => {
    const formData = await request.formData();
    const section_name = formData.get('section_name') as string;
    const { uid: user_uid, plugins: plugins_dist } = locals.user;

    const user_sections = Object.keys(plugins_dist);

    if (!user_sections.includes(section_name)) {
        const new_plugins_dist = { ...plugins_dist, [section_name]: [] };
        try {
            await db.update(Users).set({ plugins_dist: new_plugins_dist }).where(sql`id = ${user_uid}`);
        } catch (e) {
            console.error(e);
            return redirect('/home/settings/');
        }
    }

    return redirect('/home/settings/');
};
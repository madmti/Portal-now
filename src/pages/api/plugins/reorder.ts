import type { APIRoute } from "astro";
import { db, PluginStorage, sql, Users } from "astro:db";

export const POST: APIRoute = async ({ request, locals, redirect }) => {
    const formData = await request.formData();
    const section_name = formData.get("section_name") as string;
    const plugins = (formData.get("plugins") as string).split(",");
    const { uid: user_uid, plugins: plugins_dist } = locals.user;

    if (!plugins_dist[section_name] || plugins_dist[section_name].length != plugins.length) {
        return redirect("/home/settings/");
    }

    plugins_dist[section_name] = plugins;

    try {
        await db.update(Users).set({ plugins_dist: plugins_dist }).where(sql`id = ${user_uid}`);
    } catch (error) {
        console.error(error);
    }

    return redirect("/home/settings/");
};
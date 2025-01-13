import type { APIRoute } from "astro";
import { db, PluginStorage, sql, Users } from "astro:db";

export const POST: APIRoute = async ({ request, locals, redirect }) => {
    const formData = await request.formData();
    const plugin_id = formData.get("plugin_id")?.toString();
    const storage_group = formData.get("storage_group")?.toString();
    const user_uid = locals.user.uid;
    const plugins_ids = locals.user.plugins;

    if (!plugin_id) {
        return new Response(
            "Missing form data",
            { status: 400 }
        );
    }

    try {
        await db.update(Users).set({ plugins: plugins_ids.filter((id: string) => id !== plugin_id) }).where(sql`id = ${user_uid}`);
        await db.delete(PluginStorage).where(sql`storage_group = ${storage_group} AND user_uid = ${user_uid}`);
    } catch (error: any) {
        return new Response(
            `Something went wrong:\n ${error.message}`,
            { status: 400 }
        );
    }


    return redirect('/home/settings/');
};
import type { APIRoute } from "astro";
import { Classes, db, Schedules, sql } from "astro:db";

export const POST: APIRoute = async ({ request, redirect, locals }) => {
    const formData = await request.formData();
    const name = formData.get('name')?.toString();
    if (!name) {
        return new Response('No name provided', { status: 400 });
    }

    const user = locals.user;

    try {
        const result = await db.select({ id: Classes.id }).from(Classes).where(sql`${Classes.name} = ${name} AND ${Classes.user_uid} = ${user.uid}`);
        const class_id = result[0].id;

        await db.delete(Schedules).where(sql`${Schedules.class_id} = ${class_id}`);
        await db.delete(Classes).where(sql`${Classes.id} = ${class_id}`);
    } catch (e: any) {
        return new Response(e.message, { status: 500 });
    }

    return redirect('/home/dashboard/clases/');
};

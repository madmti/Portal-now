import type { APIRoute } from "astro";
import { getAuth } from "firebase-admin/auth";
import { app } from "../../../firebase/server";
import { db, Users } from "astro:db";

export const POST: APIRoute = async ({ request, redirect }) => {

    const auth = getAuth(app);

    const formData = await request.formData();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const name = formData.get("name")?.toString();

    if (!email || !password || !name) {
        return new Response(
            "Missing form data",
            { status: 400 }
        );
    }

    try {
        const user = await auth.createUser({
            email,
            password,
            displayName: name,
        });
        await db.insert(Users).values({ id: user.uid });
        
    } catch (error: any) {

        return new Response(
            `Something went wrong:\n ${error.message}`,
            { status: 400 }
        );
    }

    return redirect("/auth/signin/");
};
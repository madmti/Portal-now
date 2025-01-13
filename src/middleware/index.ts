import { defineMiddleware, sequence } from "astro:middleware";
import { app } from '../firebase/server';
import { getAuth } from 'firebase-admin/auth';
import { db, sql, Users } from "astro:db";

const authenticate = defineMiddleware(async (context, next) => {
    if (!context.url.pathname.includes('/home') && !context.url.pathname.includes('/plugins') && !context.url.pathname.includes('/preferences')) {
        return next();
    }
    if (!context.cookies.has('__session')) {
        return context.redirect('/auth/signin/');
    }
    const auth = getAuth(app);
    const sessionCookie = context.cookies.get('__session')?.value;
    const decodedCookie = await auth.verifySessionCookie(`${sessionCookie}`);
    try {
        const user = await auth.getUser(decodedCookie.uid);
        if (!user) {
            return context.redirect('/auth/signin/');
        }
        const result = await db.select({ plugins: Users.plugins, preferences:Users.preferences }).from(Users).where(sql`id = ${user.uid}`);
        context.locals.user = { ...user, plugins: result[0].plugins as string[], preferences: result[0].preferences as Record<string, any> };

        return next();
    }
    catch (e) {
        return context.redirect('/api/auth/signout/');
    }
});


export const onRequest = sequence(authenticate);
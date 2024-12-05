import { defineMiddleware, sequence } from "astro:middleware";
import { app } from '../firebase/server';
import { getAuth } from 'firebase-admin/auth';
import { getPreferences } from "../lib/getters";

const authenticate = defineMiddleware(async (context, next) => {
    if (!context.url.pathname.includes('/home')) {
        return next();
    }
    if (!context.cookies.has('__session')) {
        return context.redirect('/auth/signin/');
    }

    const auth = getAuth(app);
    const sessionCookie = context.cookies.get('__session')?.value;
    const decodedCookie = await auth.verifySessionCookie(`${sessionCookie}`);
    const user = await auth.getUser(decodedCookie.uid);
    const preferences = await getPreferences(user.uid);

    if (!user) {
        return context.redirect('/auth/signin/');
    }

    context.locals.user = user;
    //@ts-ignore
    context.locals.preferences = preferences;

    return next();
});


export const onRequest = sequence(authenticate);
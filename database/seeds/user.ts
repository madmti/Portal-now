import { getAuth } from "firebase-admin/auth";

export default async function SeedUser() {
    const auth = getAuth(app);
    try {
        const user_uid = await getUserUid();
        console.log(`Exists User UID: ${user_uid}`);
    } catch (error: any) {
        if (error.code == 'auth/user-not-found') {
            const user = await auth.createUser({
                displayName: import.meta.env.PUBLIC_TEST_USER,
                email: import.meta.env.PUBLIC_TEST_USER_EMAIL,
                password: import.meta.env.PUBLIC_TEST_USER_PASSWORD
            });
            console.log(`Created User UID: ${user.uid}`);
        } else {
            console.error(error);
        }
    }
}
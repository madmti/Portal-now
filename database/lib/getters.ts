import { getAuth } from "firebase-admin/auth";
import { app, db } from "./firebase";
import type { tCollection } from "./models";

export const collections: tCollection[] = [
    'Clases',
    'Eventos',
    'Preferencias',
];

export const getUserUid = async () => {
    const auth = getAuth(app);
    return (await auth.getUserByEmail(import.meta.env.PUBLIC_TEST_USER_EMAIL)).uid;
};

export const getClases = async (user_uid: string) => {
    return db.collection('Clases').where('user_uid', '==', user_uid).get();
};

export const getMapClass = async (user_uid: string) => {
    const clases = await getClases(user_uid);
    const map: Map<string, FirebaseFirestore.DocumentReference> = new Map();
    clases.forEach((doc) => {
        map.set(doc.get('name'), doc.ref);
    });
    return map;
};

export const getCollecion = (col: tCollection) => {
    return db.collection(col);
};
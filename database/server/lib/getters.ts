import { app, db } from "@firebase/server";
import { getAuth } from "firebase-admin/auth";
import type { tCollection, tSubCollection } from "./models";

export const getTestUserUid = async () => {
    const auth = getAuth(app);
    const user = await auth.getUserByEmail(import.meta.env.PUBLIC_TEST_USER_EMAIL);
    return user.uid;
};

export const getCollection = (collection: tCollection) => {
    return db.collection(collection);
}

export const getSubCollection = (doc: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, subcollection: tSubCollection) => {
    return doc.collection(subcollection);
};
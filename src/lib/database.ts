import { db } from "../firebase/server";

export interface ClassData {
    name: string;
    user: string;
}

export async function getClasses(user_uid: string): Promise<Array<ClassData>> {
    //@ts-ignore
    return (await db.collection('Clases').where('user', '==', user_uid).get()).docs.map((doc) => doc.data());
}
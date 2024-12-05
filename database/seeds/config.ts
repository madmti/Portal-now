import { db } from '../firebase'

const defaultConfig = {
    blockview: true,
};

export default async function SeedConfig() {
    const col = db.collection('Preferences');
    const doc = col.doc();
    await doc.set({
        user: import.meta.env.PUBLIC_TEST_USER_UID,
        ...defaultConfig
    });
}
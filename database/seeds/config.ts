import { db } from '../lib/firebase'
import { getCollecion, getUserUid } from '../lib/getters';
import type { tConfig } from '../lib/models';

const user_uid = await getUserUid();

const defaultConfig = {
    blockview: true,
};

export default async function SeedConfig() {
    const col = getCollecion('Preferencias');
    const doc = col.doc();
    const docData: tConfig = {
        user_uid: user_uid,
        ...defaultConfig
    };
    await doc.set(docData);
    console.log('✅');
}

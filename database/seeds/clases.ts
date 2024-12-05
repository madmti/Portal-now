import { db } from '../lib/firebase';
import { getCollecion, getUserUid } from '../lib/getters';
import type { tClase } from '../lib/models';

const user_uid = await getUserUid();

const exampleClases: tClase[] = [
    'MAT024',
    'INF155',
    'FIS130',
].map((name) => ({
    user_uid: user_uid,
    name,
}));

export default async function SeedClases() {
    const col = getCollecion('Clases')

    console.log('Seeding Clases');
    console.log('🕑'.repeat(exampleClases.length));

    for (const clase of exampleClases) {
        const doc = col.doc();
        await doc.set(clase);

        process.stdout.write('✅');
    }
}
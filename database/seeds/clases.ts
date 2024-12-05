import { db } from '../firebase'

interface Clase {
    user: string;
    name: string;
};

const exampleClases: Clase[] = [
    'MAT024',
    'INF155',
    'FIS130',
].map((name) => ({
    user: import.meta.env.PUBLIC_TEST_USER_UID,
    name,
}));

export default async function SeedClases() {
    const col = db.collection('Clases');

    console.log('Seeding Clases');
    console.log('🕑'.repeat(exampleClases.length));

    for (const clase of exampleClases) {
        const doc = col.doc();
        await doc.set(clase);

        process.stdout.write('✅');
    }
}
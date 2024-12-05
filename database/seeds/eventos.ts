import { db } from '../lib/firebase';
import { getCollecion, getMapClass, getUserUid } from '../lib/getters';
import type { tEvento } from '../lib/models';

const user_uid = await getUserUid();

const mapClass = await getMapClass(user_uid);

const exampleEventos: tEvento[] = [
    {
        class_name: 'MAT024',
        blocks: ['1-2'],
        day: 1,
    },
    {
        class_name: 'MAT024',
        blocks: ['3-4'],
        day: 2,
    },
    {
        class_name: 'MAT024',
        blocks: ['5-6'],
        day: 3,
    },
    {
        class_name: 'MAT024',
        blocks: ['7-8'],
        day: 4,
    },
    {
        class_name: 'MAT024',
        blocks: ['9-10'],
        day: 5,
    },
].map((el) => {
    const clas = mapClass.get(el.class_name);
    if (!clas) {
        throw new Error(`Clase no encontrada: ${el.class_name}`);
    }
    return {
        user_uid: user_uid,
        class_uid: clas,
        type: 'horario',
        name: 'Catedra',
        blockmode: true,
        blocks: el.blocks,
        day: el.day,
    };
});

export default async function SeedEventos() {
    const col = getCollecion('Eventos');

    console.log('Seeding Eventos');
    console.log('🕑'.repeat(exampleEventos.length));

    for (const clase of exampleEventos) {
        const doc = col.doc();
        await doc.set(clase);

        process.stdout.write('✅');
    }
}
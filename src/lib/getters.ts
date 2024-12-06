import { db } from "@firebase/server";
import type { tClase, tEventoHorarioBlock, tEventoHorarioTime } from "./database";

export async function getClasses(user_uid: string): Promise<Array<tClase>> {
    //@ts-ignore
    return (await db.collection('Clases').where('user_uid', '==', user_uid).get()).docs.map((doc) => doc.data());
}

export async function getHorarioDia(user_uid: string, day: number): Promise<Array<tEventoHorarioBlock | tEventoHorarioTime>> {
    //@ts-ignore
    return (await db.collection('Eventos').where('user_uid', '==', user_uid).where('type', '==', 'horario').where('day', '==', day).get()).docs.map(async (doc) => {
        const data = doc.data();
        console.log(await data.class_uid.get());
        return data;
    });
}

export function horarioPorBloque(horario: tEventoHorarioBlock[]) {
    const horarioBloques = new Map();
    for (const clase of horario) {
        for (const bloque of clase.blocks) {
            if (!horarioBloques.has(bloque)) {
                horarioBloques.set(bloque, []);
            }
            horarioBloques.get(bloque).push(clase);
        }
    }
    return horarioBloques;
}

export async function getPreferences(user_uid: string) {
    return (await db.collection('Preferencias').where('user_uid', '==', user_uid).get()).docs.map((doc) => doc.data())[0];
}
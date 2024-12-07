export const bloquesHorario = [
    { bloque: '1-2', inicio: { h: 8, m: 15 }, fin: { h: 9, m: 25 } },
    { bloque: '3-4', inicio: { h: 9, m: 35 }, fin: { h: 10, m: 45 } },
    { bloque: '5-6', inicio: { h: 10, m: 55 }, fin: { h: 12, m: 5 } },
    { bloque: '7-8', inicio: { h: 12, m: 15 }, fin: { h: 13, m: 25 } },
    { bloque: '9-10', inicio: { h: 14, m: 30 }, fin: { h: 15, m: 40 } },
    { bloque: '11-12', inicio: { h: 15, m: 50 }, fin: { h: 17, m: 0 } },
    { bloque: '13-14', inicio: { h: 17, m: 10 }, fin: { h: 18, m: 20 } },
    { bloque: '15-16', inicio: { h: 18, m: 30 }, fin: { h: 19, m: 40 } },
    { bloque: '17-18', inicio: { h: 19, m: 50 }, fin: { h: 21, m: 0 } },
    { bloque: '19-20', inicio: { h: 21, m: 10 }, fin: { h: 22, m: 20 } }
];

export type tBloques = '1-2' | '3-4' | '5-6' | '7-8' | '9-10' | '11-12' | '13-14' | '15-16' | '17-18' | '19-20';
export const bloques: tBloques[] = ['1-2', '3-4', '5-6', '7-8', '9-10', '11-12', '13-14', '15-16', '17-18', '19-20',];

export const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

export const getDay = (date: Date) => {
    const day = date.getDay();
    return days[day];
};

export const laterEq = (time1: { h: number, m: number }, time2: { h: number, m: number }) => {
    if (time1.h > time2.h) return true;
    if (time1.h < time2.h) return false;
    if (time1.m > time2.m) return true;
    if (time1.m < time2.m) return false;
    return true;
}
export const earlyEq = (time1: { h: number, m: number }, time2: { h: number, m: number }) => {
    if (time1.h > time2.h) return false;
    if (time1.h < time2.h) return true;
    if (time1.m > time2.m) return false;
    if (time1.m < time2.m) return true;
    return false;
}

export const obtenerBloqueActual = (ahora: Date) => {
    const horaActual = { h: ahora.getHours(), m: ahora.getMinutes() };

    for (let i = 0; i < bloquesHorario.length; i++) {
        const bloque = bloquesHorario[i];
        const inicioBloque = { h: bloque.inicio.h, m: bloque.inicio.m };
        const finBloque = { h: bloque.fin.h, m: bloque.fin.m };

        if (laterEq(horaActual, inicioBloque) && earlyEq(horaActual, finBloque)) {
            return bloque.bloque;
        }
        if (i < bloquesHorario.length - 1) {
            const inicioSiguienteBloque = { h: bloquesHorario[i + 1].inicio.h, m: bloquesHorario[i + 1].inicio.m };
            if (laterEq(horaActual, finBloque) && earlyEq(horaActual, inicioSiguienteBloque)) {
                return `${bloque.bloque} ~ ${bloquesHorario[i + 1].bloque}`;
            }
        }
    }

    if (earlyEq(horaActual, { h: bloquesHorario[0].inicio.h, m: bloquesHorario[0].inicio.m })) {
        return 'Temprano';
    }

    if (laterEq(horaActual, { h: bloquesHorario[bloquesHorario.length - 1].fin.h, m: bloquesHorario[bloquesHorario.length - 1].fin.m })) {
        return 'Tarde';
    }

    return '-';
}
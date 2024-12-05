export const bloques = [
    { bloque: '1-2', inicio: '08:15', fin: '09:25' },
    { bloque: '3-4', inicio: '09:35', fin: '10:45' },
    { bloque: '5-6', inicio: '10:55', fin: '12:05' },
    { bloque: '7-8', inicio: '12:15', fin: '13:25' },
    { bloque: '9-10', inicio: '14:30', fin: '15:40' },
    { bloque: '11-12', inicio: '15:50', fin: '17:00' },
    { bloque: '13-14', inicio: '17:10', fin: '18:20' },
    { bloque: '15-16', inicio: '18:30', fin: '19:40' },
    { bloque: '17-18', inicio: '19:50', fin: '21:00' },
    { bloque: '19-20', inicio: '21:10', fin: '22:20' }
];

export const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

export const getDay = (date: Date) => {
    const day = date.getDay();
    return days[day];
};

export const getNumDay = (day: string) => days.indexOf(day);

export const obtenerBloqueActual = (ahora: Date) => {
    const horaActual = `${ahora.getHours()}:${ahora.getMinutes()}`;

    for (let i = 0; i < bloques.length; i++) {
        const bloque = bloques[i];
        if (horaActual >= bloque.inicio && horaActual <= bloque.fin) {
            return bloque.bloque;
        }
        if (i < bloques.length - 1 && horaActual > bloque.fin && horaActual < bloques[i + 1].inicio) {
            return `${bloque.bloque} ~ ${bloques[i + 1].bloque}`;
        }
    }

    if (horaActual < bloques[0].inicio) {
        return 'Temprano';
    }

    if (horaActual > bloques[bloques.length - 1].fin) {
        return 'Tarde';
    }

    return '-';
}
import type { Timestamp } from "firebase-admin/firestore";

export type tConfig = {
    user_uid: string;
    blockview: boolean;
};

export type tClase = {
    user_uid: string;
    name: string;
};

export type tEventoHorarioBlock = {
    user_uid: string;
    class_uid: FirebaseFirestore.DocumentReference;
    type: 'horario';
    name: 'Catedra' | 'Laboratorio' | 'Ayudantia';
    blockmode: true;
    blocks: string[];
    day: number;
};

export type tEventoHorarioTime = {
    user_uid: string;
    class_uid: FirebaseFirestore.DocumentReference;
    type: 'horario';
    name: 'Catedra' | 'Laboratorio' | 'Ayudantia';
    blockmode: false;
    start: string;
    end: string;
    day: number;
};

export type tEventoEvaluacion = {
    user_uid: string;
    class_uid: FirebaseFirestore.DocumentReference;
    type: 'evaluacion';
    name: string;
    desc: string;
    date: Timestamp;
};

export type tEventoCalendario = {
    user_uid: string;
    type: 'calendario';
    name: string;
    date: Timestamp;
};

export type tEvento = tEventoHorarioBlock | tEventoHorarioTime | tEventoCalendario | tEventoEvaluacion;

export type tCollection = 'Clases' | 'Eventos' | 'Preferencias';

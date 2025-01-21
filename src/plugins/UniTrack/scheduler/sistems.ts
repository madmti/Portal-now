import type { SchedulerSistemData } from "./storage";

const UTFSM: SchedulerSistemData = {
    '1-2': [
        { h: 8, m: 15 },
        { h: 9, m: 25 },
    ],
    '3-4': [
        { h: 9, m: 35 },
        { h: 10, m: 45 },
    ],
    '5-6': [
        { h: 10, m: 55 },
        { h: 12, m: 5 },
    ],
    '7-8': [
        { h: 12, m: 15 },
        { h: 13, m: 25 },
    ],
    '9-10': [
        { h: 14, m: 30 },
        { h: 15, m: 40 },
    ],
    '11-12': [
        { h: 15, m: 50 },
        { h: 17, m: 0 },
    ],
    '13-14': [
        { h: 17, m: 10 },
        { h: 18, m: 20 },
    ],
    '15-16': [
        { h: 18, m: 30 },
        { h: 19, m: 40 },
    ],
    '17-18': [
        { h: 19, m: 50 },
        { h: 21, m: 0 },
    ],
    '19-20': [
        { h: 21, m: 10 },
        { h: 22, m: 20 },
    ],
};

export const SchedulerSistemsData: Record<string, SchedulerSistemData> = {
    UTFSM,
};
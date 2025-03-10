import type { SchedulerSistemData } from "./storage";

const UTFSM: SchedulerSistemData = {
    '1-2': [{ h: 8, m: 15 }, { h: 9, m: 25 }],
    '3-4': [{ h: 9, m: 40 }, { h: 10, m: 50 }],
    '5-6': [{ h: 11, m: 5 }, { h: 12, m: 15 }],
    '7-8': [{ h: 12, m: 30 }, { h: 13, m: 40 }],
    '9-10': [{ h: 14, m: 40 }, { h: 15, m: 50 }],
    '11-12': [{ h: 16, m: 5 }, { h: 17, m: 15 }],
    '13-14': [{ h: 17, m: 30 }, { h: 18, m: 40 }],
    '15-16': [{ h: 18, m: 50 }, { h: 20, m: 0 }],
    '17-18': [{ h: 20, m: 15 }, { h: 21, m: 25 }],
    '19-20': [{ h: 21, m: 40 }, { h: 22, m: 50 }]
};

export const SchedulerSistemsData: Record<string, SchedulerSistemData> = {
    UTFSM,
};
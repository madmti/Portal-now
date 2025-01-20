export type tDay = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type SchedulerSistems = 'UTFSM';
export type SchedulerSistemData = {
    [key: string]: {
        h: number;
        m: number;
    }[];
};
export type SchedulerEventData = {
    class_name: string;
    place: string;
    class_type: string;
};
export type SchedulerSchedByDay = {
    [day in tDay]?: Record<string, string[]>;
};
export type SchedulerStorage = {
    sistem: SchedulerSistems;
    sorted_keys: string[];
    schedule_by_event_code: Record<string, SchedulerEventData>;
    schedule_by_day: SchedulerSchedByDay;
};
export const scheduler_sistems: SchedulerSistems[] = ['UTFSM'];
export const scheduler_default_storage: SchedulerStorage = {
    sistem: 'UTFSM',
    sorted_keys: [
        '1-2',
        '3-4',
        '5-6',
        '7-8',
        '9-10',
        '11-12',
        '13-14',
        '15-16',
        '17-18',
        '19-20',
    ],
    schedule_by_event_code: {},
    schedule_by_day: {},
};
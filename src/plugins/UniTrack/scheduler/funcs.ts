import { requestStorageAPI } from "@lib/plugins";
import type { SchedulerEventData, SchedulerSchedByDay, SchedulerSistemData } from "./storage";
import { unitrack_storage_group } from "../config";

export function getKey(time: Date, sistem: SchedulerSistemData, sorted_keys: string[]): number[] {
    const keys = sorted_keys;
    const currentMinutes = time.getHours() * 60 + time.getMinutes();
    const result: number[] = [];

    if (currentMinutes < sistem[keys[0]][0].h * 60 + sistem[keys[0]][0].m) {
        return [-1];
    }

    for (let i = 0; i < keys.length; i++) {
        const [start, end] = sistem[keys[i]];
        const startMinutes = start.h * 60 + start.m;
        const endMinutes = end.h * 60 + end.m;

        if (currentMinutes >= startMinutes && currentMinutes <= endMinutes) {
            result.push(i);
        }

        if (i < keys.length - 1) {
            const [nextStart] = sistem[keys[i + 1]];
            const nextStartMinutes = nextStart.h * 60 + nextStart.m;

            if (currentMinutes > endMinutes && currentMinutes < nextStartMinutes) {
                result.push(i, i + 1);
            }
        }
    }

    if (result.length === 0) {
        return [keys.length];
    }

    return result;
}

// ==============================
//           REQUESTS
// ==============================
export async function requestUpdateEvents(new_events: Record<string, SchedulerEventData>) {
    return requestStorageAPI({
        storage_group: unitrack_storage_group,
        data: [{
            action: 'set',
            path: ['scheduler', 'schedule_by_event_code'],
            value: new_events,
        }],
    });
}
export async function requestUpdateSchedule(new_schedule: SchedulerSchedByDay) {
    return requestStorageAPI({
        storage_group: unitrack_storage_group,
        data: [{
            action: 'set',
            path: ['scheduler', 'schedule_by_day'],
            value: new_schedule,
        }],
    });
}
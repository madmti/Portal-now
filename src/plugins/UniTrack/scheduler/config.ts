import type { StorageAPIAction, StorageAPIDataAction } from "pages/api/plugins/storage_api";
import type { UniTrackPluginConfig, UniTrackStorage } from "../config";
import type { tDay } from "./storage";

const SchedulerConfig: UniTrackPluginConfig = {
    id: "scheduler",
    name: "Scheduler",
    description: "Schedules your classes",
    icon: "scheduler.svg",
    component: "UniTrack/scheduler/ui/component.tsx",
    settings: "UniTrack/scheduler/ui/settings.tsx",
    custom_submitter: true,
    documentation: "UniTrack/scheduler/docs.md",
    version: "0.0.1",

    can_attach_class: true,
    get_class_attaching_data: (clas: string, storage: UniTrackStorage) => [],
    get_class_deattaching_data: (clas: string, storage: UniTrackStorage) => {
        const data: StorageAPIDataAction[] = [];
        const all_keys_where_class = Object.keys(storage.scheduler.schedule_by_event_code).filter((key) => storage.scheduler.schedule_by_event_code[key].class_name === clas);
    
        Object.keys(storage.scheduler.schedule_by_day).forEach((key, index) => {
            const day = storage.scheduler.schedule_by_day[parseInt(key) as tDay];
            if (!day) return;
            Object.keys(day).forEach((time) => {
                const same_values = day[time]?.filter((c) => all_keys_where_class.includes(c));
                if (same_values.length) {
                    for (const value of same_values) {
                        data.push({
                            action: 'splice',
                            path: ["scheduler", "schedule_by_day", key, time],
                            value: value,
                        });
                    }
                }
            });
        });

        data.push(
            {
                action: "delete where object",
                path: ["scheduler", "schedule_by_event_code"],
                where_path_name: "class_name",
                value: clas,
            },
        );
        return data;
    },
};

export { SchedulerConfig };
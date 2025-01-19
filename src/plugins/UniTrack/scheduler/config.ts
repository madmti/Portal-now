import type { UniTrackPluginConfig } from "../config";

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
    get_class_attaching_data: (clas: string) => [],
    get_class_deattaching_data: (clas: string) => [],
};

export { SchedulerConfig };
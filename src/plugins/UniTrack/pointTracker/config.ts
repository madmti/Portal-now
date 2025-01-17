import type { UniTrackPluginConfig } from "../config";
import { pointtracker_default_clas } from "./storage";

const PointTrackerConfig: UniTrackPluginConfig = {
    id: "point_tracker",
    name: "Point Tracker",
    description: "Calculates points to complete your goals",
    icon: "pointTracker.svg",
    component: "UniTrack/pointTracker/ui/component.tsx",
    settings: "UniTrack/pointTracker/ui/settings.tsx",
    custom_submitter: true,

    can_attach_class: true,
    get_class_attaching_data: (clas: string) => [{
        action: 'set',
        path_resolver: 'create',
        path: ['point_tracker', 'track', clas],
        value: pointtracker_default_clas,
    },],
    get_class_deattaching_data: (clas: string) => [{
        action: 'delete',
        path: ['point_tracker', 'track', clas],
        value: null,
    },],
};

export { PointTrackerConfig };
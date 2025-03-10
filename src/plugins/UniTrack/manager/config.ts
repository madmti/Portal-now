import { type UniTrackPluginConfig } from "../config";


const UniTrackManagerConfig: UniTrackPluginConfig = {
    id: "unitrack_manager",
    name: "UniTrack Manager",
    description: "Manage your goals and track your progress",
    icon: "unitrackManager.svg",
    settings: "UniTrack/manager/settings.tsx",
    custom_submitter: true,
    can_attach_class: false,
};

export { UniTrackManagerConfig };
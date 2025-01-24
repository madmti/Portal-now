import type { tPlugin } from "@lib/plugins";
import { pointtracker_default_storage, type PointTrackerStorage } from "./pointTracker/storage";
import type { StorageAPIDataAction } from "pages/api/plugins/storage_api";
import { PointTrackerConfig } from "./pointTracker/config";
import { UniTrackManagerConfig } from "./manager/config";
import { SchedulerConfig } from "./scheduler/config";
import { scheduler_default_storage, type SchedulerStorage } from "./scheduler/storage";

// ============================================================
// ======================= IDS ================================
// ============================================================
export const unitrack_extension_group = 'UniTrack';
export const unitrack_storage_group = 'unitrack_storage_group';

// ============================================================
// ===================== STORAGE ==============================
// ============================================================
export interface UniTrackStorage {
    classes: string[];
    point_tracker: PointTrackerStorage;
    scheduler: SchedulerStorage;
}
export const unitrack_default_storage: UniTrackStorage = {
    classes: [],
    point_tracker: pointtracker_default_storage,
    scheduler: scheduler_default_storage,
};

// ============================================================
// ===================== PLUGINS ==============================
// ============================================================
type DoesNotAttachClass = {
    can_attach_class: false;
}
type DoesAttachClass = {
    can_attach_class: true;
    get_class_attaching_data: (clas: string, storage: UniTrackStorage) => StorageAPIDataAction[];
    get_class_deattaching_data: (clas: string, storage: UniTrackStorage) => StorageAPIDataAction[];
}
export type UniTrackPluginConfig = (DoesAttachClass | DoesNotAttachClass) & {
    id: string;
    name: string;
    description?: string;
    icon: string;
    component?: string;
    settings?: string;
    custom_submitter?: boolean;
    version?: string;
}
export const UniTrackInternalPlugins: Record<string, UniTrackPluginConfig> = Object.fromEntries([
    UniTrackManagerConfig,
    PointTrackerConfig,
    SchedulerConfig,
].map(plugin => [plugin.id, plugin]));
export const UniTrackPlugins: Record<string, tPlugin> = Object.fromEntries(
    Object.entries(UniTrackInternalPlugins).map(([key, value]) => [key, {
        id: value.id,
        name: value.name,
        description: value.description,
        icon: value.icon,
        framework: 'preact',
        component: value.component,
        settings: value.settings,
        extension_group: unitrack_extension_group,
        custom_submitter: value.custom_submitter,
        storage_group: unitrack_storage_group,
        default_storage: unitrack_default_storage,
        version: value.version,
    }])
);

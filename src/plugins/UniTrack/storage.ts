import { pointtracker_default_storage, type PointTrackerStorage } from "./pointTracker/storage";

export interface UniTrackStorage {
    classes: string[];
    point_tracker: PointTrackerStorage;
}
export const unitrack_storage_group = 'unitrack_storage_group';
export const unitrack_extension_group = 'UniTrack';
export const unitrack_default_storage: UniTrackStorage = {
    classes: [],
    point_tracker: pointtracker_default_storage,
};
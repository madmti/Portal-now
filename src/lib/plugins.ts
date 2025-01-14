import { unitrack_default_storage, unitrack_extension_group, unitrack_storage_group } from "@plugins/UniTrack/storage";
import type { StorageAPIBody } from "pages/api/plugins/storage_api";

export async function requestStorageAPI(body: StorageAPIBody) {
    return fetch('/api/plugins/storage_api/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
}

export interface tPublicUserData {
    username: string;
    email: string;
    installed_plugins: Set<string>;
}

export interface tPlugin {
    name: string;
    description?: string;
    icon: string;
    component?: string;
    storage_group?: string;
    default_storage?: any;
    settings?: string;
    extension_group?: string;
    custom_submitter?: boolean;
}

export const plugins: Record<string, tPlugin> = {
    'test_plugin': {
        name: 'Test Plugin',
        description: 'This is a test plugin',
        icon: 'testPlugin.svg',
        component: 'testPlugin/component.tsx',
        settings: 'testPlugin/settings.tsx',
        storage_group: 'test_plugin_storage',
        default_storage: { display_text: 'Hello, World!' },
    },
    'block_clock': {
        name: 'Block Clock',
        description: 'A simple clock that displays the current block',
        icon: 'blockClock.svg',
        component: 'blockClock/component.tsx',
    },
    "unitrack_manager": {
        name: "UniTrack Manager",
        description: "Manage your goals and track your progress",
        icon: "unitrackManager.svg",
        settings: "UniTrack/manager/settings.tsx",
        extension_group: unitrack_extension_group,
        custom_submitter: true,
        storage_group: unitrack_storage_group,
        default_storage: unitrack_default_storage,
    },
    "point_tracker": {
        name: "Point Tracker",
        description: "Calculates points to complete your goals",
        icon: "pointTracker.svg",
        component: "UniTrack/pointTracker/component.tsx",
        settings: "UniTrack/pointTracker/settings.tsx",
        extension_group: unitrack_extension_group,
        custom_submitter: true,
        storage_group: unitrack_storage_group,
        default_storage: unitrack_default_storage,
    },
};
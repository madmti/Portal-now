import { UniTrackPlugins } from "@plugins/UniTrack/config";
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

export type tPluginFrameWork = 'preact' | 'astro-server' | 'astro-client';

export interface tPlugin {
    id: string;
    name: string;
    description?: string;
    icon: string;
    framework: tPluginFrameWork;
    component?: string;
    storage_group?: string;
    default_storage?: any;
    settings?: string;
    extension_group?: string;
    custom_submitter?: boolean;
}
export const server_side_rendering_frameworks: tPluginFrameWork[] = ['astro-server'];
export const plugins: Record<string, tPlugin> = {
    'test_plugin': {
        id: 'test_plugin',
        name: 'Test Plugin',
        description: 'This is a test plugin',
        icon: 'testPlugin.svg',
        framework: 'preact',
        component: 'testPlugin/component.tsx',
        settings: 'testPlugin/settings.tsx',
        storage_group: 'test_plugin_storage',
        default_storage: { display_text: 'Hello, World!' },
    },
    'block_clock': {
        id: 'block_clock',
        name: 'Block Clock',
        description: 'A simple clock that displays the current block',
        icon: 'blockClock.svg',
        framework: 'preact',
        component: 'blockClock/component.tsx',
    },
    ...UniTrackPlugins,
};
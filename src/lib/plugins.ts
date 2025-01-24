import { community_plugins } from "../plugins/community_plugins";
import { UniTrackPlugins } from "../plugins/UniTrack/config";
import type { StorageAPIBody } from "pages/api/plugins/storage_api";
import { readdirSync } from 'fs';
import { resolve } from 'path';

export function findPluginPathById(pluginId: string) {
    const pluginPrefix = `_$!plugin_component_${pluginId}`;
    const pluginDir = resolve('dist', '_astro');
    const files = readdirSync(pluginDir);
  
    const pluginFile = files.find(file => file.startsWith(pluginPrefix) && file.endsWith('.js'));
  
    if (pluginFile) {
      return `/_astro/${pluginFile}`;
    }
  
    return null;
  }

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

export type tPluginFrameWork = 'preact';

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
    documentation?: string;
    version?: string;
}
export const plugins: Record<string, tPlugin> = {
    ...Object.fromEntries(community_plugins.map((plugin) => [plugin.id, plugin])),
    ...UniTrackPlugins,
};

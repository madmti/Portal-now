import type { tPlugin } from "@lib/plugins";

export interface tBasicPluginStorage {
    display_text: string;
}
export const basic_plugin_storage_group = 'basic_plugin_storage';
const basic_plugin_storage:tBasicPluginStorage = {
    display_text: 'Hola Mundo!',
}
export const BasicPluginConfig:tPlugin = {
    id: 'basic_plugin',
    name: 'Basic Plugin',
    description: 'This is a basic plugin',
    icon: 'basicPlugin.svg',
    framework: 'preact',
    version: '1.0.0',
    
    component: 'basicPlugin/ui/component.tsx',
    settings: 'basicPlugin/ui/settings.tsx',

    storage_group: basic_plugin_storage_group,
    default_storage: basic_plugin_storage,
};

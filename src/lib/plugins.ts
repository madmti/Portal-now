export interface tPublicUserData {
    username: string;
    email: string;
}

export interface tPlugin {
    name: string;
    description?: string;
    icon: string;
    component?: string;
    storage_group?: string;
    default_storage?: any;
    settings?: string;
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
};
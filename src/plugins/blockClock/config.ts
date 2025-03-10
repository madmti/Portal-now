import type { tPlugin } from "@lib/plugins";

export const BlockClockConfig:tPlugin = {
    id: 'block_clock',
    name: 'Block Clock',
    description: 'A simple clock that displays the current block',
    icon: 'blockClock.svg',
    framework: 'preact',
    component: 'blockClock/component.tsx',
};
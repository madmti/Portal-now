import type { tPlugin } from "@lib/plugins";
import { BasicPluginConfig } from "./basicPlugin/config";
import { BlockClockConfig } from "./blockClock/config";

export const community_plugins: tPlugin[] = [
    BasicPluginConfig,
    BlockClockConfig,
];

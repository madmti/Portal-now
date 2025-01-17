import { plugins, requestStorageAPI, type tPlugin } from "@lib/plugins";
import { unitrack_extension_group, unitrack_storage_group, UniTrackInternalPlugins } from "./config";
import type { StorageAPIBody } from "pages/api/plugins/storage_api";

export function getUniTrackPlugins(plugins_ids: Set<string>) {
    const unitrackPlugins: tPlugin[] = [];
    plugins_ids.forEach((plugin_id) => {
        const plugin = plugins[plugin_id];
        if (plugin.extension_group === unitrack_extension_group) {
            unitrackPlugins.push(plugin);
        }
    });

    return unitrackPlugins;
}
export async function requestAddClass(clas: string) {
    return requestStorageAPI({
        storage_group: unitrack_storage_group,
        data: [
            {
                path: ['classes'],
                path_resolver: 'reject',
                action: 'add if not exists',
                value: clas,
            },
        ],
    });
}
export async function requestDeleteClass(clas: string, unitrack_plugins: tPlugin[]) {
    const body: StorageAPIBody = {
        storage_group: unitrack_storage_group,
        data: [],
    };

    unitrack_plugins.forEach((plugin) => {
        const internal_plugin = UniTrackInternalPlugins[plugin.id];
        if (internal_plugin.can_attach_class)
            body.data.concat(internal_plugin.get_class_deattaching_data(clas));
    });

    body.data.push({
        action: "splice",
        path: ["classes"],
        value: clas,
    });

    return requestStorageAPI(body);
}
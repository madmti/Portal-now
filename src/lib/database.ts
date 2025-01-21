import { db, PluginStorage, sql } from "astro:db";

export async function getPluginStorage(user_uid: string) {
    const plugins_storages = await db.select({
        storage_group: PluginStorage.storage_group,
        data: PluginStorage.data,
    })
        .from(PluginStorage)
        .where(sql`user_uid = ${user_uid}`);

    return Object.fromEntries(plugins_storages.map(({ storage_group, data }) => [storage_group, data]));
}

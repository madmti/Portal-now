import type { APIRoute } from "astro";
import { db, PluginStorage, sql, Users } from "astro:db";

export type StorageAPIAction = "push" | "add if not exists" | "splice" | "set" | "delete";
export type StorageAPIPathResolvers = "reject" | "create";

export interface StorageAPIDataAction {
    path: string[];
    path_resolver?: StorageAPIPathResolvers;
    action: StorageAPIAction;
    value: any;
}

export interface StorageAPIBody {
    storage_group: string;
    data: StorageAPIDataAction[];
};

function checkStorageAPIBodyType(body: any): body is StorageAPIBody {
    if (body.storage_group && body.data) {
        if (typeof body.storage_group === "string" && Array.isArray(body.data)) {
            return body.data.every((data: any) => {
                return "path" in data && "action" in data && "value" in data;
            });
        }
    }
    return false;
}

function doActionOn(target: any, action: StorageAPIAction, value: any) {
    switch (action) {
        case "delete":
            delete target[value];
            return
        case "set":
            target = value;
            return
        case "push":
            target.push(value);
            break;
        case "splice":
            target.splice(target.indexOf(value), 1);
            break;
        case "add if not exists":
            if (!target.includes(value)) {
                target.push(value);
            }
            break;
    }
}

function resolveOn(target: any, last_key: string, action: StorageAPIAction, value: any) {
    switch (action) {
        case "delete":
            return;
        case "set":
            target[last_key] = value;
            break;
        case "push":
            target[last_key] = [value];
            break;
        case "add if not exists":
            target[last_key] = [value];
            break;
    }
}

function resolvePathOn(storage: any, last_key: string, path_resolver: StorageAPIPathResolvers) {
    switch (path_resolver) {
        case "reject":
            return;
        case "create":
            storage[last_key] = {};
            break;
    }
}


function executeActionAt(storage: any, path: string[], path_resolver: StorageAPIPathResolvers, action: StorageAPIAction, value: any) {
    let target = storage;
    try {
        for (let i = 0; i < path.length - 1; i++) {
            const key = path[i];
            if (!(key in target)) {
                resolvePathOn(target, key, path_resolver);
            }
            target = target[key];
        }
        const last_key = path[path.length - 1];
        if (last_key in target) {
            doActionOn(target[last_key], action, value);
        } else {
            resolveOn(target, last_key, action, value);
        }
    } catch (error) {
        throw new Error(`Error processing ${path.join(".")} with action "${action}": path rejected`);
    }
}

export const POST: APIRoute = async ({ request, locals, redirect }) => {
    const body = await request.json();
    if (!checkStorageAPIBodyType(body)) {
        return new Response("Invalid body", { status: 400 });
    }
    const user_uid = locals.user.uid;
    const storage_group = body.storage_group;
    const data = body.data;

    const result = await db.select({ storage: PluginStorage.data }).from(PluginStorage).where(sql`user_uid = ${user_uid} AND storage_group = ${storage_group}`);
    if (!result.length) {
        return new Response("Storage group not found", { status: 404 });
    }
    const { storage } = result[0];

    let errors: string[] = [];

    for (const data_action of data) {
        const {
            path,
            path_resolver = "reject",
            action,
            value,
        } = data_action;
        try {
            executeActionAt(storage, path, path_resolver, action, value);
        } catch (error: any) {
            errors.push(error.message as string);
        }
    }

    if (errors.length) {
        return new Response(errors.join("\n"), { status: 500 });
    }

    try {
        await db.update(PluginStorage).set({ data: storage }).where(sql`user_uid = ${user_uid} AND storage_group = ${storage_group}`);
    } catch (error) {
        return new Response("Error updating storage", { status: 500 });
    }

    return new Response("OK", { status: 200 });
};
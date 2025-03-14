import type { APIRoute } from "astro";
import { db, PluginStorage, sql } from "astro:db";

export type StorageAPIAction = 
        "push" | 
        "add if not exists" | 
        "splice" | 
        "set" | 
        "delete" | 
        "delete where object";
export type StorageAPIPathResolvers = 
        "reject" | 
        "create";

export interface StorageAPIDataAction {
    path: string[];
    path_resolver?: StorageAPIPathResolvers;
    action: StorageAPIAction;
    value: any;
    where_path_name?: string;
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

function resolvePathOn(target: any, key: string, path_resolver: string) {
    switch (path_resolver) {
        case "reject":
            throw new Error(`Path resolution rejected for key: ${key}`);
        case "create":
            target[key] = {};
            break;
        default:
            throw new Error(`Resolución de ruta desconocida: ${path_resolver}`);
    }
}

function doActionOn(target: any, key: string, data: StorageAPIDataAction) {
    const { action, value, where_path_name } = data;
    switch (action) {
        case 'set':
            target[key] = value;
            break;
        case 'splice':
            if (Array.isArray(target[key])) {
                target[key].splice(target[key].indexOf(value), 1);
            } else {
                throw new Error(`Target at ${key} is not an array`);
            }
            break;
        case 'add if not exists':
            if (Array.isArray(target[key])) {
                if (!target[key].includes(value)) {
                    target[key].push(value);
                }
            } else {
                throw new Error(`Target at ${key} is not an array`);
            }
            break;
        case 'push':
            if (Array.isArray(target[key])) {
                target[key].push(value);
            } else {
                throw new Error(`Target at ${key} is not an array`);
            }
            break;
        case 'delete':
            delete target[key];
            break;
        case 'delete where object':
            if (!where_path_name) {
                throw new Error(`Missing where_path_name`);
            }
            if (typeof target[key] === 'object' && target[key] !== null) {
                for (const subKey in target[key]) {
                    if (target[key][subKey][where_path_name] === value) {
                        delete target[key][subKey];
                    }
                }
            } else {
                throw new Error(`Target at ${key} is not an object`);
            }
            break;

        default:
            throw new Error(`Acción desconocida: ${action}`);
    }
}

function executeActionAt(storage: any, pathArray: string[], path_resolver: string, data: StorageAPIDataAction) {
    const { action } = data;

    function recursiveAction(target: any, keys: string[]) {
        const key = keys[0];

        if (keys.length === 1) {
            doActionOn(target, key, data);
            return;
        }

        if (!(key in target)) {
            resolvePathOn(target, key, path_resolver);
        }
        recursiveAction(target[key], keys.slice(1));
    }

    try {
        recursiveAction(storage, pathArray);
    } catch (error: any) {
        throw new Error(`Error processing ${pathArray.join(".")} with action "${action}": ${error.message}`);
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
    let { storage } = result[0];

    let errors: string[] = [];

    for (const data_action of data) {
        const {
            path,
            path_resolver = "reject",
        } = data_action;
        try {
            if (!path.length) {
                storage = data_action.value;
            } else {
                executeActionAt(storage, path, path_resolver, data_action);
            }
        } catch (error: any) {
            errors.push(error.message);
        }
    }

    if (errors.length) {
        return new Response(errors.join("\n"), { status: 400 });
    }

    try {
        await db.update(PluginStorage).set({ data: storage }).where(sql`user_uid = ${user_uid} AND storage_group = ${storage_group}`);
    } catch (error) {
        return new Response("Error updating storage", { status: 500 });
    }

    return new Response("OK", { status: 200 });
};
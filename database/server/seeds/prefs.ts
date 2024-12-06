import { getCollection, getTestUserUid } from "@database/server/lib/getters";
import type { tPreferences } from "../lib/models";

const user_uid = await getTestUserUid();

const defaultPreferences: tPreferences = {
    user_uid: user_uid,
    block_mode: true,
};

export default async function SeedPreferences() {
    console.log("Seeding Preferences 🌱");
    const collection = getCollection('Preferences');
    const start = Date.now();
    try {
        await collection.doc().set(defaultPreferences);
        console.log("Seeding Preferences Done ✅", (Date.now() - start) / 1000 + "s");
    } catch (error) {
        console.error("Seeding Preferences Error ❌", error);
    }
}
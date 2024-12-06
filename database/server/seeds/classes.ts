import { printProgress } from "@database/server/lib/util";
import { getCollection, getTestUserUid } from "@database/server/lib/getters";
import type { tClasses } from "@database/server/lib/models";

const user_uid = await getTestUserUid();

const defaultClasses: tClasses[] = [
    'MAT024',
    'FIS130',
].map((name) => ({
    user_uid: user_uid,
    name: name,
}));

export default async function SeedClasses() {
    console.log("Seeding Classes 🌱");
    const collection = getCollection('Classes');
    const totalClasses = defaultClasses.length;
    const start = Date.now();
    try {
        for (let i = 0; i < totalClasses; i++) {
            const cls = defaultClasses[i];
            await collection.doc().set(cls);
            printProgress(i + 1, totalClasses);
        }
        console.log("\nSeeding Classes Done ✅", (Date.now() - start) / 1000 + "s");
    } catch (error) {
        console.error("Seeding Classes Error ❌", error);
    }
}
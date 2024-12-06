import { getCollection, getSubCollection, getTestUserUid } from "@database/server/lib/getters";
import { printProgress } from "@database/server/lib/util";
import type { tClasses, tSchedule } from "@database/server/lib/models";

const user_uid = await getTestUserUid();

const defaultSchedules: Record<string, tSchedule[]> = {
    'MAT024': [
        {
            type: 'Catedra',
            block_mode: true,
            blocks: ['1-2', '9-10'],
            day: 4,
            place: 'P101'
        }
    ],
    'FIS130': [
        {
            type: 'Catedra',
            block_mode: true,
            blocks: ['3-4'],
            day: 5,
            place: 'P101'
        }
    ],
};

const getClasses = async () => {
    const collection = getCollection('Classes');
    const classes = await collection.where('user_uid', '==', user_uid).get();
    return classes.docs;
};

export default async function SeedSched() {
    console.log("Seeding Schedules 🌱");
    const classes = await getClasses();
    const start = Date.now();
    let currentProgress = 0;
    try {

        for (const cls of classes) {
            //@ts-ignore
            const clsData: tClasses = cls.data();
            const schedCollection = getSubCollection(cls.ref, 'Schedule');
            for (const sched of defaultSchedules[clsData.name]) {
                await schedCollection.doc().set(sched);
            }
            currentProgress++;
            printProgress(currentProgress, classes.length);
        }
        console.log("\nSeeding Schedules Done ✅", (Date.now() - start) / 1000 + "s");
    }
    catch (error) {
        console.error("Seeding Schedules Error ❌", error);
    }

}

import { Classes, db, eq, Schedules, sql } from "astro:db";
import type { BlockTimeJson } from "../config";

const user_uid = process.env.PUBLIC_TEST_USER_UID ?? import.meta.env.PUBLIC_TEST_USER_UID;
const today = 2;
const today_name = 'Martes';
const block_mode = true;

interface QueryResult {
    class_name: string;
    sched_type: string;
    sched_place: string;
    sched_time: BlockTimeJson;
};

export default async function testTodaySched() {
    /**
     * QUERY
     */
    console.time('Query');
    const result = await db.select({
        class_name: Classes.name,
        sched_type: Schedules.type,
        sched_place: Schedules.place,
        sched_time: Schedules.time,
    })
        .from(Schedules)
        .where(sql`${Schedules.user_uid} = ${user_uid} AND ${Schedules.day} = ${today} AND ${Schedules.block_mode} = ${block_mode}`)
        .innerJoin(Classes, eq(Schedules.class_id, Classes.id)) as QueryResult[];
    console.timeEnd('Query');
    /**
     * MAP
     */
    console.time('Format into Map');
    const mapBlock: Map<string, Array<any>> = new Map();
    for (const sched of result) {
        for (const block of sched.sched_time.blocks) {
            if (!mapBlock.has(block)) {
                mapBlock.set(block, []);
            }
            mapBlock.get(block)!.push({
                class_name: sched.class_name,
                type: sched.sched_type,
                place: sched.sched_place,
            });
        }
    }
    console.timeEnd('Format into Map');
    /**
     * TABLE
     */
    console.log('Day:', today_name);
    console.table(mapBlock);
}

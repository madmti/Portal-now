import { db, Schedules, sql } from "astro:db";
import type { BlockTimeJson } from "../config";

const user_uid = process.env.PUBLIC_TEST_USER_UID ?? import.meta.env.PUBLIC_TEST_USER_UID;
const class_id = 1;
const class_name = 'MAT024';
const block_mode = true;

interface QueryResult {
    id: number;
    sched_type: string;
    sched_place: string;
    sched_day: number;
    sched_time: BlockTimeJson;
};

export default async function testWeekSched() {
    /**
     * QUERY
    */
    console.time('Query');
    const result = await db.select({
        id: Schedules.id,
        sched_type: Schedules.type,
        sched_place: Schedules.place,
        sched_day: Schedules.day,
        sched_time: Schedules.time,
    })
        .from(Schedules)
        .where(sql`${Schedules.user_uid} = ${user_uid} AND ${Schedules.class_id} = ${class_id} AND ${Schedules.block_mode} = ${block_mode}`) as QueryResult[];
    console.timeEnd('Query');
    /**
     * MAP
     */
    console.time('Format into Map');
    const mapDay: Map<number, Map<string, Array<any>>> = new Map();
    for (const sched of result) {
        const day = sched.sched_day;
        if (!mapDay.has(day)) {
            mapDay.set(day, new Map());
        }
        const day_map = mapDay.get(day)!;
        for (const block of sched.sched_time.blocks) {
            if (!day_map.has(block)) {
                day_map.set(block, []);
            }
            day_map.get(block)!.push({
                id: sched.id,
                type: sched.sched_type,
                place: sched.sched_place,
            });
        }
    }
    console.timeEnd('Format into Map');
    /**
     * TABLE
     */
    console.log('Class:', class_name);
    console.table(mapDay);
}

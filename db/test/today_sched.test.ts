import { Classes, db, eq, Schedules, sql } from "astro:db";

const user_uid = process.env.PUBLIC_TEST_USER_UID ?? import.meta.env.PUBLIC_TEST_USER_UID;

export default async function testTodaySched() {
    const today = 2;
    const result = await db.select({
        class_name: Classes.name,
        sched_type: Schedules.type,
        sched_place: Schedules.place,
        sched_block_mode: Schedules.block_mode,
        sched_time: Schedules.time,
    }).from(Schedules).where(sql`${Schedules.user_uid} = ${user_uid} AND ${Schedules.day} = ${today}`).innerJoin(Classes, eq(Schedules.class_id, Classes.id));
    console.log(result);
}

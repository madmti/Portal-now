import type { APIRoute } from "astro";
import { Classes, db, Schedules, sql } from "astro:db";

type Schedule = {
    sched_day: number;
    sched_type: string;
    sched_place: string;
    sched_block_mode: boolean;
    sched_time: string;
};

type Schedules = Schedule[];

type blockTime = {
    blocks: string[];
};

type ScheduleMap = Map<string, {
    user_uid: string;
    class_id: number;
    type: string;
    day: number;
    place: string;
    block_mode: boolean;
    time: blockTime;
}>;

interface ResData {
    class_name: string;
    fields: Schedules;
};

function addBlockToTime(time: blockTime, sched: Schedule): blockTime {
    const blocks = time.blocks;
    blocks.push(sched.sched_time);
    return { blocks };
}

function formatToModelMap(user_uid: string, class_id: number, block_mode: boolean, schedules: Schedules): ScheduleMap {
    const map: ScheduleMap = new Map();
    for (const schedule of schedules) {
        const { sched_type, sched_day, sched_place } = schedule;
        const key = `${sched_type}-${sched_day}-${sched_place}`;
        if (!map.has(key)) {
            map.set(key, {
                user_uid: user_uid,
                class_id,
                type: sched_type,
                day: sched_day,
                place: sched_place,
                block_mode: block_mode,
                time: { blocks: [] }

            });
        }
        const current = map.get(key)!;
        if (block_mode) {
            current.time = addBlockToTime(current.time, schedule);
        }
    }

    return map;
}


export const POST: APIRoute = async ({ request, redirect, locals }) => {
    const data = await request.json() as ResData;
    if (!data.class_name || !data.fields) {
        return new Response("Missing class_name or fields", { status: 400 });
    }
    const { user } = locals;

    try {
        const result = await db.select({ id: Classes.id })
            .from(Classes)
            .where(sql`${Classes.name} = ${data.class_name} AND ${Classes.user_uid} = ${user.uid}`)
        const class_id = result[0].id;

        const schedulesMap = formatToModelMap(user.uid, class_id, true, data.fields);
        const schedulesValues = Array.from(schedulesMap.values());

        await db.delete(Schedules)
            .where(sql`${Schedules.class_id} = ${class_id} AND ${Schedules.user_uid} = ${user.uid}`);

        for (const schedule of schedulesValues) {
            await db.insert(Schedules).values([schedule]);
        }

    } catch (error: any) {
        return new Response(error.message, { status: 500 });
    }

    return redirect(`/home/dashboard/clases/${data.class_name}/`);
};

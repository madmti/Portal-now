import type { APIRoute } from "astro";
import { Classes, db, Schedules, sql } from "astro:db";
type Schedule = {
    type: string;
    block: string;
    day: number;
    place: string;
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

function addBlockToTime(time: blockTime, sched: Schedule): blockTime {
    const blocks = time.blocks;
    blocks.push(sched.block);
    return { blocks };
}

function formatToModelMap(user_uid: string, class_id: number, block_mode: boolean, schedules: Schedules): ScheduleMap {
    const map: ScheduleMap = new Map();
    for (const schedule of schedules) {
        const { type, day, place } = schedule;
        const key = `${type}-${day}-${place}`;
        if (!map.has(key)) {
            map.set(key, {
                user_uid: user_uid,
                class_id,
                type,
                day,
                place,
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
    const formData = await request.formData();
    const name = formData.get('name')?.toString();
    const block_mode = JSON.parse(formData.get('block_mode')?.toString() || 'false');
    const schedules = JSON.parse(formData.get('schedules')?.toString() || '[]') as Schedules;

    if (!name) {
        return new Response('Name is required', { status: 400 });
    }

    const { user } = locals;

    const classExists = await db.select({ id: Classes.id }).from(Classes).where(sql`${Classes.name} = ${name} AND ${Classes.user_uid} = ${user.uid}`);

    if (classExists.length) {
        return new Response('Class already exists', { status: 400 });
    }

    try {
        const res = await db.insert(Classes).values([
            {
                user_uid: user.uid,
                name,
            }
        ]).returning({ id: Classes.id });

        const class_id = res[0].id;

        const schedulesMap = formatToModelMap(user.uid, class_id, block_mode, schedules);
        const schedulesValues = Array.from(schedulesMap.values());
        for (const schedule of schedulesValues) {
            await db.insert(Schedules).values([schedule]);
        }

    } catch (e) {
        return new Response('Error saving class', { status: 500 });
    }

    return redirect('/home/dashboard/clases/');
};

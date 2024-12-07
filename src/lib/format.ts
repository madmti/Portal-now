import type { tgetTodayScheduleRes } from "./database";
import type { tBloques } from "./time";


export type tTodaySchedToBlockMapRes = Map<tBloques, {
    class_name: string;
    sched_type: string;
    sched_place: string;
}[]>;
export const todaySchedToBlockMap = (schedule: tgetTodayScheduleRes): tTodaySchedToBlockMapRes => {
    const blockMap = new Map<tBloques, any>();
    for (const sched of schedule) {
        if (sched.sched_block_mode) {
            const blocks = sched.sched_time.blocks;
            for (const block of blocks) {
                if (!blockMap.has(block)) {
                    blockMap.set(block, []);
                }
                blockMap.get(block).push({
                    class_name: sched.class_name,
                    sched_type: sched.sched_type,
                    sched_place: sched.sched_place,
                });
            }
        }
    }
    return blockMap;
};


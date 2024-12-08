import type { tgetClassesInfoRes, tgetTodayScheduleRes } from "./database";
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

export const getClassesFromInfo = (classesInfo: tgetClassesInfoRes) => {
    return classesInfo.map((classInfo) => ({
        id: classInfo.class_id,
        name: classInfo.class_name,
    }));
};
export const getClassesMapFromInfo = (classesInfo: tgetClassesInfoRes) => {
    const classesMap = new Map<string, Record<'sched', Map<number, Set<tBloques>>>>();
    for (const classInfo of classesInfo) {
        if (!classesMap.has(classInfo.class_name)) {
            classesMap.set(classInfo.class_name, {
                sched: new Map(),
            });
        }
        const classSched = classesMap.get(classInfo.class_name)!.sched!;
        if (!classSched.has(classInfo.sched_day)) {
            classSched.set(classInfo.sched_day, new Set());
        }
        const schedDay = classSched.get(classInfo.sched_day)!;
        for (const block of classInfo.sched_time.blocks) {
            schedDay.add(block);
        }
    }
    return classesMap;
};
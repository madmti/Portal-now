import { defineDb, defineTable, column } from 'astro:db';

export type BlockTimeJson = {
  blocks: string[];
};

/**
 * @field user_uid - from firebase auth
 * @field name - max 10 characters
 */
const Classes = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    user_uid: column.text({ multiline: false }),
    name: column.text({ multiline: false }),
  }
})

/**
 * @field user_uid - from firebase auth
 * @field class_id - reference to Classes
 * @field time - JSON object depdending on block_mode
 */
const Schedules = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    user_uid: column.text(),
    class_id: column.number({ references: () => Classes.columns.id }),
    type: column.text({ multiline: false }),
    day: column.number(),
    place: column.text({ multiline: false }),
    block_mode: column.boolean(),
    time: column.json(),
  },
});

export default defineDb({
  tables: { Classes, Schedules },
})

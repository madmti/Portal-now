import { defineDb, defineTable, column } from 'astro:db';

export type BlockTimeJson = {
  blocks: string[];
};

const Classes = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    user_uid: column.text(),
    name: column.text(),
  }
})

const Schedules = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    class_id: column.number({ references: () => Classes.columns.id }),
    type: column.text(),
    day: column.number(),
    place: column.text(),
    block_mode: column.boolean(),
    time: column.json(),
  },
});

export default defineDb({
  tables: { Classes, Schedules },
})

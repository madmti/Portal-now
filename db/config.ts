import { defineDb, defineTable, column } from 'astro:db';

export interface UserPreferences {
  show_plugins_names: boolean;
}

const default_plugins: string[] = [];
const default_preferences: Record<string, any> = {
  show_plugins_names: true,
};

const Users = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    plugins: column.json({ default: default_plugins }),
    preferences: column.json({ default: default_preferences })
  }
});

const PluginStorage = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    user_uid: column.text({ references: () => Users.columns.id }),
    storage_group: column.text(),
    data: column.json({ default: {} })
  }
});

export default defineDb({
  tables: { Users, PluginStorage },
})

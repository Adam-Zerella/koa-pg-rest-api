import { TABLES } from '@modules/db/constants';

import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TABLES.TODO, function (tbl) {
    tbl.uuid('id').defaultTo(knex.raw('gen_random_uuid()')).primary();
    // tbl.enum('name', roles).unique().notNullable();
    tbl.string('label');
    tbl.specificType('type', 'todo_type');
    tbl.boolean('is_enabled');
    // tbl
    // .uuid('todo_id')
    // .notNullable()
    // .references('id')
    // .inTable(TABLES.TODO)
    // .onDelete('CASCADE');
    tbl.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(TABLES.TODO);
}

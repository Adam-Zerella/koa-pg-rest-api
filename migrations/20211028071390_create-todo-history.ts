import { TABLES } from '@modules/db/constants';

import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TABLES.TODO_HISTORY, function (tbl) {
    tbl.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    tbl.string('type').notNullable();
    tbl.jsonb('after');
    tbl.jsonb('before');
    tbl.datetime('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(TABLES.TODO_HISTORY);
}

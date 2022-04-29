import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw('ALTER DATABASE postgres SET timezone TO "Australia/Adelaide"');
}

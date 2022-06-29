import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("menu", function (table: Knex.TableBuilder) {
    table.increments("id").primary();
    table.string("menu", 64);
    table.integer("amount_of_money");
    table.time("treatment_time");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("menu");
}

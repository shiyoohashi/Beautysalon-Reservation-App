import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(
    "customer",
    function (table: Knex.TableBuilder) {
      table.increments("id").primary();
      table.string("name", 64);
      table.string("mail", 64);
    }
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("customer");
}

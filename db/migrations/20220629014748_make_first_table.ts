import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(
    "reserve_info",
    function (table: Knex.TableBuilder) {
      table.increments("id").primary();
      table.date("date").notNullable;
      table.time("time").notNullable;
      table.integer("menu_id").notNullable;
      table.integer("stylist_id").notNullable;
      table.integer("customer_id").notNullable;
    }
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("reserve_info");
}

import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(
    "reserve_info",
    function (table: Knex.TableBuilder) {
      table.foreign("menu_id").references("id").inTable("menu");
      table.foreign("stylist_id").references("id").inTable("stylist");
      table.foreign("customer_id").references("id").inTable("customer");
    }
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(
    "reserve_info",
    function (table: Knex.TableBuilder) {
      table.dropForeign("menu_id");
      table.dropForeign("stylist_id");
      table.dropForeign("customer_id");
    }
  );
}

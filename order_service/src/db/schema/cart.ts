import { InferInsertModel } from 'drizzle-orm';
import { pgTable, timestamp, serial, integer } from 'drizzle-orm/pg-core';

export const carts = pgTable("carts", {
  id: serial('id').primaryKey(),
  customerId: integer('customer_id').notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export type Cart = InferInsertModel<typeof carts>
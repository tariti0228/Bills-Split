import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const events = sqliteTable('events', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  date: text('date').notNull(),
});

export const participants = sqliteTable('participants', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  eventId: integer('event_id').notNull().references(() => events.id),
  name: text('name').notNull(),
});

export const payments = sqliteTable('payments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  eventId: integer('event_id').notNull().references(() => events.id),
  payerId: integer('payer_id').notNull().references(() => participants.id),
  amount: real('amount').notNull(),
  description: text('description').notNull(),
  date: text('date').notNull(),
  recipients: text('recipients').notNull(),
}); 
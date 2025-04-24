import * as SQLite from 'expo-sqlite';
import * as schema from '../../db/schema';
import { router } from 'expo-router';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { eq } from 'drizzle-orm';

// Initialize database
const expoDb = SQLite.openDatabaseSync('db.db');
const db = drizzle(expoDb, { schema });

export type Event = {
  id: number;
  name: string;
  date: string;
};

export type Participant = {
  id: number;
  name: string;
  eventId: number;
};

export type EventWithParticipants = Event & {
  participants: Participant[];
};

export async function createEvent(
  eventName: string,
  eventDate: string,
  participants: string[]
) {
  try {
    const [event] = await db.insert(schema.events).values({
      name: eventName,
      date: eventDate,
    }).returning();
    
    if (participants.length > 0) {
      await db.insert(schema.participants).values(
        participants.map(name => ({
          name: name.trim(),
          eventId: event.id,
        }))
      );
    }

    router.back();
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
}

export function useEventsWithParticipants() {
  const { data } = useLiveQuery(
    db.select()
      .from(schema.events)
      .leftJoin(schema.participants, eq(schema.events.id, schema.participants.eventId))
  );

  return { data };
}

export default function EventModule() {
  return null;
} 
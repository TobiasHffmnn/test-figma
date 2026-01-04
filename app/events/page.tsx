import { EventsListClient } from '@/components/events/EventsListClient';
import { fetchFromSanity } from '@/lib/sanity';
import { eventsListQuery } from '@/lib/queries';
import { Event } from '@/types/content';
import mockEvents from '@/data/mock/events.json';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Events - The Place 2B',
  description: 'Discover and join amazing events in your area and beyond.',
};

export const revalidate = 1800; // Revalidate every 30 minutes

async function getEvents(): Promise<Event[]> {
  const events = await fetchFromSanity<Event[]>(
    eventsListQuery,
    {},
    mockEvents as Event[]
  );
  return events;
}

export default async function EventsPage() {
  const events = await getEvents();

  return <EventsListClient events={events} />;
}

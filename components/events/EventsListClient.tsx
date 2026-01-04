'use client';

import { useState, useMemo } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
} from '@mui/material';
import { EventCard } from '@/components/events/EventCard';
import { EventFilters, EventFilterState } from '@/components/events/EventFilters';
import { Event } from '@/types/content';

interface EventsListClientProps {
  events: Event[];
}

export function EventsListClient({ events }: EventsListClientProps) {
  const [filters, setFilters] = useState<EventFilterState>({
    search: '',
    eventType: '',
    tag: '',
  });

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch =
          event.title.toLowerCase().includes(searchLower) ||
          event.location?.toLowerCase().includes(searchLower) ||
          event.description?.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Event type filter
      if (filters.eventType && event.eventType !== filters.eventType) {
        return false;
      }

      // Tag filter
      if (filters.tag) {
        if (!event.tags || !event.tags.includes(filters.tag)) {
          return false;
        }
      }

      return true;
    });
  }, [events, filters]);

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: { xs: 6, md: 8 },
          mb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '3rem' },
            }}
          >
            Discover Events
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.95 }}>
            Find and join amazing events in your area and beyond
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <EventFilters onFilterChange={setFilters} />

        {filteredEvents.length > 0 ? (
          <Grid container spacing={4}>
            {filteredEvents.map((event) => (
              <Grid item xs={12} sm={6} md={4} key={event._id}>
                <EventCard event={event} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No events found matching your filters
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Try adjusting your search criteria
            </Typography>
          </Box>
        )}
      </Container>
    </>
  );
}

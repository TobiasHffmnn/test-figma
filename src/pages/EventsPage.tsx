/**
 * Events Page Component
 * Displays a list of all events
 */

import {
  Container,
  Typography,
  Box,
  Grid,
} from '@mui/material';
import { EventCard } from '@/components/events/EventCard';
import { Event } from '@/types/content';
import mockEvents from '@/data/mock/events.json';

/**
 * EventsPage displays all available events in a grid layout
 * Future enhancements could include filtering and search
 */
export default function EventsPage() {
  // Load all events from mock data
  const events = mockEvents as Event[];

  return (
    <>
      {/* Page Header */}
      <Box
        sx={{
          backgroundColor: 'primary.main',
          color: 'white',
          py: { xs: 6, md: 8 },
          mb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 700,
              textAlign: 'center',
            }}
          >
            All Events
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mt: 2,
              textAlign: 'center',
              opacity: 0.9,
            }}
          >
            Discover and join exciting events
          </Typography>
        </Container>
      </Box>

      {/* Events Grid */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={4}>
          {events.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event._id}>
              <EventCard event={event} />
            </Grid>
          ))}
        </Grid>

        {/* Show message if no events */}
        {events.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h5" color="text.secondary">
              No events available at the moment
            </Typography>
          </Box>
        )}
      </Container>
    </>
  );
}

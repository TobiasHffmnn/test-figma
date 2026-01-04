import {
  Container,
  Typography,
  Box,
  Chip,
  Stack,
  Button,
  Paper,
  Divider,
} from '@mui/material';
import { fetchFromSanity } from '@/lib/sanity';
import { eventBySlugQuery } from '@/lib/queries';
import { Event } from '@/types/content';
import mockEvents from '@/data/mock/events.json';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import Image from 'next/image';
import { getImageUrl } from '@/lib/image';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PlaceIcon from '@mui/icons-material/Place';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import LinkIcon from '@mui/icons-material/Link';
import type { Metadata } from 'next';

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug);
  
  if (!event) {
    return {
      title: 'Event Not Found',
    };
  }

  return {
    title: `${event.title} - The Place 2B`,
    description: event.excerpt || event.description,
  };
}

async function getEvent(slug: string): Promise<Event | null> {
  const event = await fetchFromSanity<Event | null>(
    eventBySlugQuery,
    { slug },
    mockEvents.find((e) => e.slug.current === slug) as Event || null
  );
  return event;
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = await getEvent(slug);

  if (!event) {
    notFound();
  }

  const imageUrl = getImageUrl(event.mainImage, 1200);
  const startDate = format(new Date(event.startDate), 'EEEE, MMMM dd, yyyy');
  const startTime = format(new Date(event.startDate), 'h:mm a');
  const endTime = event.endDate ? format(new Date(event.endDate), 'h:mm a') : null;

  return (
    <>
      {/* Hero Image */}
      {imageUrl ? (
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: { xs: 300, md: 500 },
            backgroundColor: 'background.paper',
          }}
        >
          <Image
            src={imageUrl}
            alt={event.mainImage?.alt || event.title}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </Box>
      ) : (
        <Box
          sx={{
            width: '100%',
            height: { xs: 300, md: 500 },
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h1" color="white" sx={{ fontWeight: 700 }}>
            {event.title.charAt(0)}
          </Typography>
        </Box>
      )}

      <Container maxWidth="md" sx={{ py: 6 }}>
        {/* Tags */}
        {event.tags && event.tags.length > 0 && (
          <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}>
            {event.tags.map((tag) => (
              <Chip key={tag} label={tag} color="primary" />
            ))}
          </Stack>
        )}

        {/* Title */}
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          {event.title}
        </Typography>

        {/* Event Details Card */}
        <Paper elevation={0} sx={{ p: 3, mb: 4, backgroundColor: 'background.paper' }}>
          <Stack spacing={2.5}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <CalendarTodayIcon sx={{ color: 'primary.main', mt: 0.5 }} />
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {startDate}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {startTime}
                  {endTime && ` - ${endTime}`}
                </Typography>
              </Box>
            </Box>

            {event.location && (
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <PlaceIcon sx={{ color: 'primary.main', mt: 0.5 }} />
                <Typography variant="body1">{event.location}</Typography>
              </Box>
            )}

            {event.organizer && (
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <PersonIcon sx={{ color: 'primary.main', mt: 0.5 }} />
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                    Organized by
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {event.organizer}
                  </Typography>
                </Box>
              </Box>
            )}

            {event.capacity && (
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <GroupIcon sx={{ color: 'primary.main', mt: 0.5 }} />
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                    Capacity
                  </Typography>
                  <Typography variant="body1">{event.capacity} attendees</Typography>
                </Box>
              </Box>
            )}

            {event.eventType && (
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <LinkIcon sx={{ color: 'primary.main', mt: 0.5 }} />
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                    Event Type
                  </Typography>
                  <Typography variant="body1">{event.eventType}</Typography>
                </Box>
              </Box>
            )}
          </Stack>

          {event.registrationUrl && (
            <>
              <Divider sx={{ my: 3 }} />
              <Button
                variant="contained"
                size="large"
                fullWidth
                href={event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ py: 1.5 }}
              >
                Register for Event
              </Button>
            </>
          )}
        </Paper>

        {/* Description */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
            About This Event
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
            {event.description || event.excerpt}
          </Typography>
        </Box>

        {/* Additional Info */}
        {event.url && (
          <Paper elevation={0} sx={{ p: 3, backgroundColor: 'background.paper' }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              For more information, visit:
            </Typography>
            <Button
              component="a"
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<LinkIcon />}
            >
              Event Website
            </Button>
          </Paper>
        )}
      </Container>
    </>
  );
}

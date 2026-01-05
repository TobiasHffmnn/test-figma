/**
 * EventCard Component
 * Displays a single event in a card format
 * Shows event image, title, date, location, and tags
 */

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Stack,
} from '@mui/material';
import { Event } from '@/types/content';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { getImageUrl } from '@/lib/image';
import PlaceIcon from '@mui/icons-material/Place';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

interface EventCardProps {
  event: Event;
}

/**
 * EventCard displays event information in an attractive card format
 * Includes hover effects and responsive design
 */
export function EventCard({ event }: EventCardProps) {
  // Get the image URL (if available)
  const imageUrl = getImageUrl(event.mainImage, 800);
  
  // Format the event date in a readable format
  const eventDate = format(new Date(event.startDate), 'MMM dd, yyyy');
  
  return (
    <Card
      component={Link}
      to={`/events/${event.slug.current}`}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)', // Lift card on hover
        },
      }}
    >
      {/* Event image or placeholder */}
      {imageUrl ? (
        <CardMedia
          component="img"
          height="200"
          image={imageUrl}
          alt={event.mainImage?.alt || event.title}
          sx={{ objectFit: 'cover' }}
        />
      ) : (
        /* Fallback if no image - show colored box with first letter */
        <Box
          sx={{
            height: 200,
            backgroundColor: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h3" color="white">
            {event.title.charAt(0)}
          </Typography>
        </Box>
      )}
      
      {/* Event details */}
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Event tags */}
        <Box sx={{ mb: 2 }}>
          {event.tags && event.tags.length > 0 && (
            <Stack direction="row" spacing={1} sx={{ mb: 1, flexWrap: 'wrap', gap: 1 }}>
              {/* Show up to 3 tags */}
              {event.tags.slice(0, 3).map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Stack>
          )}
        </Box>

        {/* Event title - truncate if too long */}
        <Typography
          variant="h6"
          component="h3"
          gutterBottom
          sx={{
            fontWeight: 600,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {event.title}
        </Typography>

        {/* Event excerpt/description */}
        {event.excerpt && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {event.excerpt}
          </Typography>
        )}

        {/* Event date and location - pushed to bottom of card */}
        <Box sx={{ mt: 'auto' }}>
          <Stack spacing={1}>
            {/* Date */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CalendarTodayIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                {eventDate}
              </Typography>
            </Box>
            {/* Location */}
            {event.location && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PlaceIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {event.location}
                </Typography>
              </Box>
            )}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}

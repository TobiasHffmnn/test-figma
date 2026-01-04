'use client';

import { useState } from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Stack,
  Chip,
} from '@mui/material';

interface EventFiltersProps {
  onFilterChange: (filters: EventFilterState) => void;
}

export interface EventFilterState {
  search: string;
  eventType: string;
  tag: string;
}

const eventTypes = [
  { value: '', label: 'All Types' },
  { value: 'Conference', label: 'Conference' },
  { value: 'Workshop', label: 'Workshop' },
  { value: 'Meetup', label: 'Meetup' },
];

const popularTags = [
  'technology',
  'design',
  'conference',
  'workshop',
  'networking',
  'web',
  'react',
  'ai',
  'ux',
];

export function EventFilters({ onFilterChange }: EventFiltersProps) {
  const [filters, setFilters] = useState<EventFilterState>({
    search: '',
    eventType: '',
    tag: '',
  });

  const handleFilterChange = (key: keyof EventFilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleTagClick = (tag: string) => {
    const newTag = filters.tag === tag ? '' : tag;
    handleFilterChange('tag', newTag);
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            fullWidth
            label="Search events"
            variant="outlined"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            placeholder="Search by title or location..."
          />
          <TextField
            select
            label="Event Type"
            value={filters.eventType}
            onChange={(e) => handleFilterChange('eventType', e.target.value)}
            sx={{ minWidth: 200 }}
          >
            {eventTypes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Stack>

        <Box>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {popularTags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                onClick={() => handleTagClick(tag)}
                color={filters.tag === tag ? 'primary' : 'default'}
                variant={filters.tag === tag ? 'filled' : 'outlined'}
                sx={{ mb: 1 }}
              />
            ))}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

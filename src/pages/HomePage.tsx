/**
 * Home Page Component
 * The landing page that users see when they first visit the site
 * Features hero section, featured events, and featured blog posts
 */

import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Paper,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { EventCard } from '@/components/events/EventCard';
import { BlogCard } from '@/components/blog/BlogCard';
import { Event, BlogPost } from '@/types/content';
import mockEvents from '@/data/mock/events.json';
import mockBlog from '@/data/mock/blog.json';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

/**
 * HomePage displays the main landing page with:
 * - Hero section with welcome message
 * - Featured events section
 * - Featured blog posts section
 * - Call-to-action section
 */
export default function HomePage() {
  // Get first 3 events for featured section
  const featuredEvents = mockEvents.slice(0, 3) as Event[];
  
  // Get featured blog posts (or first 3 if none marked as featured)
  const featuredPosts = (mockBlog.filter((post) => post.featured).slice(0, 3).length > 0
    ? mockBlog.filter((post) => post.featured).slice(0, 3)
    : mockBlog.slice(0, 3)) as BlogPost[];

  return (
    <>
      {/* Hero Section - Eye-catching introduction with gradient background */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: { xs: 8, md: 12 }, // Different padding for mobile vs desktop
          mb: 8,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: 800, mx: 'auto', textAlign: 'center' }}>
            {/* Main heading */}
            <Typography
              variant="h1"
              component="h1"
              gutterBottom
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' }, // Responsive font size
                fontWeight: 700,
                mb: 3,
              }}
            >
              Welcome to The Place 2B
            </Typography>
            
            {/* Subheading */}
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                opacity: 0.95,
                fontWeight: 400,
              }}
            >
              Discover amazing events, connect with like-minded people, and stay inspired with our latest blog posts.
            </Typography>
            
            {/* Call-to-action buttons */}
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                component={Link}
                to="/events"
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: 'white',
                  color: 'primary.main',
                  px: 4,
                  py: 1.5,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  },
                }}
              >
                Explore Events
              </Button>
              <Button
                component={Link}
                to="/blog"
                variant="outlined"
                size="large"
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                Read Blog
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Featured Events Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        {/* Section header with "View All" button */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h3" component="h2" sx={{ fontWeight: 700 }}>
            Featured Events
          </Typography>
          {/* Hide on mobile, show on desktop */}
          <Button
            component={Link}
            to="/events"
            endIcon={<ArrowForwardIcon />}
            sx={{ display: { xs: 'none', sm: 'flex' } }}
          >
            View All
          </Button>
        </Box>
        
        {/* Grid of event cards */}
        <Grid container spacing={4}>
          {featuredEvents.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event._id}>
              <EventCard event={event} />
            </Grid>
          ))}
        </Grid>
        
        {/* Mobile-only "View All" button */}
        <Box sx={{ mt: 3, textAlign: 'center', display: { xs: 'block', sm: 'none' } }}>
          <Button
            component={Link}
            to="/events"
            endIcon={<ArrowForwardIcon />}
          >
            View All Events
          </Button>
        </Box>
      </Container>

      {/* Featured Blog Posts Section - with gray background */}
      <Box sx={{ backgroundColor: 'background.paper', py: 8 }}>
        <Container maxWidth="lg">
          {/* Section header with "View All" button */}
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h3" component="h2" sx={{ fontWeight: 700 }}>
              Latest from Blog
            </Typography>
            <Button
              component={Link}
              to="/blog"
              endIcon={<ArrowForwardIcon />}
              sx={{ display: { xs: 'none', sm: 'flex' } }}
            >
              View All
            </Button>
          </Box>
          
          {/* Grid of blog post cards */}
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post._id}>
                <BlogCard post={post} />
              </Grid>
            ))}
          </Grid>
          
          {/* Mobile-only "View All" button */}
          <Box sx={{ mt: 3, textAlign: 'center', display: { xs: 'block', sm: 'none' } }}>
            <Button
              component={Link}
              to="/blog"
              endIcon={<ArrowForwardIcon />}
            >
              View All Posts
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Call-to-Action Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, md: 6 }, // Responsive padding
            textAlign: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            borderRadius: 3,
          }}
        >
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
            Join Our Community
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, opacity: 0.95 }}>
            Stay updated with the latest events and blog posts. Be part of something special.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: 'white',
              color: 'primary.main',
              px: 4,
              py: 1.5,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
              },
            }}
          >
            Get Started
          </Button>
        </Paper>
      </Container>
    </>
  );
}

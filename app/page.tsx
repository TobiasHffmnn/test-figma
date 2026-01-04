import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Paper,
} from '@mui/material';
import Link from 'next/link';
import { EventCard } from '@/components/events/EventCard';
import { BlogCard } from '@/components/blog/BlogCard';
import { fetchFromSanity } from '@/lib/sanity';
import { featuredEventsQuery, featuredBlogPostsQuery } from '@/lib/queries';
import { Event, BlogPost } from '@/types/content';
import mockEvents from '@/data/mock/events.json';
import mockBlog from '@/data/mock/blog.json';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export const revalidate = 3600; // Revalidate every hour

async function getFeaturedEvents(): Promise<Event[]> {
  const events = await fetchFromSanity<Event[]>(
    featuredEventsQuery,
    {},
    mockEvents.slice(0, 3) as Event[]
  );
  return events;
}

async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  const posts = await fetchFromSanity<BlogPost[]>(
    featuredBlogPostsQuery,
    {},
    mockBlog.filter((post) => post.featured).slice(0, 3) as BlogPost[]
  );
  return posts;
}

export default async function HomePage() {
  const [featuredEvents, featuredPosts] = await Promise.all([
    getFeaturedEvents(),
    getFeaturedBlogPosts(),
  ]);

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          mb: 8,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: 800, mx: 'auto', textAlign: 'center' }}>
            <Typography
              variant="h1"
              component="h1"
              gutterBottom
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 700,
                mb: 3,
              }}
            >
              Welcome to The Place 2B
            </Typography>
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
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                component={Link}
                href="/events"
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
                href="/blog"
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
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h3" component="h2" sx={{ fontWeight: 700 }}>
            Featured Events
          </Typography>
          <Button
            component={Link}
            href="/events"
            endIcon={<ArrowForwardIcon />}
            sx={{ display: { xs: 'none', sm: 'flex' } }}
          >
            View All
          </Button>
        </Box>
        <Grid container spacing={4}>
          {featuredEvents.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event._id}>
              <EventCard event={event} />
            </Grid>
          ))}
        </Grid>
        <Box sx={{ mt: 3, textAlign: 'center', display: { xs: 'block', sm: 'none' } }}>
          <Button
            component={Link}
            href="/events"
            endIcon={<ArrowForwardIcon />}
          >
            View All Events
          </Button>
        </Box>
      </Container>

      {/* Featured Blog Posts Section */}
      <Box sx={{ backgroundColor: 'background.paper', py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h3" component="h2" sx={{ fontWeight: 700 }}>
              Latest from Blog
            </Typography>
            <Button
              component={Link}
              href="/blog"
              endIcon={<ArrowForwardIcon />}
              sx={{ display: { xs: 'none', sm: 'flex' } }}
            >
              View All
            </Button>
          </Box>
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post._id}>
                <BlogCard post={post} />
              </Grid>
            ))}
          </Grid>
          <Box sx={{ mt: 3, textAlign: 'center', display: { xs: 'block', sm: 'none' } }}>
            <Button
              component={Link}
              href="/blog"
              endIcon={<ArrowForwardIcon />}
            >
              View All Posts
            </Button>
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, md: 6 },
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

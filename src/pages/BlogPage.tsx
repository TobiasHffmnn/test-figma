/**
 * Blog Page Component
 * Displays a list of all blog posts
 */

import {
  Container,
  Typography,
  Box,
  Grid,
} from '@mui/material';
import { BlogCard } from '@/components/blog/BlogCard';
import { BlogPost } from '@/types/content';
import mockBlog from '@/data/mock/blog.json';

/**
 * BlogPage displays all available blog posts in a grid layout
 * Future enhancements could include filtering by category and search
 */
export default function BlogPage() {
  // Load all blog posts from mock data
  const posts = mockBlog as BlogPost[];

  return (
    <>
      {/* Page Header */}
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
            sx={{
              fontWeight: 700,
              textAlign: 'center',
            }}
          >
            Our Blog
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mt: 2,
              textAlign: 'center',
              opacity: 0.9,
            }}
          >
            Insights, stories, and ideas from our community
          </Typography>
        </Container>
      </Box>

      {/* Blog Posts Grid */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={4}>
          {posts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post._id}>
              <BlogCard post={post} />
            </Grid>
          ))}
        </Grid>

        {/* Show message if no posts */}
        {posts.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h5" color="text.secondary">
              No blog posts available at the moment
            </Typography>
          </Box>
        )}
      </Container>
    </>
  );
}

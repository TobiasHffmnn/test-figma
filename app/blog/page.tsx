import {
  Container,
  Typography,
  Box,
  Grid,
} from '@mui/material';
import { BlogCard } from '@/components/blog/BlogCard';
import { fetchFromSanity } from '@/lib/sanity';
import { blogPostsListQuery } from '@/lib/queries';
import { BlogPost } from '@/types/content';
import mockBlog from '@/data/mock/blog.json';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - The Place 2B',
  description: 'Read insightful articles and stay updated with the latest trends.',
};

export const revalidate = 1800; // Revalidate every 30 minutes

async function getBlogPosts(): Promise<BlogPost[]> {
  const posts = await fetchFromSanity<BlogPost[]>(
    blogPostsListQuery,
    {},
    mockBlog as BlogPost[]
  );
  return posts;
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

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
            Blog
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.95 }}>
            Insights, tutorials, and stories from our community
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {posts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post._id}>
              <BlogCard post={post} />
            </Grid>
          ))}
        </Grid>

        {posts.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No blog posts available yet
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Check back soon for new content!
            </Typography>
          </Box>
        )}
      </Container>
    </>
  );
}

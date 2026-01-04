import {
  Container,
  Typography,
  Box,
  Chip,
  Stack,
  Avatar,
  Divider,
} from '@mui/material';
import { fetchFromSanity } from '@/lib/sanity';
import { blogPostBySlugQuery } from '@/lib/queries';
import { BlogPost } from '@/types/content';
import mockBlog from '@/data/mock/blog.json';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import Image from 'next/image';
import { getImageUrl } from '@/lib/image';
import { PortableTextRenderer } from '@/components/portable/PortableTextRenderer';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import type { Metadata } from 'next';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} - The Place 2B`,
    description: post.excerpt,
  };
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const post = await fetchFromSanity<BlogPost | null>(
    blogPostBySlugQuery,
    { slug },
    mockBlog.find((p) => p.slug.current === slug) as BlogPost || null
  );
  return post;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const imageUrl = getImageUrl(post.mainImage, 1200);
  const publishDate = format(new Date(post.publishedAt), 'MMMM dd, yyyy');

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
            alt={post.mainImage?.alt || post.title}
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
            {post.title.charAt(0)}
          </Typography>
        </Box>
      )}

      <Container maxWidth="md" sx={{ py: 6 }}>
        {/* Categories */}
        {post.categories && post.categories.length > 0 && (
          <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}>
            {post.categories.map((category) => (
              <Chip key={category} label={category} color="secondary" />
            ))}
          </Stack>
        )}

        {/* Title */}
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
          {post.title}
        </Typography>

        {/* Excerpt */}
        {post.excerpt && (
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ mb: 4, fontWeight: 400, lineHeight: 1.6 }}
          >
            {post.excerpt}
          </Typography>
        )}

        {/* Author Info */}
        <Box sx={{ mb: 4 }}>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{ mb: 3 }}
          >
            {post.author && (
              <>
                <Avatar sx={{ width: 56, height: 56 }}>
                  {post.author.name.charAt(0)}
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {post.author.name}
                  </Typography>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography variant="body2" color="text.secondary">
                      {publishDate}
                    </Typography>
                    {post.readTime && (
                      <>
                        <Typography variant="body2" color="text.secondary">
                          •
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <AccessTimeIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {post.readTime} min read
                          </Typography>
                        </Box>
                      </>
                    )}
                  </Stack>
                </Box>
              </>
            )}
          </Stack>
          {post.author?.bio && (
            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              {post.author.bio}
            </Typography>
          )}
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Content */}
        <Box
          sx={{
            '& img': {
              maxWidth: '100%',
              height: 'auto',
              borderRadius: 2,
            },
            '& a': {
              color: 'primary.main',
              textDecoration: 'underline',
            },
            '& pre': {
              overflowX: 'auto',
            },
          }}
        >
          <PortableTextRenderer value={post.body} />
        </Box>

        <Divider sx={{ my: 6 }} />

        {/* Author Bio at bottom */}
        {post.author && (
          <Box
            sx={{
              p: 3,
              backgroundColor: 'background.paper',
              borderRadius: 2,
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar sx={{ width: 64, height: 64 }}>
                {post.author.name.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {post.author.name}
                </Typography>
                {post.author.bio && (
                  <Typography variant="body2" color="text.secondary">
                    {post.author.bio}
                  </Typography>
                )}
              </Box>
            </Stack>
          </Box>
        )}
      </Container>
    </>
  );
}

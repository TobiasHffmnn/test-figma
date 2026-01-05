/**
 * BlogCard Component
 * Displays a single blog post in a card format
 * Shows post image, title, excerpt, author, date, and categories
 */

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Stack,
  Avatar,
} from '@mui/material';
import { BlogPost } from '@/types/content';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { getImageUrl } from '@/lib/image';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface BlogCardProps {
  post: BlogPost;
}

/**
 * BlogCard displays blog post information in an attractive card format
 * Includes hover effects and responsive design
 */
export function BlogCard({ post }: BlogCardProps) {
  // Get the image URL (if available)
  const imageUrl = getImageUrl(post.mainImage, 800);
  
  // Format the publish date in a readable format
  const publishDate = format(new Date(post.publishedAt), 'MMM dd, yyyy');
  
  return (
    <Card
      component={Link}
      to={`/blog/${post.slug.current}`}
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
      {/* Blog post image or placeholder */}
      {imageUrl ? (
        <CardMedia
          component="img"
          height="240"
          image={imageUrl}
          alt={post.mainImage?.alt || post.title}
          sx={{ objectFit: 'cover' }}
        />
      ) : (
        /* Fallback if no image - show gradient with first letter */
        <Box
          sx={{
            height: 240,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h2" color="white" sx={{ fontWeight: 700 }}>
            {post.title.charAt(0)}
          </Typography>
        </Box>
      )}
      
      {/* Blog post content */}
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Category tags */}
        <Box sx={{ mb: 2 }}>
          {post.categories && post.categories.length > 0 && (
            <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
              {/* Show up to 2 categories */}
              {post.categories.slice(0, 2).map((category) => (
                <Chip
                  key={category}
                  label={category}
                  size="small"
                  color="secondary"
                  variant="outlined"
                />
              ))}
            </Stack>
          )}
        </Box>

        {/* Post title - truncate if too long */}
        <Typography
          variant="h5"
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
          {post.title}
        </Typography>

        {/* Post excerpt - truncate if too long */}
        {post.excerpt && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              flexGrow: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {post.excerpt}
          </Typography>
        )}

        {/* Author and metadata section */}
        <Box sx={{ mt: 'auto', pt: 2, borderTop: 1, borderColor: 'divider' }}>
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
            {/* Author info */}
            {post.author && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {/* Author avatar with first letter of name */}
                <Avatar
                  sx={{ width: 32, height: 32, fontSize: '0.875rem' }}
                  alt={post.author.name}
                >
                  {post.author.name.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 500 }}>
                    {post.author.name}
                  </Typography>
                  <Typography variant="caption" display="block" color="text.secondary">
                    {publishDate}
                  </Typography>
                </Box>
              </Box>
            )}
            {/* Read time */}
            {post.readTime && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <AccessTimeIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography variant="caption" color="text.secondary">
                  {post.readTime} min
                </Typography>
              </Box>
            )}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}

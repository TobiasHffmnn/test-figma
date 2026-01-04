'use client';

import { PortableText, PortableTextComponents } from '@portabletext/react';
import { Box, Typography } from '@mui/material';
import { PortableTextBlock } from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';
import { getImageUrl } from '@/lib/image';
import { SanityImage } from '@/types/content';

interface PortableTextRendererProps {
  value: PortableTextBlock[];
}

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <Typography variant="h1" component="h1" gutterBottom sx={{ mt: 4, mb: 2 }}>
        {children}
      </Typography>
    ),
    h2: ({ children }) => (
      <Typography variant="h2" component="h2" gutterBottom sx={{ mt: 4, mb: 2 }}>
        {children}
      </Typography>
    ),
    h3: ({ children }) => (
      <Typography variant="h3" component="h3" gutterBottom sx={{ mt: 3, mb: 2 }}>
        {children}
      </Typography>
    ),
    h4: ({ children }) => (
      <Typography variant="h4" component="h4" gutterBottom sx={{ mt: 3, mb: 1.5 }}>
        {children}
      </Typography>
    ),
    h5: ({ children }) => (
      <Typography variant="h5" component="h5" gutterBottom sx={{ mt: 2, mb: 1.5 }}>
        {children}
      </Typography>
    ),
    h6: ({ children }) => (
      <Typography variant="h6" component="h6" gutterBottom sx={{ mt: 2, mb: 1 }}>
        {children}
      </Typography>
    ),
    normal: ({ children }) => (
      <Typography variant="body1" paragraph sx={{ mb: 2 }}>
        {children}
      </Typography>
    ),
    blockquote: ({ children }) => (
      <Box
        component="blockquote"
        sx={{
          borderLeft: 4,
          borderColor: 'primary.main',
          pl: 3,
          py: 1,
          my: 3,
          fontStyle: 'italic',
          backgroundColor: 'background.paper',
          borderRadius: 1,
        }}
      >
        <Typography variant="body1">{children}</Typography>
      </Box>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <Box component="ul" sx={{ pl: 4, my: 2 }}>
        {children}
      </Box>
    ),
    number: ({ children }) => (
      <Box component="ol" sx={{ pl: 4, my: 2 }}>
        {children}
      </Box>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
        {children}
      </Typography>
    ),
    number: ({ children }) => (
      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
        {children}
      </Typography>
    ),
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => (
      <Box
        component="code"
        sx={{
          backgroundColor: 'grey.100',
          color: 'error.dark',
          px: 1,
          py: 0.5,
          borderRadius: 1,
          fontSize: '0.875em',
          fontFamily: 'monospace',
        }}
      >
        {children}
      </Box>
    ),
    link: ({ children, value }) => {
      const href = value?.href || '';
      const isExternal = href.startsWith('http');
      
      if (isExternal) {
        return (
          <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit', textDecoration: 'underline' }}
          >
            {children}
          </Link>
        );
      }
      
      return (
        <Link href={href} style={{ color: 'inherit', textDecoration: 'underline' }}>
          {children}
        </Link>
      );
    },
  },
  types: {
    image: ({ value }: { value: SanityImage & { caption?: string } }) => {
      const imageUrl = getImageUrl(value, 1200);
      
      if (!imageUrl) {
        return null;
      }

      return (
        <Box sx={{ my: 4 }}>
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: 'auto',
              minHeight: 400,
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            <Image
              src={imageUrl}
              alt={value.alt || 'Blog post image'}
              width={1200}
              height={675}
              style={{ width: '100%', height: 'auto' }}
            />
          </Box>
          {value.caption && (
            <Typography
              variant="caption"
              sx={{
                display: 'block',
                textAlign: 'center',
                mt: 1,
                color: 'text.secondary',
                fontStyle: 'italic',
              }}
            >
              {value.caption}
            </Typography>
          )}
        </Box>
      );
    },
    code: ({ value }: { value: { code: string; language?: string } }) => (
      <Box
        component="pre"
        sx={{
          backgroundColor: 'grey.900',
          color: 'grey.50',
          p: 3,
          borderRadius: 2,
          overflow: 'auto',
          my: 3,
          fontSize: '0.875rem',
          fontFamily: 'monospace',
        }}
      >
        <code>{value.code}</code>
      </Box>
    ),
  },
};

export function PortableTextRenderer({ value }: PortableTextRendererProps) {
  return <PortableText value={value} components={components} />;
}

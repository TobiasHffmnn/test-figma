'use client';

import {
  Box,
  Container,
  Typography,
  Link as MuiLink,
  Grid,
  IconButton,
  Stack,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Link from 'next/link';

const footerLinks = [
  {
    title: 'Navigation',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Events', href: '/events' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'About', href: '#' },
      { label: 'Contact', href: '#' },
      { label: 'Support', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
    ],
  },
];

const socialLinks = [
  { icon: <GitHubIcon />, href: 'https://github.com', label: 'GitHub' },
  { icon: <TwitterIcon />, href: 'https://twitter.com', label: 'Twitter' },
  { icon: <LinkedInIcon />, href: 'https://linkedin.com', label: 'LinkedIn' },
];

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'background.paper',
        borderTop: 1,
        borderColor: 'divider',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                mb: 2,
              }}
            >
              The Place 2B
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Discover amazing events and insightful blog posts. Join our community and stay connected.
            </Typography>
            <Stack direction="row" spacing={1}>
              {socialLinks.map((social) => (
                <IconButton
                  key={social.label}
                  component={MuiLink}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  size="small"
                  sx={{
                    color: 'text.secondary',
                    '&:hover': {
                      color: 'primary.main',
                    },
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Stack>
          </Grid>

          {footerLinks.map((section) => (
            <Grid item xs={12} sm={4} md={2.66} key={section.title}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                }}
              >
                {section.title}
              </Typography>
              <Stack spacing={1}>
                {section.links.map((link) => (
                  <MuiLink
                    key={link.label}
                    component={Link}
                    href={link.href}
                    sx={{
                      color: 'text.secondary',
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      '&:hover': {
                        color: 'primary.main',
                      },
                    }}
                  >
                    {link.label}
                  </MuiLink>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            mt: 6,
            pt: 3,
            borderTop: 1,
            borderColor: 'divider',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} The Place 2B. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

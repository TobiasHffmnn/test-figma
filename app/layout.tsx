import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Box } from '@mui/material';
import './globals.css';

export const metadata: Metadata = {
  title: 'The Place 2B - Events & Blog',
  description: 'Discover amazing events and insightful blog posts. Join our community and stay connected.',
  keywords: ['events', 'blog', 'community', 'technology', 'design'],
  authors: [{ name: 'The Place 2B Team' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yoursite.vercel.app',
    title: 'The Place 2B - Events & Blog',
    description: 'Discover amazing events and insightful blog posts.',
    siteName: 'The Place 2B',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Place 2B - Events & Blog',
    description: 'Discover amazing events and insightful blog posts.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
            }}
          >
            <Header />
            <Box component="main" sx={{ flexGrow: 1 }}>
              {children}
            </Box>
            <Footer />
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}

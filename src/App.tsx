/**
 * Main App Component
 * Sets up routing and wraps the app with theme provider
 * This is the root component of the application
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Box } from '@mui/material';
import HomePage from '@/pages/HomePage';
import EventsPage from '@/pages/EventsPage';
import BlogPage from '@/pages/BlogPage';

/**
 * App component sets up the application structure:
 * - Theme Provider for consistent styling
 * - Router for page navigation
 * - Header and Footer on all pages
 * - Main content area that changes based on route
 */
function App() {
  return (
    <ThemeProvider>
      <Router>
        {/* Main layout container */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          }}
        >
          {/* Header shown on all pages */}
          <Header />
          
          {/* Main content area - grows to fill available space */}
          <Box component="main" sx={{ flexGrow: 1 }}>
            {/* Routes define what component to show for each URL */}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/blog" element={<BlogPage />} />
            </Routes>
          </Box>
          
          {/* Footer shown on all pages */}
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;

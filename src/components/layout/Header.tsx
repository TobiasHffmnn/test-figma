/**
 * Header Component
 * Navigation bar displayed at the top of all pages
 * Includes responsive mobile menu (hamburger menu on small screens)
 */

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useState } from 'react';

// Navigation items displayed in the header
const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Events', href: '/events' },
  { label: 'Blog', href: '/blog' },
];

/**
 * Header component with responsive navigation
 * Shows regular menu on desktop, hamburger menu on mobile
 */
export function Header() {
  // State for mobile menu drawer (open/closed)
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // Get theme and check if we're on mobile screen
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Toggle mobile drawer open/closed
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Mobile drawer content
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        The Place 2B
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component={Link}
              to={item.href}
              sx={{ textAlign: 'center' }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {/* Main navigation bar */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: 'background.paper',
          color: 'text.primary',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            {/* Logo/Brand */}
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                flexGrow: { xs: 1, md: 0 },
                mr: 4,
                fontWeight: 700,
                color: 'primary.main',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              The Place 2B
            </Typography>

            {/* Show hamburger menu on mobile, regular menu on desktop */}
            {isMobile ? (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              /* Desktop navigation buttons */
              <Box sx={{ display: 'flex', flexGrow: 1, gap: 1 }}>
                {navItems.map((item) => (
                  <Button
                    key={item.label}
                    component={Link}
                    to={item.href}
                    sx={{
                      color: 'text.primary',
                      '&:hover': {
                        color: 'primary.main',
                        backgroundColor: 'transparent',
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      
      {/* Mobile drawer menu */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}

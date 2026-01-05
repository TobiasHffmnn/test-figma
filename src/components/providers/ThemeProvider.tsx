/**
 * Theme Provider Component
 * Wraps the application with Material-UI theme provider for consistent styling
 * across all components
 */

import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme/theme';

interface ThemeProviderProps {
  children: React.ReactNode;
}

/**
 * ThemeProvider wraps children with MUI theme
 * CssBaseline provides consistent baseline styles across browsers
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <MuiThemeProvider theme={theme}>
      {/* CssBaseline applies consistent baseline CSS across browsers */}
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}

import { createTheme } from '@mui/material/styles';

export const appTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#7ce7d5' },
    secondary: { main: '#91a7ff' },
    background: {
      default: '#080c12',
      paper: '#101722',
    },
    text: {
      primary: '#f4f7fb',
      secondary: '#91a0b5',
    },
    divider: 'rgba(255,255,255,0.08)',
  },
  typography: {
    fontFamily:
      'Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: { fontWeight: 700, letterSpacing: '-0.04em' },
    h2: { fontWeight: 700, letterSpacing: '-0.035em' },
    h3: { fontWeight: 650, letterSpacing: '-0.025em' },
    button: { textTransform: 'none', fontWeight: 650 },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 12, boxShadow: 'none' },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 10 },
      },
    },
  },
});

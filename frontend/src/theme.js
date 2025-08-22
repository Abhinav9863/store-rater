import { createTheme } from '@mui/material/styles';

const sharedStyles = {
  typography: {
    fontFamily: "'Inter', sans-serif",
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)',
          },
        },
      },
    },
  },
};

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#0052CC' },
    background: { default: '#F4F5F7', paper: '#FFFFFF' },
    text: { primary: '#172B4D', secondary: '#5E6C84' },
  },
  ...sharedStyles,
  typography: {
    ...sharedStyles.typography,
    h4: { ...sharedStyles.typography.h4, color: '#000000' },
    h5: { ...sharedStyles.typography.h5, color: '#172B4D' },
  },
  components: {
    ...sharedStyles.components,
    MuiCard: {
      styleOverrides: {
        ...sharedStyles.components.MuiCard.styleOverrides,
        root: {
          ...sharedStyles.components.MuiCard.styleOverrides.root,
          border: '1px solid #DFE1E6',
          boxShadow: '0px 1px 1px rgba(9, 30, 66, 0.25)',
          '&:hover': {
            transform: 'translateY(-5px)',
            // --- THIS CREATES THE GLOW EFFECT ---
            boxShadow: '0 8px 24px 0 rgba(0, 82, 204, 0.2)',
          },
        }
      }
    }
  }
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#579DFF' },
    background: { default: '#e6d6d6ff', paper: '#343434ff' },
    text: { primary: '#FFFFFF', secondary: '#B0B0B0' },
  },
  ...sharedStyles,
  typography: {
    ...sharedStyles.typography,
    h4: { ...sharedStyles.typography.h4, color: '#000000' },
    h5: { ...sharedStyles.typography.h5, color: '#000000' },
  },
  components: {
    ...sharedStyles.components,
    MuiCard: {
      styleOverrides: {
        ...sharedStyles.components.MuiCard.styleOverrides,
        root: {
          ...sharedStyles.components.MuiCard.styleOverrides.root,
          border: '1px solid #30363D',
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          // --- THIS CREATES THE GLOW EFFECT FOR DARK MODE ---
           '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 10px 30px 0 rgba(87, 157, 255, 0.15)',
          },
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputLabel-root': { color: '#B0B0B0' },
          '& .MuiInputLabel-root.Mui-focused': { color: '#579DFF' },
          '& .MuiInputBase-root': {
            backgroundColor: '#1E1E1E',
            '& input': { color: '#FFFFFF' },
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#30363D' },
            '&:hover fieldset': { borderColor: '#B0B0B0' },
          },
        },
      },
    },
  },
});
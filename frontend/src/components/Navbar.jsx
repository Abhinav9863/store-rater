import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { AppBar, Toolbar, Typography, Button, Box, TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

function Navbar() {
  const { user, logout, mode, toggleTheme } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      const timerId = setTimeout(() => {
        navigate(searchTerm ? `/?search=${searchTerm}` : '/');
      }, 500);
      return () => clearTimeout(timerId);
    }
  }, [searchTerm, navigate, location.pathname]);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: mode === 'light' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(22, 27, 34, 0.7)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(223, 225, 230, 0.2)',
        px: 2,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img src="/logo.png" alt="Logo" style={{ height: '35px', marginRight: '16px' }} />
          <Typography variant="h6" noWrap sx={{ fontWeight: 700, color: 'text.primary' }}>
            Roxiler Store Rater
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search Stores..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
              sx: { borderRadius: '20px' }
            }}
            sx={{ minWidth: '300px' }}
          />

          <IconButton onClick={toggleTheme} sx={{ color: 'text.secondary' }}>
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>

          {user ? (
            <>
              {user.role === 'System Administrator' && (
                <Button component={Link} to="/admin/dashboard" variant="contained">Admin Dashboard</Button>
              )}
              {user.role === 'Store Owner' && (
                <Button component={Link} to="/store-owner/dashboard" variant="contained">My Dashboard</Button>
              )}
              {/* --- STYLE FIX: All buttons are now consistent --- */}
              <Button component={Link} to="/update-password" variant="contained">Profile</Button>
              <Button onClick={logout} variant="contained">Logout</Button>
            </>
          ) : (
            <>
              <Button component={Link} to="/login" variant="contained">Login</Button>
              <Button component={Link} to="/signup" variant="outlined">Sign Up</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
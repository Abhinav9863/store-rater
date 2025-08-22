import { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline, Container, ThemeProvider } from '@mui/material';
import { lightTheme, darkTheme } from './theme';
import AuthContext from './context/AuthContext';
import Navbar from './components/Navbar.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import StoreOwnerDashboard from './pages/StoreOwnerDashboard.jsx';
import StoreOwnerRoute from './components/StoreOwnerRoute.jsx';
import UpdatePasswordPage from './pages/UpdatePasswordPage.jsx';

function App() {
  const { mode } = useContext(AuthContext);
  const activeTheme = mode === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={activeTheme}>
      <BrowserRouter>
        <CssBaseline />
        <Navbar />
        <Container sx={{ mt: 2 }}>
          <main>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />

              {/* Logged-in User Route */}
              <Route path="/update-password" element={<UpdatePasswordPage />} />

              {/* Admin-Only Route */}
              <Route path="/admin" element={<AdminRoute />}>
                <Route path="dashboard" element={<AdminDashboard />} />
              </Route>

              {/* Store Owner-Only Route */}
              <Route path="/store-owner" element={<StoreOwnerRoute />}>
                <Route path="dashboard" element={<StoreOwnerDashboard />} />
              </Route>
            </Routes>
          </main>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
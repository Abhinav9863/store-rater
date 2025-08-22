import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState('light'); // State for theme mode

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedMode = localStorage.getItem('themeMode'); // Check for saved theme
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedMode) {
      setMode(storedMode);
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  // Function to toggle theme and save preference
  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    localStorage.setItem('themeMode', newMode);
    setMode(newMode);
  };

  const value = {
    user,
    login,
    logout,
    mode,        // Provide mode to the app
    toggleTheme, // Provide the toggle function
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
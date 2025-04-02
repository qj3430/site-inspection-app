
import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (username, password) => {
    // For demo, hardcoded credentials
    if (username === 'testing123' && password === 'abc123') {
      const user = {
        id: '123',
        username: 'testing123',
        name: 'Test Engineer',
        role: 'engineer'
      };
      setCurrentUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      return Promise.resolve(user);
    } else {
      return Promise.reject(new Error('Invalid credentials'));
    }
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    currentUser,
    login,
    logout,
    isAuthenticated: !!currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

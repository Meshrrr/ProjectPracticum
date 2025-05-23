import React, { createContext, useState, useEffect } from 'react';
import { fetchCurrentUser } from '../services/api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const { data } = await fetchCurrentUser();
        setCurrentUser(data);
      } catch (error) {
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const value = {
    currentUser,
    loading,
    setCurrentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => React.useContext(AuthContext);
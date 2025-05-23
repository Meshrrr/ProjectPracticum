import React, { createContext, useState, useEffect, useCallback } from 'react';
import { fetchCurrentUser } from '../services/api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = useCallback(async () => {
    try {
      const { data } = await fetchCurrentUser();
      setCurrentUser(data);
    } catch (error) {
      setCurrentUser(null);
      localStorage.removeItem('token'); // Очищаем токен при ошибке
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, [loadUser]);

  const value = {
    currentUser,
    loading,
    setCurrentUser,
    loadUser // Добавляем функцию для ручного обновления
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => React.useContext(AuthContext);
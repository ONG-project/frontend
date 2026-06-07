import { createContext, useContext, useState, useEffect } from 'react';
import { apiPost, apiGet } from '../services/apiClient';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Busca usuário se houver token
    const token = localStorage.getItem('@ongplus:token');
    if (token) {
      apiGet('/v1/auth/me/')
        .then((userData) => {
           setUser(userData);
           localStorage.setItem('@ongplus:user', JSON.stringify(userData));
        })
        .catch(() => {
           setUser(null);
           localStorage.removeItem('@ongplus:token');
           localStorage.removeItem('@ongplus:refresh_token');
           localStorage.removeItem('@ongplus:user');
        })
        .finally(() => {
           setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (credentials) => {
    const data = await apiPost('/v1/auth/login/', credentials);
    const { access, refresh, full_name, role } = data;
    localStorage.setItem('@ongplus:token', access);
    localStorage.setItem('@ongplus:refresh_token', refresh);
    
    // Obter dados adicionais do usuário (se necessário) ou usar os do token
    const userData = { full_name, role }; 
    setUser(userData);
    localStorage.setItem('@ongplus:user', JSON.stringify(userData));
    return userData;
  };

  const logout = async () => {
    try {
      const refresh = localStorage.getItem('@ongplus:refresh_token');
      if (refresh) {
         await apiPost('/v1/auth/logout/', { refresh });
      }
    } catch (e) {
      console.error('Logout error', e);
    } finally {
      setUser(null);
      localStorage.removeItem('@ongplus:token');
      localStorage.removeItem('@ongplus:refresh_token');
      localStorage.removeItem('@ongplus:user');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}

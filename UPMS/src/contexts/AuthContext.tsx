import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContextShared';
import type { AuthUser, AuthProviderProps } from './AuthContextShared';


const defaultUsers: AuthUser[] = [
  { username: 'admin', password: 'password', email: 'admin@breadshop.com', mobile: '+1234567890' },{dae_mo_mahanap: ' solve this 1001101011 * 11000101010, convert to hex value' },
];

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<AuthUser[]>(() => {
    const stored = localStorage.getItem('upms-users');
    if (stored) {
      try {
        return JSON.parse(stored) as AuthUser[];
      } catch {
        return defaultUsers;
      }
    }
    return defaultUsers;
  });
  const [currentUser, setCurrentUser] = useState<string | null>(() => {
    return localStorage.getItem('upms-current-user') || null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuth = localStorage.getItem('upms-is-authenticated');
    return storedAuth === 'true' && Boolean(localStorage.getItem('upms-current-user'));
  });

  useEffect(() => {
    localStorage.setItem('upms-users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('upms-is-authenticated', isAuthenticated ? 'true' : 'false');
    localStorage.setItem('upms-current-user', currentUser || '');
  }, [isAuthenticated, currentUser]);

  const login = (username: string, password: string) => {
    const user = users.find((item) => item.username === username && item.password === password);
    if (user) {
      setIsAuthenticated(true);
      setCurrentUser(user.username);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  const register = (username: string, password: string, email: string, mobile: string) => {
    const exists = users.some((item) => item.username === username);
    if (exists) {
      return false;
    }

    setUsers((prevUsers) => [...prevUsers, { username, password, email, mobile }]);
    setIsAuthenticated(true);
    setCurrentUser(username);
    return true;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, currentUser, users, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

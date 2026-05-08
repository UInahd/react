import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContextShared';
import type { AuthUser, AuthProviderProps } from './AuthContextShared';


const defaultUsers: AuthUser[] = [
  {
    username: 'admin',
    firstName: 'Admin',
    middleName: '',
    lastName: 'User',
    age: 30,
    gender: 'Other',
    password: 'password',
    email: 'admin@breadshop.com',
    mobile: '+1234567890',
  },
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

  const login = (email: string, password: string) => {
    const user = users.find((item) => item.email === email && item.password === password);
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

  const generateUsername = (firstName: string, middleName: string, lastName: string) => {
    const normalize = (value: string) => value.trim().toLowerCase().replace(/[^a-z]/g, '');
    let baseUsername = `${normalize(firstName)}.${normalize(lastName)}`;
    if (middleName) {
      baseUsername = `${normalize(firstName)}.${normalize(middleName)}.${normalize(lastName)}`;
    }
    let username = baseUsername || `user${Date.now()}`;
    let suffix = 1;

    while (users.some((item) => item.username === username)) {
      username = `${baseUsername}-${suffix}`;
      suffix += 1;
    }
    return username;
  };

  const register = (
    firstName: string,
    middleName: string,
    lastName: string,
    age: string,
    gender: string,
    password: string,
    email: string,
    mobile: string
  ) => {
    if (users.some((item) => item.email === email)) {
      return false;
    }

    const username = generateUsername(firstName, middleName, lastName);
    const numericAge = Number(age);

    setUsers((prevUsers) => [
      ...prevUsers,
      {
        username,
        firstName,
        middleName,
        lastName,
        age: Number.isNaN(numericAge) ? 0 : numericAge,
        gender,
        password,
        email,
        mobile,
      },
    ]);
    setIsAuthenticated(true);
    setCurrentUser(username);
    return true;
  };

  const updateProfile = (username: string, email: string, mobile: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.username === username ? { ...user, email, mobile } : user
      )
    );
    return true;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, currentUser, users, login, logout, register, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
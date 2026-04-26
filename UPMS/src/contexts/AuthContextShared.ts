import { createContext, type Context, type ReactNode } from 'react';

export interface AuthUser {
  username: string;
  password: string;
  email: string;
  mobile: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: string | null;
  users: AuthUser[];
  login: (username: string, password: string) => boolean;
  logout: () => void;
  register: (username: string, password: string, email: string, mobile: string) => boolean;
}

export const AuthContext: Context<AuthContextType | undefined> =
  createContext<AuthContextType | undefined>(undefined);

export interface AuthProviderProps {
  children: ReactNode;
}

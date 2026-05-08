import { createContext, type Context, type ReactNode } from 'react';

export interface AuthUser {
  username: string;
  firstName: string;
  middleName: string;
  lastName: string;
  age: number;
  gender: string;
  password: string;
  email: string;
  mobile: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: string | null;
  users: AuthUser[];
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (
    firstName: string,
    middleName: string,
    lastName: string,
    age: string,
    gender: string,
    password: string,
    email: string,
    mobile: string
  ) => boolean;
  updateProfile: (username: string, email: string, mobile: string) => boolean;
}

export const AuthContext: Context<AuthContextType | undefined> =
  createContext<AuthContextType | undefined>(undefined);

export interface AuthProviderProps {
  children: ReactNode;
}

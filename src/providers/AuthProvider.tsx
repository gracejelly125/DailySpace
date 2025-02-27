'use client';

import { createContext, ReactNode, useContext, useEffect, useMemo } from 'react';
import { fetchUser, signout } from '@/app/actions/auth';
import { useAuthStore } from '@/store/useAuthStore';
import { SignInDataType, User } from '@/types/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (values: SignInDataType) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { user, setUser, removeUser } = useAuthStore();

  useEffect(() => {
    const fetchSignedUser = async () => {
      try {
        if (!user) {
          const currentUser = await fetchUser();
          setUser(currentUser);
        }
      } catch {
        removeUser();
      }
    };

    fetchSignedUser();
  }, [user, setUser, removeUser]);

  const login = async (values: SignInDataType) => {
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();

    if (data.errorMessage) {
      throw new Error(data.errorMessage);
    }

    setUser(data.user);
  };

  const logout = async () => {
    await signout();
    removeUser();
  };

  const isAuthenticated = useMemo(() => !!user, [user]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

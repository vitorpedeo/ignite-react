import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import Router from 'next/router';
import { destroyCookie, parseCookies, setCookie } from 'nookies';

import { HeadersDefaults } from 'axios';
import { api } from '../services/apiClient';

type SigInCredentials = {
  email: string;
  password: string;
};

type UserPayload = {
  token: string;
  refreshToken: string;
  permissions: string[];
  roles: string[];
};

type User = Pick<UserPayload, 'permissions' | 'roles'> & {
  email: string;
};

type AuthContextData = {
  user: User | null;
  isAuthenticated: boolean;
  signIn(credentials: SigInCredentials): Promise<void>;
};

interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  destroyCookie(undefined, '@nextauth:token');
  destroyCookie(undefined, '@nextauth:refreshToken');

  Router.push('/');
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    const { '@nextauth:token': token } = parseCookies();

    if (token) {
      api
        .get<User>('me')
        .then(response => {
          const { email, permissions, roles } = response.data;

          setUser({
            email,
            permissions,
            roles,
          });
        })
        .catch(err => {
          signOut();
        });
    }
  }, []);

  async function signIn(credentials: SigInCredentials) {
    try {
      const response = await api.post<UserPayload>('sessions', credentials);

      const { permissions, refreshToken, roles, token } = response.data;

      setCookie(undefined, '@nextauth:token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30d
        path: '/',
      });
      setCookie(undefined, '@nextauth:refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30d
        path: '/',
      });

      setUser({
        email: credentials.email,
        permissions,
        roles,
      });

      const headers = {
        ...api.defaults.headers,
        Authorization: `Bearer ${token}`,
      } as HeadersDefaults & { Authorization: string };

      api.defaults.headers = headers;

      Router.push('/dashboard');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

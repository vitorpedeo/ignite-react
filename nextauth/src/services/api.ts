import axios, { AxiosError, HeadersDefaults } from 'axios';
import { parseCookies, setCookie } from 'nookies';

import { signOut } from '../contexts/AuthContext';

type AxiosErrorResponseData = {
  code: string;
};

type RefreshTokenPayload = {
  token: string;
  refreshToken: string;
};

type FailedRequest = {
  onSuccess: (token: string) => void;
  onFailure: (err: AxiosError) => void;
};

let cookies = parseCookies();

let isRefreshing = false;
let failedRequestsQueue: FailedRequest[] = [];

export const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: `Bearer ${cookies['@nextauth:token']}`,
  },
});

api.interceptors.response.use(
  response => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      const { code } = error.response.data as AxiosErrorResponseData;

      if (code === 'token.expired') {
        // Renovar o token
        cookies = parseCookies();

        const { '@nextauth:refreshToken': refreshToken } = cookies;
        const originalConfig = error.config;

        if (!isRefreshing) {
          isRefreshing = true;

          api
            .post<RefreshTokenPayload>('/refresh', { refreshToken })
            .then(response => {
              const { token, refreshToken: newRefreshToken } = response.data;

              setCookie(undefined, '@nextauth:token', token, {
                maxAge: 60 * 60 * 24 * 30, // 30d
                path: '/',
              });
              setCookie(undefined, '@nextauth:refreshToken', newRefreshToken, {
                maxAge: 60 * 60 * 24 * 30, // 30d
                path: '/',
              });

              const headers = {
                ...api.defaults.headers,
                Authorization: `Bearer ${token}`,
              } as HeadersDefaults & { Authorization: string };

              api.defaults.headers = headers;

              failedRequestsQueue.forEach(request => request.onSuccess(token));
              failedRequestsQueue = [];
            })
            .catch(err => {
              failedRequestsQueue.forEach(request => request.onFailure(err));
              failedRequestsQueue = [];
            })
            .finally(() => {
              isRefreshing = false;
            });
        }

        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            onSuccess: (token: string) => {
              if (originalConfig.headers) {
                originalConfig.headers.Authorization = `Bearer ${token}`;

                resolve(api(originalConfig));
              }
            },
            onFailure: (err: AxiosError) => {
              reject(err);
            },
          });
        });
      }
      // Deslogar o usuário

      signOut();
    }

    return Promise.resolve(error);
  },
);

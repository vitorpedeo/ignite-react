import axios, { AxiosError, HeadersDefaults } from 'axios';
import { GetServerSidePropsContext } from 'next';
import { parseCookies, setCookie } from 'nookies';

import { signOut } from '../contexts/AuthContext';
import { AuthTokenError } from '../errors/AuthTokenError';

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

let isRefreshing = false;
let failedRequestsQueue: FailedRequest[] = [];

export function setupApiClient(
  ctx: GetServerSidePropsContext | undefined = undefined,
) {
  let cookies = parseCookies(ctx);

  const api = axios.create({
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
          cookies = parseCookies(ctx);

          const { '@nextauth:refreshToken': refreshToken } = cookies;
          const originalConfig = error.config;

          if (!isRefreshing) {
            isRefreshing = true;

            api
              .post<RefreshTokenPayload>('/refresh', { refreshToken })
              .then(response => {
                const { token, refreshToken: newRefreshToken } = response.data;

                setCookie(ctx, '@nextauth:token', token, {
                  maxAge: 60 * 60 * 24 * 30, // 30d
                  path: '/',
                });
                setCookie(ctx, '@nextauth:refreshToken', newRefreshToken, {
                  maxAge: 60 * 60 * 24 * 30, // 30d
                  path: '/',
                });

                const headers = {
                  ...api.defaults.headers,
                  Authorization: `Bearer ${token}`,
                } as HeadersDefaults & { Authorization: string };

                api.defaults.headers = headers;

                failedRequestsQueue.forEach(request =>
                  request.onSuccess(token),
                );
                failedRequestsQueue = [];

                if (process.browser) {
                  signOut();
                }
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

        if (process.browser) {
          signOut();
        } else {
          return Promise.reject(new AuthTokenError());
        }
      }

      return Promise.resolve(error);
    },
  );

  return api;
}

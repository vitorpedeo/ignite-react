import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';
import { destroyCookie, parseCookies } from 'nookies';

import { AuthTokenError } from '../errors/AuthTokenError';

export function withSSRAuth<T>(fn: GetServerSideProps<T>): GetServerSideProps {
  return async (
    ctx: GetServerSidePropsContext,
  ): Promise<GetServerSidePropsResult<T>> => {
    const cookies = parseCookies(ctx);

    if (!cookies['@nextauth:token']) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    try {
      return fn(ctx);
    } catch (error) {
      if (error instanceof AuthTokenError) {
        destroyCookie(ctx, '@nextauth:token');
        destroyCookie(ctx, '@nextauth:refreshToken');

        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      }
      return {
        props: {} as T,
      };
    }
  };
}

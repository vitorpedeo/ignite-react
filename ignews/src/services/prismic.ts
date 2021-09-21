import Primisc from '@prismicio/client';

export function getPrismicClient(request?: unknown) {
  const prismic = Primisc.client(
    process.env.PRISMIC_ENDPOINT,
    {
      req: request,
      accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    }
  );

  return prismic;
};
import { getSession } from 'next-auth/client';
import { render, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';

import { getPrismicClient } from '../../services/prismic';

import Post, { getServerSideProps } from '../../pages/posts/[slug]';

jest.mock('next-auth/client');

jest.mock('../../services/prismic');

const post = {
  slug: 'my-new-post',
  title: 'My New Post',
  content: '<p>Post excerpt</p>',
  updatedAt: '28 de Outubro',
};

describe('Post page', () => {
  it('should renders correctly', () => {
    render(
      <Post post={post} />
    );

    expect(screen.getByText('My New Post')).toBeInTheDocument();
    expect(screen.getByText('Post excerpt')).toBeInTheDocument();
  });

  it('should redirect user if no subscription is found', async () => {
    const getSessionMocked = mocked(getSession);
    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: null,
    });

    const response = await getServerSideProps({
      params: {
        slug: 'my-new-post'
      },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        redirect: {
          destination: '/',
          permanent: false,
        },
      }),
    );
  });

  it('should load initial data', async () => {
    const getSessionMocked = mocked(getSession);
    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: 'fake-active-subscription',
    });

    const getPrismicClientMocked = mocked(getPrismicClient);
    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [
            {
              type: 'heading',
              text: 'My New Post',
            },
          ],
          content: [
            {
              type: 'paragraph',
              text: 'Post content',
            },
          ],
        },
        last_publication_date: '10-20-2021',
      }),
    } as any);

    const response = await getServerSideProps({
      params: {
        slug: 'my-new-post'
      },
    } as any);
  
    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: 'my-new-post',
            title: 'My New Post',
            content: '<p>Post content</p>',
            updatedAt: '20 de outubro de 2021',
          },
        },
      }),
    );
  });
});
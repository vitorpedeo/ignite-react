import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import { render, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';

import { getPrismicClient } from '../../services/prismic';

import PostPreview, { getStaticProps } from '../../pages/posts/preview/[slug]';

jest.mock('next-auth/client');

jest.mock('next/router');

jest.mock('../../services/prismic');

const post = {
  slug: 'my-new-post',
  title: 'My New Post',
  content: '<p>Post excerpt</p>',
  updatedAt: '28 de Outubro',
};

describe('PostPreview page', () => {
  it('should renders correctly', () => {
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce([null, false]);
  
    const useRouterMocked = mocked(useRouter);
    useRouterMocked.mockReturnValueOnce({
      push: jest.fn(),
    } as any);

    render(<PostPreview post={post} />);

    expect(screen.getByText('My New Post')).toBeInTheDocument();
    expect(screen.getByText('Post excerpt')).toBeInTheDocument();
    expect(screen.getByText('Wanna continue reading?')).toBeInTheDocument();
  });

  it('should redirect user to full post when user has subscription', async () => {
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce([{
      activeSubscription: 'fake-active-subscription'
    }, false]);
  
    const useRouterMocked = mocked(useRouter);
    const pushMock = jest.fn();
    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any);

    render(<PostPreview post={post} />);

    expect(pushMock).toHaveBeenCalledWith('/posts/my-new-post');
  });

  it('should load initial data', async () => {
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

    const response = await getStaticProps({
      params: {
        slug: 'my-new-post',
      },
    });
  
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
import { signIn, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { fireEvent, screen, render, waitFor } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';

import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';

import { SubscribeButton } from '.';

jest.mock('next-auth/client');
jest.mock('next/router');
jest.mock('../../services/api');
jest.mock('../../services/stripe-js');

describe('SubscribeButton component', () => {
  it('should renders correctly', () => {
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce([null, false]);

    const useRouterMocked = mocked(useRouter);
    useRouterMocked.mockReturnValueOnce({
      push: jest.fn(),
    } as any);

    render(<SubscribeButton />);

    expect(screen.getByText('Subscribe now')).toBeInTheDocument();
  });

  it('should redirects user to sign in when not authenticated', () => {
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce([null, false]);

    const signInMocked = mocked(signIn);

    const useRouterMocked = mocked(useRouter);
    useRouterMocked.mockReturnValueOnce({
      push: jest.fn(),
    } as any);

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText('Subscribe now');

    fireEvent.click(subscribeButton);

    expect(signInMocked).toHaveBeenCalled();
  });

  it('should redirects to posts when user already has a subscription', () => {
    const useRouterMocked = mocked(useRouter);
    const pushMock = jest.fn();
    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any);

    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce([
      {
        user: {
          name: 'John Doe',
          email: 'john.doe@example.com',
        },
        activeSubscription: 'fake-active-subscription',
        expires: 'fake-expires',
      }, 
      false
    ]);

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText('Subscribe now');

    fireEvent.click(subscribeButton);

    expect(pushMock).toHaveBeenCalledWith('/posts');
  });
});

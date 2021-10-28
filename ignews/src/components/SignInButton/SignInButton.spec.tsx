import { useSession, signIn, signOut } from 'next-auth/client';
import { fireEvent, screen, render } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';

import { SignInButton } from '.';

jest.mock('next-auth/client');

describe('SignInButton component', () => {
  it('should renders correctly when user is not logged in', () => {
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<SignInButton />);

    expect(screen.getByText('Sign in with GitHub')).toBeInTheDocument();
  });

  it('should renders correctly when user is logged in', () => {
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce([
      {
        user: {
          name: 'John Doe',
          email: 'john.doe@example.com',
        },
        expires: 'fake-expires',
      }, 
      false
    ]);

    render(<SignInButton />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('should call signIn method when user is not logged in', () => {
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce([null, false]);

    const signInMocked = mocked(signIn);

    render(<SignInButton />);

    const signInButton = screen.getByRole('button', { name: /sign in with github/i });
    fireEvent.click(signInButton);

    expect(signInMocked).toHaveBeenCalledWith('github');
  });

  it('should call signOut method when user is logged in', () => {
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce([
      {
        user: {
          name: 'John Doe',
          email: 'john.doe@example.com',
        },
        expires: 'fake-expires',
      }, 
      false
    ]);

    const signOutMocked = mocked(signOut);

    render(<SignInButton />);

    const signOutButton = screen.getByRole('button', { name: /john doe/i });
    fireEvent.click(signOutButton);

    expect(signOutMocked).toHaveBeenCalled();
  });
});

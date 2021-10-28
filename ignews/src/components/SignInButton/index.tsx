import { signIn, signOut, useSession } from 'next-auth/client';
import { IoLogoGithub, IoClose } from 'react-icons/io5';

import styles from './styles.module.scss';

export function SignInButton() {
  const [session] = useSession();

  if (session) {
    return (
      <button 
        type="button" 
        className={styles.signInButton} 
        onClick={() => signOut()}
      >
        <IoLogoGithub color="#04d361" />
        {session.user.name}
        <IoClose color="#737380" className={styles.closeIcon} />
      </button>
    );
  }

  return (
    <button 
      type="button" 
      className={styles.signInButton} 
      onClick={() => signIn('github')}
    >
      <IoLogoGithub color="#eba417" />
      Sign in with GitHub
    </button>
  );
};
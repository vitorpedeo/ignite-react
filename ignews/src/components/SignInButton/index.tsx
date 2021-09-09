import { IoLogoGithub, IoClose } from 'react-icons/io5';

import styles from './styles.module.scss';

export function SignInButton() {
  const isUserLoggedIn = true;

  if (isUserLoggedIn) {
    return (
      <button type="button" className={styles.signInButton}>
        <IoLogoGithub color="#04d361" />
        Vitor Pereira
        <IoClose color="#737380" className={styles.closeIcon} />
      </button>
    );
  }

  return (
    <button type="button" className={styles.signInButton}>
      <IoLogoGithub color="#eba417" />
      Sign in with GitHub
    </button>
  );
};
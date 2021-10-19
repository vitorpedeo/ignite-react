import { useEffect } from 'react';

import { Can } from '../components/Can';

import { useAuth } from '../contexts/AuthContext';
import { setupApiClient } from '../services/api';
import { api } from '../services/apiClient';
import { withSSRAuth } from '../utils/withSSRAuth';

export default function Dashboard() {
  const { user, signOut } = useAuth();

  useEffect(() => {
    api
      .get('/me')
      .then(response => console.log(response.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>{user?.email}</h2>

      <button type="button" onClick={signOut}>
        Sign out
      </button>

      <Can permissions={['metrics.list']}>Métricas</Can>
    </div>
  );
}

export const getServerSideProps = withSSRAuth(async ctx => {
  const apiClient = setupApiClient(ctx);

  const response = await apiClient.get('/me');

  console.log(response.data);

  return {
    props: {},
  };
});

import { useEffect } from 'react';

import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';

export default function Dashboard() {
  const { user } = useAuth();

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
    </div>
  );
}

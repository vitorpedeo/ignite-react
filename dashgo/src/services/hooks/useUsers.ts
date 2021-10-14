import { useQuery } from 'react-query';

import { api } from '../api';

type User = {
  id: string;
  name: string;
  email: string;
  created_at: string;
};

interface APIResponse {
  users: User[];
  totalCount: number;
}

export async function getUsers(page: number) {
  const { data, headers } = await api.get<APIResponse>('users', {
    params: {
      page,
    },
  });

  const totalCount = Number(headers['x-total-count']);

  const users = data.users.map(user => ({
    ...user,
    created_at: new Date(user.created_at).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
  }));

  return { users, totalCount };
}

export function useUsers(page: number) {
  const query = useQuery(['users', page], () => getUsers(page), {
    staleTime: 1000 * 60 * 10, // 10mins
  });

  return query;
}

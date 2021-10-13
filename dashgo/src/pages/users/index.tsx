import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Thead,
  Th,
  Tr,
  useBreakpointValue,
} from '@chakra-ui/react';
import Head from 'next/head';
import Link from 'next/link';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';
import { useQuery } from 'react-query';

import { Header } from '../../components/Header';
import { Pagination } from '../../components/Pagination';
import { Sidebar } from '../../components/Sidebar';

export default function UserList() {
  const { data, isLoading, error } = useQuery(
    'users',
    async () => {
      const response = await fetch('http://localhost:3000/api/users');
      const responseData = await response.json();

      const users = responseData.users.map(user => ({
        ...user,
        createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }),
      }));

      return users;
    },
    {
      staleTime: 1000 * 5, // 5s
    },
  );

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <>
      <Head>
        <title>dashgo. | Usuários</title>
      </Head>

      <Box>
        <Header />
        <Flex
          marginY="6"
          marginX="auto"
          paddingX="6"
          width="100%"
          maxWidth={1480}
        >
          <Sidebar />

          <Box padding="8" borderRadius={8} background="gray.800" flex="1">
            <Flex
              marginBottom="8"
              alignItems="center"
              justifyContent="space-between"
            >
              <Heading size="lg" fontWeight="bold">
                Usuários
              </Heading>

              <Link href="/users/create" passHref>
                <Button
                  as="a"
                  size="sm"
                  fontSize="small"
                  colorScheme="pink"
                  leftIcon={
                    <Icon
                      as={RiAddLine}
                      fontSize={{
                        base: '16',
                        lg: '20',
                      }}
                    />
                  }
                >
                  Criar novo
                </Button>
              </Link>
            </Flex>

            {isLoading ? (
              <Flex justify="center">
                <Spinner />
              </Flex>
            ) : error ? (
              <Flex justify="center">
                <Text>Falha ao obter dados dos usuários.</Text>
              </Flex>
            ) : (
              <>
                <Table colorScheme="whiteAlpha">
                  <Thead>
                    <Tr>
                      <Th
                        paddingX={{
                          base: '4',
                          sm: '4',
                          md: '4',
                          lg: '6',
                        }}
                        width="8"
                        color="gray.300"
                      >
                        <Checkbox colorScheme="pink" />
                      </Th>
                      <Th>Usuário</Th>
                      {isWideVersion && <Th>Data de cadastro</Th>}
                      {isWideVersion && <Th width="8" />}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data.map(user => (
                      <Tr key={user.id}>
                        <Td
                          paddingX={{
                            base: '4',
                            sm: '4',
                            md: '4',
                            lg: '6',
                          }}
                        >
                          <Checkbox colorScheme="pink" />
                        </Td>
                        <Td>
                          <Box>
                            <Text fontWeight="bold">{user.name}</Text>
                            <Text fontSize="small" color="gray.300">
                              {user.email}
                            </Text>
                          </Box>
                        </Td>
                        {isWideVersion && <Td>{user.createdAt}</Td>}
                        {isWideVersion && (
                          <Td>
                            <Button
                              as="a"
                              size="sm"
                              fontSize="small"
                              colorScheme="purple"
                              leftIcon={
                                <Icon as={RiPencilLine} fontSize="16" />
                              }
                            >
                              Editar
                            </Button>
                          </Td>
                        )}
                      </Tr>
                    ))}
                  </Tbody>
                </Table>

                <Pagination />
              </>
            )}
          </Box>
        </Flex>
      </Box>
    </>
  );
}

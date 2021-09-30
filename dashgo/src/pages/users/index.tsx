import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Table,
  Tbody,
  Td,
  Text,
  Thead,
  Th,
  Tr,
} from '@chakra-ui/react';
import Head from 'next/head';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';

import { Header } from '../../components/Header';
import { Pagination } from '../../components/Pagination';
import { Sidebar } from '../../components/Sidebar';

export default function UserList() {
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
              <Button
                as="a"
                size="sm"
                fontSize="small"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar novo
              </Button>
            </Flex>

            <Table colorScheme="whiteAlpha">
              <Thead>
                <Tr>
                  <Th paddingX="6" width="8" color="gray.300">
                    <Checkbox colorScheme="pink" />
                  </Th>
                  <Th>Usuário</Th>
                  <Th>Data de cadastro</Th>
                  <Th width="8" />
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td paddingX="6">
                    <Checkbox colorScheme="pink" />
                  </Td>
                  <Td>
                    <Box>
                      <Text fontWeight="bold">Vitor Pereira</Text>
                      <Text fontSize="small" color="gray.300">
                        vitorpereiradeoli@gmail.com
                      </Text>
                    </Box>
                  </Td>
                  <Td>30 de Setembro de 2021</Td>
                  <Td>
                    <Button
                      as="a"
                      size="sm"
                      fontSize="small"
                      colorScheme="purple"
                      leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                    >
                      Editar
                    </Button>
                  </Td>
                </Tr>
                <Tr>
                  <Td paddingX="6">
                    <Checkbox colorScheme="pink" />
                  </Td>
                  <Td>
                    <Box>
                      <Text fontWeight="bold">Vitor Pereira</Text>
                      <Text fontSize="small" color="gray.300">
                        vitorpereiradeoli@gmail.com
                      </Text>
                    </Box>
                  </Td>
                  <Td>30 de Setembro de 2021</Td>
                  <Td>
                    <Button
                      as="a"
                      size="sm"
                      fontSize="small"
                      colorScheme="purple"
                      leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                    >
                      Editar
                    </Button>
                  </Td>
                </Tr>
                <Tr>
                  <Td paddingX="6">
                    <Checkbox colorScheme="pink" />
                  </Td>
                  <Td>
                    <Box>
                      <Text fontWeight="bold">Vitor Pereira</Text>
                      <Text fontSize="small" color="gray.300">
                        vitorpereiradeoli@gmail.com
                      </Text>
                    </Box>
                  </Td>
                  <Td>30 de Setembro de 2021</Td>
                  <Td>
                    <Button
                      as="a"
                      size="sm"
                      fontSize="small"
                      colorScheme="purple"
                      leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                    >
                      Editar
                    </Button>
                  </Td>
                </Tr>
              </Tbody>
            </Table>

            <Pagination />
          </Box>
        </Flex>
      </Box>
    </>
  );
}

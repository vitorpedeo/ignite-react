import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react';
import Head from 'next/head';

import { Header } from '../../components/Header';
import { Input } from '../../components/Form/Input';
import { Sidebar } from '../../components/Sidebar';

export default function CreateUser() {
  return (
    <>
      <Head>
        <title>dashgo. | Cadastrar usuário</title>
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
            <Heading size="lg" fontWeight="bold">
              Cadastrar usuário
            </Heading>

            <Divider marginY="6" borderColor="gray.700" />

            <VStack spacing="8">
              <SimpleGrid spacing="8" width="100%" minChildWidth="240px">
                <Input name="name" label="Nome Completo" />
                <Input name="email" label="E-mail" type="email" />
              </SimpleGrid>

              <SimpleGrid spacing="8" width="100%" minChildWidth="240px">
                <Input name="password" label="Senha" type="password" />
                <Input
                  name="password"
                  label="Confirmar senha"
                  type="password"
                />
              </SimpleGrid>
            </VStack>

            <Flex marginTop="8" justifyContent="flex-end">
              <HStack spacing="4">
                <Button colorScheme="whiteAlpha">Cancelar</Button>
                <Button colorScheme="pink">Salvar</Button>
              </HStack>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  );
}

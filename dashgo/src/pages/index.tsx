import { Button, Flex, Stack } from '@chakra-ui/react';
import Head from 'next/head';

import { Input } from '../components/Form/Input';

export default function SignIn() {
  return (
    <>
      <Head>
        <title>dashgo. | Login</title>
      </Head>

      <Flex
        width="100%"
        height="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <Flex
          as="form"
          padding="8"
          width="100%"
          maxWidth={360}
          borderRadius={8}
          background="gray.800"
          flexDirection="column"
        >
          <Stack spacing="4">
            <Input name="email" type="email" label="E-mail" />

            <Input name="password" type="password" label="Senha" />
          </Stack>

          <Button marginTop="6" colorScheme="pink" size="lg" type="submit">
            Entrar
          </Button>
        </Flex>
      </Flex>
    </>
  );
}

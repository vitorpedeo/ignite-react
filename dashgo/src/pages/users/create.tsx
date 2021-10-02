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
import { yupResolver } from '@hookform/resolvers/yup';
import Head from 'next/head';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Header } from '../../components/Header';
import { Input } from '../../components/Form/Input';
import { Sidebar } from '../../components/Sidebar';

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const createUserSchema = yup.object({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().email('E-mail inválido').required('E-mail obrigatório'),
  password: yup
    .string()
    .required('Senha obrigatória')
    .min(6, 'No mínimo 6 caracteres'),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref('password')], 'As senhas precisam ser iguais'),
});

export default function CreateUser() {
  const { register, handleSubmit, formState } = useForm<CreateUserFormData>({
    resolver: yupResolver(createUserSchema),
  });
  const { errors, isSubmitting } = formState;

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async values => {
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log(values);
  };

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

          <Box
            as="form"
            onSubmit={handleSubmit(handleCreateUser)}
            padding={{
              base: '6',
              sm: '6',
              md: '8',
            }}
            borderRadius={8}
            background="gray.800"
            flex="1"
          >
            <Heading size="lg" fontWeight="bold">
              Cadastrar usuário
            </Heading>

            <Divider marginY="6" borderColor="gray.700" />

            <VStack spacing="8">
              <SimpleGrid
                spacing={{
                  base: '6',
                  sm: '6',
                  md: '8',
                }}
                width="100%"
                minChildWidth="240px"
              >
                <Input
                  name="name"
                  label="Nome Completo"
                  error={errors?.name}
                  {...register('name')}
                />
                <Input
                  name="email"
                  type="email"
                  label="E-mail"
                  error={errors?.email}
                  {...register('email')}
                />
              </SimpleGrid>

              <SimpleGrid
                spacing={{
                  base: '6',
                  sm: '6',
                  md: '8',
                }}
                width="100%"
                minChildWidth="240px"
              >
                <Input
                  name="password"
                  type="password"
                  label="Senha"
                  error={errors?.password}
                  {...register('password')}
                />
                <Input
                  name="confirm_password"
                  type="password"
                  label="Confirmar senha"
                  error={errors?.password_confirmation}
                  {...register('password_confirmation')}
                />
              </SimpleGrid>
            </VStack>

            <Flex marginTop="8" justifyContent="flex-end">
              <HStack spacing="4">
                <Link href="/users" passHref>
                  <Button as="a" colorScheme="whiteAlpha">
                    Cancelar
                  </Button>
                </Link>
                <Button
                  type="submit"
                  colorScheme="pink"
                  isLoading={isSubmitting}
                >
                  Salvar
                </Button>
              </HStack>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  );
}

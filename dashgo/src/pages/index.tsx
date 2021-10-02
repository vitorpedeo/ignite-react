import { Button, Flex, Stack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import Head from 'next/head';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Input } from '../components/Form/Input';

type SignInFormData = {
  email: string;
  password: string;
};

const signInSchema = yup.object({
  email: yup.string().email('E-mail inválido').required('E-mail obrigatório'),
  password: yup.string().required('Senha obrigatória'),
});

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm<SignInFormData>({
    resolver: yupResolver(signInSchema),
  });
  const { errors, isSubmitting } = formState;

  const handleSignIn: SubmitHandler<SignInFormData> = async values => {
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log(values);
  };

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
          onSubmit={handleSubmit(handleSignIn)}
          padding="8"
          width="100%"
          maxWidth={360}
          borderRadius={8}
          background="gray.800"
          flexDirection="column"
        >
          <Stack spacing="4">
            <Input
              name="email"
              type="email"
              label="E-mail"
              error={errors?.email}
              {...register('email', {
                required: 'E-mail obrigatório',
              })}
            />

            <Input
              name="password"
              type="password"
              label="Senha"
              error={errors?.password}
              {...register('password')}
            />
          </Stack>

          <Button
            marginTop="6"
            colorScheme="pink"
            size="lg"
            type="submit"
            isLoading={isSubmitting}
          >
            Entrar
          </Button>
        </Flex>
      </Flex>
    </>
  );
}

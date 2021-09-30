import NextLink from 'next/link';
import { Box, Icon, Link, Stack, Text } from '@chakra-ui/react';
import {
  RiContactsLine,
  RiDashboardLine,
  RiGitMergeLine,
  RiInputMethodLine,
} from 'react-icons/ri';

export function Sidebar() {
  return (
    <Box as="aside" marginRight="8" width="64">
      <Stack spacing="12" alignItems="flex-start">
        <Box>
          <Text color="gray.400" fontSize="small" fontWeight="bold">
            GERAL
          </Text>
          <Stack spacing="4" marginTop="8" alignItems="stretch">
            <NextLink href="/dashboard" passHref>
              <Link display="flex" alignItems="center">
                <Icon as={RiDashboardLine} fontSize="20" />
                <Text marginLeft="4" fontWeight="medium">
                  Dashboard
                </Text>
              </Link>
            </NextLink>
            <NextLink href="/dashboard" passHref>
              <Link display="flex" alignItems="center">
                <Icon as={RiContactsLine} fontSize="20" />
                <Text marginLeft="4" fontWeight="medium">
                  Contatos
                </Text>
              </Link>
            </NextLink>
          </Stack>
        </Box>
        <Box>
          <Text color="gray.400" fontSize="small" fontWeight="bold">
            AUTOMAÇÂO
          </Text>
          <Stack spacing="4" marginTop="8" alignItems="stretch">
            <NextLink href="/dashboard" passHref>
              <Link display="flex" alignItems="center">
                <Icon as={RiInputMethodLine} fontSize="20" />
                <Text marginLeft="4" fontWeight="medium">
                  Formulários
                </Text>
              </Link>
            </NextLink>
            <NextLink href="/dashboard" passHref>
              <Link display="flex" alignItems="center">
                <Icon as={RiGitMergeLine} fontSize="20" />
                <Text marginLeft="4" fontWeight="medium">
                  Automação
                </Text>
              </Link>
            </NextLink>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

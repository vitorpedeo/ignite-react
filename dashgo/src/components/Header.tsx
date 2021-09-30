import { Avatar, Box, Flex, Icon, Input, HStack, Text } from '@chakra-ui/react';
import {
  RiNotificationLine,
  RiSearchLine,
  RiUserAddLine,
} from 'react-icons/ri';

export function Header() {
  return (
    <Flex
      as="header"
      marginX="auto"
      marginTop="4"
      paddingX={6}
      width="100%"
      maxWidth={1480}
      height="20"
      alignItems="center"
    >
      <Text width="64" fontSize="3xl" fontWeight="bold" letterSpacing="tight">
        dashgo
        <Text as="span" marginLeft="1" color="pink.500">
          .
        </Text>
      </Text>

      <Flex
        as="label"
        marginLeft="6"
        paddingY="4"
        paddingX="8"
        maxWidth={400}
        position="relative"
        background="gray.800"
        borderRadius="full"
        color="gray.200"
        flex="1"
        alignSelf="center"
      >
        <Input
          marginRight="4"
          paddingX="4"
          color="gray.50"
          variant="unstyled"
          placeholder="Buscar na plataforma"
          _placeholder={{ color: 'gray.400' }}
        />

        <Icon as={RiSearchLine} fontSize="20" />
      </Flex>

      <Flex marginLeft="auto" alignItems="center">
        <HStack
          spacing="8"
          marginX="8"
          paddingY="1"
          paddingRight="8"
          borderRightWidth={1}
          borderColor="gray.700"
          color="gray.300"
        >
          <Icon as={RiNotificationLine} fontSize="20" />
          <Icon as={RiUserAddLine} fontSize="20" />
        </HStack>

        <Flex alignItems="center">
          <Box marginRight="4" textAlign="right">
            <Text>Vitor Pereira</Text>
            <Text color="gray.300" fontSize="small">
              vitorpereiradeoli@gmail.com
            </Text>
          </Box>

          <Avatar
            size="md"
            name="Vitor Pereira"
            src="https://github.com/vitorpedeo.png"
          />
        </Flex>
      </Flex>
    </Flex>
  );
}

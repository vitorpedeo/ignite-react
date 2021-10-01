import { Flex, Icon, Input } from '@chakra-ui/react';
import { RiSearchLine } from 'react-icons/ri';

export function Search() {
  return (
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
  );
}

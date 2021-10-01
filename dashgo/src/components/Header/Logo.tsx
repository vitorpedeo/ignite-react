import { Text } from '@chakra-ui/react';

export function Logo() {
  return (
    <Text
      width="64"
      fontSize={{
        base: '2xl',
        sm: '2xl',
        md: '3xl',
      }}
      fontWeight="bold"
      letterSpacing="tight"
    >
      dashgo
      <Text as="span" marginLeft="1" color="pink.500">
        .
      </Text>
    </Text>
  );
}

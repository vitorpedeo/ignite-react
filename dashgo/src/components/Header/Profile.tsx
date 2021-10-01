import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex alignItems="center">
      {showProfileData && (
        <Box marginRight="4" textAlign="right">
          <Text>Vitor Pereira</Text>
          <Text color="gray.300" fontSize="small">
            vitorpereiradeoli@gmail.com
          </Text>
        </Box>
      )}

      <Avatar
        size="md"
        name="Vitor Pereira"
        src="https://github.com/vitorpedeo.png"
      />
    </Flex>
  );
}

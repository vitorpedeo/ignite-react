import { HStack, Icon } from '@chakra-ui/react';
import { RiNotificationLine, RiUserAddLine } from 'react-icons/ri';

export function NotificationsNav() {
  return (
    <HStack
      spacing={{
        base: '6',
        sm: '6',
        md: '8',
      }}
      marginX={{
        base: '6',
        sm: '6',
        md: '8',
      }}
      paddingRight={{
        base: '6',
        sm: '6',
        md: '8',
      }}
      paddingY="1"
      borderRightWidth={1}
      borderColor="gray.700"
      color="gray.300"
    >
      <Icon as={RiNotificationLine} fontSize="20" />
      <Icon as={RiUserAddLine} fontSize="20" />
    </HStack>
  );
}

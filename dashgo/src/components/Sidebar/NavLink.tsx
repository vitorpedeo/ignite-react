import { ElementType } from 'react';
import {
  LinkProps as ChakraLinkProps,
  Icon,
  Link,
  Text,
} from '@chakra-ui/react';

import { ActiveLink } from '../ActiveLink';

interface NavLinkProps extends ChakraLinkProps {
  icon: ElementType;
  children: string;
}

export function NavLink({ href, icon, children, ...rest }: NavLinkProps) {
  return (
    <ActiveLink href={href} passHref>
      <Link display="flex" alignItems="center" {...rest}>
        <Icon as={icon} fontSize="20" />
        <Text marginLeft="4" fontWeight="medium">
          {children}
        </Text>
      </Link>
    </ActiveLink>
  );
}

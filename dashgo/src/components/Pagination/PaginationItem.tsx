import { Button } from '@chakra-ui/react';

interface PaginationItemProps {
  isCurrent?: boolean;
  pageNumber: number;
}

export function PaginationItem({
  isCurrent = false,
  pageNumber,
}: PaginationItemProps) {
  if (isCurrent) {
    return (
      <Button
        size="sm"
        width="4"
        colorScheme="pink"
        fontSize="xs"
        disabled
        _disabled={{
          background: 'pink.500',
          cursor: 'default',
        }}
      >
        {pageNumber}
      </Button>
    );
  }

  return (
    <Button
      size="sm"
      width="4"
      background="gray.600"
      fontSize="xs"
      _hover={{
        background: 'gray.500',
      }}
    >
      {pageNumber}
    </Button>
  );
}

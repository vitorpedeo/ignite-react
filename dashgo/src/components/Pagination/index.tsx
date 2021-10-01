import { Box, Stack } from '@chakra-ui/react';
import { PaginationItem } from './PaginationItem';

export function Pagination() {
  return (
    <Stack
      spacing="6"
      direction={{
        base: 'column',
        sm: 'column',
        md: 'row',
      }}
      marginTop="8"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
      </Box>
      <Stack spacing="2" direction="row">
        <PaginationItem pageNumber={1} isCurrent />
        <PaginationItem pageNumber={2} />
        <PaginationItem pageNumber={3} />
        <PaginationItem pageNumber={4} />
      </Stack>
    </Stack>
  );
}

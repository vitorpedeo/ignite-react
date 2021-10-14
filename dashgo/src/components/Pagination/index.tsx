import { Box, Stack, Text } from '@chakra-ui/react';
import { PaginationItem } from './PaginationItem';

interface PaginationProps {
  totalCountOfRegisters: number;
  registersPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

const siblingsCount = 1;

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => from + index + 1)
    .filter(page => page > 0);
}

export function Pagination({
  totalCountOfRegisters,
  registersPerPage = 10,
  currentPage = 1,
  onPageChange,
}: PaginationProps) {
  const lastPage = Math.floor(totalCountOfRegisters / registersPerPage);

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : [];

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage),
        )
      : [];

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
        <strong>{(currentPage - 1) * registersPerPage}</strong> -{' '}
        <strong>{currentPage * registersPerPage}</strong> de{' '}
        <strong>{totalCountOfRegisters}</strong>
      </Box>
      <Stack spacing="2" direction="row">
        {currentPage > siblingsCount + 1 && (
          <>
            <PaginationItem pageNumber={1} onPageChange={onPageChange} />
            {currentPage > siblingsCount + 2 && (
              <Text width="8" color="gray.300" textAlign="center">
                ...
              </Text>
            )}
          </>
        )}

        {previousPages.length > 0 &&
          previousPages.map(page => (
            <PaginationItem
              key={page}
              pageNumber={page}
              onPageChange={onPageChange}
            />
          ))}

        <PaginationItem
          pageNumber={currentPage}
          isCurrent
          onPageChange={onPageChange}
        />

        {nextPages.length > 0 &&
          nextPages.map(page => (
            <PaginationItem
              key={page}
              pageNumber={page}
              onPageChange={onPageChange}
            />
          ))}

        {currentPage + siblingsCount < lastPage && (
          <>
            {currentPage + siblingsCount + 1 < lastPage && (
              <Text width="8" color="gray.300" textAlign="center">
                ...
              </Text>
            )}
            <PaginationItem pageNumber={lastPage} onPageChange={onPageChange} />
          </>
        )}
      </Stack>
    </Stack>
  );
}

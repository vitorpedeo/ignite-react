import { useMemo } from 'react';
import { List, ListRowRenderer } from 'react-virtualized';

import { ProductItem } from "./ProductItem";

interface SearchResultsProps {
  results: {
    id: number;
    price: number;
    priceFormatted: string;
    title: string;
  }[];
  onAddToWishlist: (id: number) => void;
}

export function SearchResults({ results, onAddToWishlist }: SearchResultsProps) {
  const totalPrice = useMemo(() => {
    return results.reduce((acc, curr) => acc + curr.price, 0);
  }, [results]);

  const rowRenderer: ListRowRenderer = ({ key, index, style }) => {
    return (
      <div key={key} style={style}>
        <ProductItem 
          product={results[index]}
          onAddToWishlist={onAddToWishlist}  
        />
      </div>
    );
  };

  return (
    <div>
      <h2>{totalPrice}</h2>

      <List 
        width={900}
        height={300}
        rowHeight={30}
        overscanRowCount={5}
        rowCount={results.length}
        rowRenderer={rowRenderer}
      />
    </div>
  );
}

/**
 *  Quando usar o useMemo:
 *  1. Cálculos pesados
 *  2. Igualdade referencial (quando repassamos o valor a um componente filho)
 */
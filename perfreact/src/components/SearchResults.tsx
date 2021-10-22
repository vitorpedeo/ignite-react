import { ProductItem } from "./ProductItem";

interface SearchResultsProps {
  results: {
    id: number;
    price: number;
    title: string;
  }[];
}

export function SearchResults({ results }: SearchResultsProps) {
  return (
    <div>
      {results.map(result => (
        <ProductItem product={result} />
      ))}
    </div>
  );
}

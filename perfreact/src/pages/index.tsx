import { FormEvent, useCallback, useState } from 'react';

import { SearchResults } from '../components/SearchResults';

export default function Home() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    if (!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data = await response.json();

    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })

    const products = data.map(product => ({
      ...product,
      priceFormatted: formatter.format(product.price),
    }));

    setResults(products);
  }

  const addToWishlist = useCallback(async (id: number) => {
    console.log(id);
  }, []);
 
  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          value={search}
          onChange={event => setSearch(event.target.value)} 
        />
        <button type="submit">Buscar</button>
      </form>

      <SearchResults 
        results={results}
        onAddToWishlist={addToWishlist}  
      />
    </div>
  );
}

/**
 *  Quando usar o useCallback:
 *  1. Igualdade referencial (quando repassamos a função à um ou vários componentes filhos)
 */

/**
 *  Quando formatar os dados:
 *  1. Quando estamos trazendo os dados da API
 */

import { ChangeEvent, FormEvent, useState } from "react";

import './styles/App.scss';

interface Repository {
  id: number;
  name: string;
  description: string;
  language: string;
  html_url: string;
};

export function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!username) {
      return;
    }

    try {
      setRepositories([]);
      setIsLoading(true);

      const response = await fetch(`https://api.github.com/users/${username}/repos`);
      const data = await response.json() as Repository[];

      setRepositories(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Github Finder</h1>
      <p>Encontre todos os repositórios de um usuário do Github. Basta inserir seu nome no campo abaixo.</p>

      <form className="form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="username" 
          id="username" 
          placeholder="Usuário" 
          value={username}
          onChange={handleChange}
        />
        <button type="submit">Encontrar repositórios</button>
      </form>

      {isLoading && <p className="loading-text">Carregando</p>}
      
      <ul>
        {repositories.map(repository => (
          <li key={repository.id}>
            <strong>{repository.name}</strong>
            <p>{repository.description}</p>
            <p>{repository.language}</p>
            <a href={repository.html_url} target="_blank" rel="noopener noreferrer">
              Acessar
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
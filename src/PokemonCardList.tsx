import React, { useEffect, useState } from 'react';
import PokemonCard from './PokemonCard';
import './PokemonStyle.css';
import ReactPaginate from 'react-paginate';

interface Pokemon {
  name: string;
  url: string;
}

const PokemonCardList: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [count, setCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const itemsPerPage: number = 20;

  const startIndex: number = currentPage * itemsPerPage;
  const endIndex: number = startIndex + itemsPerPage;
  const paginatedPokemonList: Pokemon[] = pokemonList.slice(startIndex, endIndex);

  const handlePageClick = (data: { selected: number }) => {
    const selectedPage: number = data.selected;
    setCurrentPage(selectedPage);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${count}`);
        const data: { results: Pokemon[], count: number } = await response.json();
        setPokemonList(data.results);
        setCount(data.count);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [count]);

  return (
    <>
      {pokemonList.length > 0 ? (
        <div className="pokemon-card-list">
          {paginatedPokemonList.map((pokemon) => (
            <PokemonCard key={pokemon.name} name={pokemon.name} url={pokemon.url} />
          ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={Math.ceil(count / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
        pageClassName={'pagination-item'}
      />
    </>
  );
};

export default PokemonCardList;

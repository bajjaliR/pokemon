import PokemonCardList from './PokemonCardList';

function Home() {

  return (
    <div>
      <div className="header-container">
        <header className={`main-header`}>
          <h2>Pokémon Cards</h2>
        </header>
      </div>
      <div className="card-container">
        <PokemonCardList />
      </div>
    </div>
  );
}

export default Home;
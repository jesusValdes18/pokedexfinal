import React from 'react';
function PokemonCard({ pokemon, onClick, isSelected }) {
  const cardClassName = `pokemon-card ${isSelected ? 'selected' : ''}`;
  return (
    <div className={cardClassName} onClick={onClick}>
      <img src={pokemon.imageUrl} alt={pokemon.name} />
      <p>{pokemon.name}</p>
    </div>
  );
}
function PokemonCarousel({ pokemonList, onSelect, selectedId }) {
  return (
    <div className="pokemon-carousel-container">
      <h3>Elige un Pokémon</h3>
      <div className="pokemon-carousel">
        <div className="pokemon-carousel-track">
          {pokemonList.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              isSelected={pokemon.id === selectedId}
              onClick={() => onSelect(pokemon)}
            />
          ))}
          {pokemonList.map((pokemon) => (
            <PokemonCard
              key={`${pokemon.id}-duplicate`}
              pokemon={pokemon}
              isSelected={pokemon.id === selectedId}
              onClick={() => onSelect(pokemon)}
            />
          ))}
        </div> 
      </div> 
    </div>
  );
}
export default PokemonCarousel;
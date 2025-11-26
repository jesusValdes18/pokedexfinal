import React from 'react';
function PokemonDisplay({ pokemon }) {
  if (!pokemon) {
    return <div className="pokemon-display-empty">Selecciona un Pokémon del carrusel.</div>;
  }
  return (
    <div className="pokemon-display">
      <img src={pokemon.imageUrl} alt={pokemon.name} />
      <h2>{pokemon.name}</h2>
      <p>Tipo: {pokemon.type}</p>
    </div>
  );
}
export default PokemonDisplay;
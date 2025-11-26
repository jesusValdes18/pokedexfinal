import React from 'react';
import { Link } from 'react-router-dom'; 
import './Atrapados.css'; 
function Atrapados({ pokemonList, onDelete }) {
  return (
    <div className="atrapados-container">
      <div className="atrapados-header">
        <h1>Mis Pokémon Atrapados</h1>
        <Link to="/" className="back-button">
          &larr; Volver a la Pokédex
        </Link>
      </div>
      <div className="pokemon-grid">
        {pokemonList.map((pokemon) => (
          <div className="pokemon-grid-card" key={pokemon.id}>
            <img src={pokemon.imageUrl} alt={pokemon.name} />
            <h3>{pokemon.name}</h3>
            <p>Tipo: {pokemon.type}</p>
            <div className="card-buttons">
              <Link 
                to={`/edit/${pokemon.id}`} 
                className="edit-button"
              >
                Editar
              </Link>
              <button 
                onClick={() => onDelete(pokemon.id)} 
                className="delete-button"
              >
                Liberar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Atrapados;
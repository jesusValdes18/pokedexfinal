import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './EditPokemon.css'; // Crearemos este archivo
function EditPokemon({ pokemonList, onEdit }) {
  const { pokemonId } = useParams();
  const pokemonToEdit = pokemonList.find(
    (p) => p.id === Number(pokemonId)
  );
  const [name, setName] = useState(pokemonToEdit.name);
  const [type, setType] = useState(pokemonToEdit.type);
  const navigate = useNavigate(); 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !type) {
      alert('Por favor, rellena nombre y tipo');
      return;
    }
    const searchName = name.toLowerCase().replace('.', '').replace(' ', '-');
    const imageUrl = `https://play.pokemonshowdown.com/sprites/ani/${searchName}.gif`;
    onEdit(pokemonToEdit.id, { name, type, imageUrl });
  };
  return (
    <div className="edit-container">
      <h1>Editar a {pokemonToEdit.name}</h1>
      <form className="edit-form" onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Tipo:</label>
        <input
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <div className="form-buttons">
          <button type="submit" className="save-button">
            Guardar Cambios
          </button>
          {/* El botón de cancelar nos lleva de vuelta */}
          <Link to="/atrapados" className="cancel-button">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
export default EditPokemon;
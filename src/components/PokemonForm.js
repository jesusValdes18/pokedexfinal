import React, { useState } from 'react';
function PokemonForm({ onRegister }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !type || !imageUrl) {
      alert('Por favor, rellena todos los campos');
      return;
    }
    onRegister({ name, type, imageUrl });
    setName('');
    setType('');
    setImageUrl('');
  };
  return (
    <form className="pokemon-form" onSubmit={handleSubmit}>
      <h3>Registrar nuevo Pokémon</h3>
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Tipo (ej: Fuego, Agua)"
        value={type}
        onChange={(e) => setType(e.target.value)}
      />
      <input
        type="text"
        placeholder="URL de la imagen"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <button type="submit">Registrar</button>
    </form>
  );
}
export default PokemonForm;
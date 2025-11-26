import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

// Componentes y Páginas
import PokemonForm from './components/PokemonForm';
import PokemonDisplay from './components/PokemonDisplay';
import PokemonCarousel from './components/PokemonCarousel';
import Atrapados from './pages/Atrapados';
import EditPokemon from './pages/EditPokemon'; 
import Store from './pages/Store'; 

import './App.css'; 
import './pages/Store.css'; 

// (El componente PokedexHome se queda igual)
function PokedexHome({ pokemonList, onRegister, userBalance }) {
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    if (pokemonList.length > 0 && !selectedPokemon) {
      setSelectedPokemon(pokemonList[0]);
    }
  }, [pokemonList, selectedPokemon]);

  const handleSelectPokemon = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  return (
    <div className="pokedex-home">
      <div className="nav-header">
        <div className="user-balance">
          PokéCoins: {userBalance}
        </div>
        <Link to="/store" className="nav-button store-button">
          Tienda
        </Link>
        <Link to="/atrapados" className="nav-button">
          Mis Pokémon
        </Link>
      </div>

      <div className="main-content">
        <div className="main-display-column">
          <h3>Pantalla Principal</h3>
          <PokemonDisplay pokemon={selectedPokemon} />
        </div>
        <div className="main-form-column">
          <h3>Registrar Pokémon</h3>
          <PokemonForm onRegister={onRegister} />
        </div>
      </div>

      <PokemonCarousel
        pokemonList={pokemonList}
        onSelect={handleSelectPokemon}
        selectedId={selectedPokemon ? selectedPokemon.id : null}
      />
    </div>
  );
}


// --- Componente Principal (App) ---
function App() {
  
  const [pokemonList, setPokemonList] = useState([]);
  const navigate = useNavigate();
  const API_URL = 'http://localhost:4000/api/pokemon';

  // --- Funciones para cargar/guardar en localStorage ---
  const getFromStorage = (key, defaultValue) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : defaultValue;
  };

  // --- ESTADO GLOBAL (incluyendo los nuevos para la tienda) ---
  const [userBalance, setUserBalance] = useState(
    () => getFromStorage('userBalance', 50)
  );
  const [ownedThemes, setOwnedThemes] = useState(
    () => getFromStorage('ownedThemes', ['theme-classic'])
  );
  const [activeTheme, setActiveTheme] = useState(
    () => getFromStorage('activeTheme', 'theme-classic')
  );
  // ¡NUEVO ESTADO para las pokebolas compradas!
  const [ownedPokeballs, setOwnedPokeballs] = useState(
    () => getFromStorage('ownedPokeballs', [])
  );


  // --- EFECTOS PARA GUARDAR EN LOCALSTORAGE ---
  useEffect(() => { localStorage.setItem('userBalance', JSON.stringify(userBalance)); }, [userBalance]);
  useEffect(() => { localStorage.setItem('ownedThemes', JSON.stringify(ownedThemes)); }, [ownedThemes]);
  useEffect(() => { localStorage.setItem('activeTheme', JSON.stringify(activeTheme)); }, [activeTheme]);
  // ¡NUEVO EFECTO para guardar las pokebolas!
  useEffect(() => { localStorage.setItem('ownedPokeballs', JSON.stringify(ownedPokeballs)); }, [ownedPokeballs]);


  // --- Lógica de la API (igual que antes) ---
  const loadPokemon = () => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setPokemonList(data))
      .catch(err => console.error("Error al cargar Pokémon:", err));
  };
  useEffect(() => { loadPokemon(); }, []); 

  const handleRegisterPokemon = async (newPokemonData) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPokemonData)
    });
    if (response.ok) {
      loadPokemon(); 
      setUserBalance(prevBalance => prevBalance + 1000);
      alert("¡Pokémon registrado! ¡Has ganado 1000 PokéCoins!");
    }
  };

  const handleDeletePokemon = async (idToDelete) => {
    if (window.confirm("¿Seguro que quieres liberar este Pokémon?")) {
      const response = await fetch(`${API_URL}/${idToDelete}`, { method: 'DELETE' });
      if (response.ok) loadPokemon(); 
    }
  };

  const handleEditPokemon = async (idToEdit, updatedData) => {
    const response = await fetch(`${API_URL}/${idToEdit}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData)
    });
    if (response.ok) {
      loadPokemon(); 
      navigate('/atrapados'); 
    }
  };

  // --- ¡NUEVA FUNCIÓN GENERAL PARA COMPRAR ITEMS! ---
  // Ahora recibe el tipo de item
  const handleBuyItem = (itemId, cost, itemType) => {
    if (userBalance >= cost) {
      setUserBalance(prevBalance => prevBalance - cost);
      
      if (itemType === 'theme') {
        setOwnedThemes(prevThemes => [...prevThemes, itemId]);
        alert(`¡Has comprado el tema ${itemId}!`);
      } else if (itemType === 'pokeball') {
        setOwnedPokeballs(prevBalls => [...prevBalls, itemId]);
        alert(`¡Has comprado una ${itemId}!`);
        // Aquí podrías añadir lógica para qué hace la Pokebola
      }
      
    } else {
      alert("No tienes suficientes PokéCoins.");
    }
  };

  const handleSetTheme = (themeId) => {
    setActiveTheme(themeId);
  };

  
  return (
    <div className={`App ${activeTheme}`}>
      <header className="App-header">
        <h1>Mi Pokédex</h1>
      </header>

      <Routes>
        <Route 
          path="/" 
          element={
            <PokedexHome 
              pokemonList={pokemonList} 
              onRegister={handleRegisterPokemon}
              userBalance={userBalance} 
            />
          } 
        />
        <Route 
          path="/atrapados" 
          element={
            <Atrapados 
              pokemonList={pokemonList} 
              onDelete={handleDeletePokemon} 
            />
          } 
        />
        <Route 
          path="/edit/:pokemonId" 
          element={
            <EditPokemon 
              onEdit={handleEditPokemon}
            />
          }
        />
        
        <Route
          path="/store"
          element={
            <Store
              userBalance={userBalance}
              ownedThemes={ownedThemes}
              activeTheme={activeTheme}
              // ¡Ahora pasamos la función general de comprar items!
              onBuyItem={handleBuyItem} 
              onSetTheme={handleSetTheme}
              // Pasamos la lista de Pokebolas poseídas
              ownedPokeballs={ownedPokeballs}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
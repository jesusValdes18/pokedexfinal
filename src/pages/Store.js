import React from 'react';
import { Link } from 'react-router-dom';
const SHOP_ITEMS = [
  {
    type: 'theme', 
    id: 'theme-classic',
    name: 'Rojo Clásico',
    cost: 0,
    color: '#d92323'
  },
  {
    type: 'theme',
    id: 'theme-blue',
    name: 'Azul Zafiro',
    cost: 100,
    color: '#007bff'
  },
  {
    type: 'theme',
    id: 'theme-green',
    name: 'Verde Esmeralda',
    cost: 100,
    color: '#28a745'
  },
  {
    type: 'theme',
    id: 'theme-dark',
    name: 'Negro Obsidiana',
    cost: 250,
    color: '#343a40'
  },
  {
    type: 'theme', 
    id: 'theme-purple',
    name: 'Morado Veneno',
    cost: 150,
    color: '#8A2BE2' 
  },
  {
    type: 'pokeball', 
    id: 'pokeball-master',
    name: 'Master Ball',
    cost: 500,
    imageUrl: 'https://archives.bulbagdata:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAw1BMVEUAAAD///+FCYVXB1eto636CK2zBnzNyPDc3NzEI8SlpaVaB1ohAyF8CXyICYhUB1SzqbNCPkJwanAzAzOiBXB0BFBhYWHY1NhzCHOonajUz/hOTFvv7e84BTh6CYJOB1SiCY5uB2CdFZ1LBkuFgpzn5PjY1POVjJXAucCzHbOiF6KQCpCnp6e7sLvk5OQaABpUVFQ/PU/d2P8vKi+ka4xkCGSOa3+3CZV/BmZHBkdqQGqWlKFMMlMVARUnACdmW2aMiYwBIoDwAAADhUlEQVR4nO3d2VIaURRGYQMmQZDBGbWdkxhlEDXz/P5PlVSMXPS/IZvtoauh1rq05PT5GrpKezisPEvXSrpSzirlWAgRIozNKuVYCBEijM0q5VgIESKMzSrlWAgRIozNKuVYCyzMao6GN1vSeqyVoWeDWUJh3bXje618zWojlmt79cKFrUq+ZrsaCiFChAgRIkSIECFChAgRllPYDwulhMJ+VJjV8/XfbXsSYKXSld67iDuePvRlpsaJDUNY0721/dzTsQrlvEar63kXT1542tGJ1goXKhkhQoQIESJEiBAhQoQIESJ8EDoqhfDjqeQA/qnp6Uz6VLjw1POORWvJR7l9VrxwjkBDWEWIECFChAgRIkSIcKrw/OqxpRWuPYYQYWHCYQmEF3JiwyccGkLtRp+bqBxL49nMQ2jc4dA8kYyHOQyO0ZbeFzOtuQg1181HjXWETxM254T7W/HC3vm/rsfC8Y9m20VlFV6tTe4cIUKECBEiRLgkwnH8XZqoUgjnZHuorEL9T9ZooYX6vIWRcafCoghbXdcGP+vtJsEHjMoqvJCZIkSYVti7fmxZhVNCiBAhQoQIESJEiPAJQr2O7zMbywv4hHI5vm1cxzeEeh3fJ1xvyC7teojGLSJfZF2H/tdX0rejfFvGahM6+oW87ui7S2hkfGoMob5uV2/+eP3yIN+hvrDhWDKkcRTlGFVTCvOZQs9BhxAhQoQIESJEiBAhQoQIixa2jRMbUi+l0FNYOJKvzxhe/tAv59B0qMM30oFL6Pmaj5ufl9KGS2jseN/6pYZQPZoldLXZWc3VCQt9a9BqCBFOD+HEEM4QQoTTQzgxhDOEEOH0EE4M4QyVVDhKJ7y9k4v22t1tcPTNQSfX4N74NeUY62L4vu/ENZSRsZiF0apwNl1D+dY2iQqNoYyMBUm0bF8+koYwvHoLQoQIESJEiBAhQoQIESJE+BThcLT7/0Z7maNaOYW+3u57ygMXSiiTd4UQIUKECBEiRIgQIUKECJdfmL9mbxYWZvmVHrztBRsYb4+nX7ImRT1zCY18d5t0XGcjHOcnVjuu7fVdc08qjB1P1iHm2p7v2EGIECFChAgRIkSIECFChEUL5fGHcIPChVl+HQmr4f1Gqu5l4Qor45RFWOjLteN9pZxVyrEQIkQYm1XKsRAiRBibVcqxECJEGJtVyrEQIkQYm1XKsUop/A1lzAl/9F6bHgAAAABJRU5ErkJggg==arden.net/media/upload/thumb/f/f6/Master_Ball_VI_sprite.png/64px-Master_Ball_VI_sprite.png'
  },
  {
    type: 'pokeball',
    id: 'pokeball-ultra',
    name: 'Ultra Ball',
    cost: 200,
    imageUrl: 'https://archives.bulbagarden.net/media/upload/thumb/7/77/Ultra_Ball_VI_sprite.png/64px-Ultra_Ball_VI_sprite.png'
  },
  {
    type: 'pokeball',
    id: 'pokeball-great',
    name: 'Great Ball',
    cost: 100,
    imageUrl: 'https://archives.bulbagarden.net/media/upload/thumb/a/ae/Great_Ball_VI_sprite.png/64px-Great_Ball_VI_sprite.png'
  }
];
const groupItemsByType = (items) => {
  return items.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {});
};
function Store({ userBalance, ownedThemes, activeTheme, onBuyItem, onSetTheme, ownedPokeballs }) {
  const groupedItems = groupItemsByType(SHOP_ITEMS);
  return (
    <div className="store-container">
      <div className="store-header">
        <h1>Tienda de Temas y Objetos</h1>
        <div className="header-info">
          <div className="user-balance-store">
            PokéCoins: {userBalance}
          </div>
          <Link to="/" className="back-button">
            &larr; Volver a la Pokédex
          </Link>
        </div>
      </div>
      {Object.keys(groupedItems).map(type => (
        <div key={type} className="item-category-section">
          <h2 className="category-title">{type === 'theme' ? 'Temas Visuales' : 'Objetos (Pokeballs)'}</h2>
          <div className="store-grid">
            {groupedItems[type].map((item) => {
              const isOwnedTheme = ownedThemes.includes(item.id);
              const isEquippedTheme = activeTheme === item.id;
              const isOwnedPokeball = ownedPokeballs.includes(item.id);
              return (
                <div className="store-item" key={item.id}>
                  {item.type === 'theme' ? (
                    <div 
                      className="item-preview" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                  ) : (
                    <div className="item-preview pokeball-preview">
                        <img src={item.imageUrl} alt={item.name} />
                    </div>
                  )}
                  <h3>{item.name}</h3>
                  <p>Costo: {item.cost} monedas</p>
                  <div className="item-buttons">
                    {item.type === 'theme' ? ( 
                      isOwnedTheme ? (
                        isEquippedTheme ? (
                          <button className="equip-button" disabled>
                            Equipado
                          </button>
                        ) : (
                          <button 
                            className="equip-button"
                            onClick={() => onSetTheme(item.id)}
                          >
                            Equipar
                          </button>
                        )
                      ) : (
                        <button
                          className="buy-button"
                          onClick={() => onBuyItem(item.id, item.cost, item.type)}
                          disabled={userBalance < item.cost}
                        >
                          Comprar Tema
                        </button>
                      )
                    ) : ( 
                      isOwnedPokeball ? (
                        <button className="equip-button" disabled>
                            Comprado
                        </button>
                      ) : (
                        <button
                          className="buy-button"
                          onClick={() => onBuyItem(item.id, item.cost, item.type)}
                          disabled={userBalance < item.cost}
                        >
                          Comprar Pokeball
                        </button>
                      )
                    )}
                  </div>
                </div>
              );
            })}
          </div> 
        </div> 
      ))}
    </div>
  );
}

export default Store;
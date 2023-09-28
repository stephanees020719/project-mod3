// components/CharacterList/CharacterList.jsx
import React, { useState, useEffect } from 'react';

function CharacterList() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    // Fetch characters when the component mounts
    // `fetch` API 
    fetch('/api/characters')
      .then((response) => response.json())
      .then((data) => setCharacters(data))
      .catch((error) => console.error('Error fetching characters', error));
  }, []);

  return (
    <div>
      <h2>Dragon Ball Z Characters</h2>
      <ul>
        {characters.map((character) => (
          <li key={character._id}>
            <img src={character.picture} alt={character.name} />
            {character.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CharacterList;

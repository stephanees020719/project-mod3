// src/pages/NewCharacterPage/NewCharacterPage.jsx
import React, { useState, useEffect } from 'react';
import './NewCharacterPage.css'; 


function NewCharacterPage() {
  const [newCharacter, setNewCharacter] = useState({ name: '', picture: '', comment: '' });
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [characters, setCharacters] = useState([]);

  
  // const [characterList, setCharacterList] = useState(characters);
  
  
  useEffect(() => {
    // Fetch characters data from the API endpoint
    fetch('/api/characters')
      .then((response) => response.json())
      .then((data) => setCharacters(data))
      .catch((error) => console.error('Error fetching characters', error));
  }, []);
 
  //include a random character  
  const selectRandomCharacter = () => {
    const randomIndex = Math.floor(Math.random() * characters.length);
    const randomCharacter = characters[randomIndex];
    setSelectedCharacter(randomCharacter);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to create a new character
      const response = await fetch('/api/characters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCharacter),
      });

      if (response.ok) {
        // Character created successfully, update the list of characters
        const characterData = await response.json();
        setCharacters([...characters, characterData]);
        setNewCharacter({ name: '', picture: '', comment: '' });
      } else {
        console.error('Failed to create character');
      }
    } catch (error) {
      console.error('Error creating character', error);
    }
  };

  return (
    <div>
      <h1>Create Your Dragon Ball Z Character </h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Character"
          value={newCharacter.name}
          onChange={(e) => setNewCharacter({ ...newCharacter, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Character Picture URL"
          value={newCharacter.picture}
          onChange={(e) => setNewCharacter({ ...newCharacter, picture: e.target.value })}
        />
           <input
          type="text"
          placeholder="Comment"
          value={newCharacter.comment}
          onChange={(e) => setNewCharacter({ ...newCharacter, comment: e.target.value })}
        />
        <button type="submit">Create Character</button>
      </form>
      {/* ramdon character button */}
      <button onClick={selectRandomCharacter}>Random Character</button>
      {selectedCharacter && (
        <div>
          <h2>Your character of the day</h2>
          <h3>If you can't find that bug  {selectedCharacter.name} says:{' '}
          {selectedCharacter.comment}</h3>
          <img src={selectedCharacter.picture} alt={selectedCharacter.name} />
        </div>
       
      )}
     
    </div>
  );
}

export default NewCharacterPage;




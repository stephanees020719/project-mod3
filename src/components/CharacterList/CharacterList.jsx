
import React, { useState, useEffect } from 'react';

function CharacterList({ user }) {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [editedCharacter, setEditedCharacter] = useState({
    name: '', 
    picture: '', 
  });

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch('/api/characters');
        if (response.ok) {
          const data = await response.json();
          setCharacters(data);
        } else {
          console.error('Error fetching characters');
        }
      } catch (error) {
        console.error('Error fetching characters', error);
      }
    };

    fetchCharacters();
  }, []);

  const handleEditCharacter = (characterId) => {
    // Redirect to the edit character page, passing the character ID
    window.location.href = `/characters/edit/${characterId}`;
  };

  const handleDeleteCharacter = async (characterId) => {
    try {
      const response = await fetch(`/api/characters/${characterId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Character deleted successfully, update the list of characters
        const updatedCharacters = characters.filter(
          (character) => character._id !== characterId
        );
        setCharacters(updatedCharacters);
      } else {
        console.error('Failed to delete character');
      }
    } catch (error) {
      console.error('Error deleting character', error);
    }
  };

  const handleEditClick = (character) => {
    setSelectedCharacter(character);
    setEditedCharacter({
      name: character.name,
      picture: character.picture,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCharacter({ ...editedCharacter, [name]: value });
  };

  const handleEditSave = async () => {
    try {
      const response = await fetch(`/api/characters/${selectedCharacter._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedCharacter),
      });

      if (response.ok) {
        // Character updated successfully
        // Close the edit form and update the character list
        setSelectedCharacter(null);
        const updatedCharacters = characters.map((character) => {
          if (character._id === selectedCharacter._id) {
            return {
              ...character,
              name: editedCharacter.name,
              picture: editedCharacter.picture,
            };
          }
          return character;
        });
        setCharacters(updatedCharacters);
      } else {
        console.error('Failed to update character');
      }
    } catch (error) {
      console.error('Error updating character', error);
    }
  };

  const handleCancelClick = () => {
   
    setSelectedCharacter(null);
  };

  return (
    <div>
      <h2>Dragon Ball Z Characters</h2>
      <ul>
        {characters.map((character) => (
          <CharacterItem
            key={character._id}
            character={character}
            user={user}
            onEditCharacter={handleEditClick}
            onDeleteCharacter={handleDeleteCharacter}
          />
        ))}
      </ul>
      {selectedCharacter && (
        <div>
          <h3>Edit Character</h3>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={editedCharacter.name}
            onChange={handleInputChange}
          />
          <label>Picture:</label>
          <input
            type="text"
            name="picture"
            value={editedCharacter.picture}
            onChange={handleInputChange}
          />
          <button onClick={handleEditSave}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
      )}
    </div>
  );
}

function CharacterItem({ character, user, onEditCharacter, onDeleteCharacter }) {
  return (
    <li key={character._id}>
      <img src={character.picture} alt={character.name} />
      {character.name}
      {user && (
        <div>
          <button onClick={() => onEditCharacter(character)}>Edit</button>
          <button onClick={() => onDeleteCharacter(character._id)}>Delete</button>
        </div>
      )}
    </li>
  );
}

export default CharacterList;

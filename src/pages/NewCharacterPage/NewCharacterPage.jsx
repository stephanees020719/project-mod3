// pages/NewOrderPage/NewOrderPage.jsx

// Import necessary hooks and functions
import React, { useState } from 'react';
import CharacterList from '../../components/CharacterList/CharacterList';

function NewOrderPage() {
  const [newCharacter, setNewCharacter] = useState({ name: '', picture: '' });

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
        setNewCharacter({ name: '', picture: '' });
      } else {
        console.error('Failed to create character');
      }
    } catch (error) {
      console.error('Error creating character', error);
    }
  };

  return (
    <div>
      <h1>New Character Page</h1>
      {/* <CharacterList /> */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Character Name"
          value={newCharacter.name}
          onChange={(e) => setNewCharacter({ ...newCharacter, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Character Picture URL"
          value={newCharacter.picture}
          onChange={(e) => setNewCharacter({ ...newCharacter, picture: e.target.value })}
        />
        <button type="submit">Create Character</button>
      </form>
    </div>
  );
}

export default NewOrderPage;

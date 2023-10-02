
//src/components/CharacterList/CharacterList.jsx
//import my modules 
import React, { useState, useEffect } from 'react';


//function 
function CharacterList({ user }) {
//declare my state variable and initialized as empty array
  const [characters, setCharacters] = useState([]);
 // declare state variable initialized as null
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [editedCharacter, setEditedCharacter] = useState({
    name: '', // Initialize with empty values
    picture: '', 
    comment: '',
  });

  useEffect(() => {
    //async  function
    const fetchCharacters = async () => {
      try {
        //try fetch data from my API endpoint
        //send http get request 
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
  

    fetchCharacters(); //call the function to initiate to fecth my data 
  }, []);// this effect runs only once when the component is mounted

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
        // character deleted successfully, update the list of characters
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
//function to edit take character as parameter 
  const handleEditClick = (character) => {
    setSelectedCharacter(character);
    setEditedCharacter({
      name: character.name,
      picture: character.picture,
      comment: character.comment,
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
        // character updated successfully

        setSelectedCharacter(null);
        const updatedCharacters = characters.map((character) => {
          if (character._id === selectedCharacter._id) {
            return {
              ...character,
              name: editedCharacter.name,
              picture: editedCharacter.picture,
              comment: editedCharacter.comment 
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
    // Close the edit form without saving changes
    setSelectedCharacter(null);
  };

  return (
    <div>
      <h2>Dragon Ball Z Characters</h2>
      <ul>

      {/* //map though my characters array  */}
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
          <label>Comment:</label>
          <input
            type="text"
            name="comment"
            value={editedCharacter.comment}
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
      <img src={character.picture} alt={character.name} /><br />
      Name: {character.name}{' '}<br />
      Comment: {character.comment}
      {user && (
        //edit delete button
        <div>
        <button onClick={() => onEditCharacter(character)}>Edit</button>
          <button onClick={() => onDeleteCharacter(character._id)}>Delete</button>
        </div>
      )}
    </li>
  );
}

export default CharacterList;

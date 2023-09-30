
import React, { useState, useEffect } from 'react';
import CharacterList from '../../components/CharacterList/CharacterList';

 
function CharacterHistoryPage() {
  // State to store the user's characters
  const [userCharacters, setUserCharacters] = useState([]);
  const user = {}; 

  useEffect(() => {
    // Fetch the user's characters 

    fetch('/api/users/characters', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user.token}`, 
      },
    })
      .then((response) => response.json())
      .then((data) => setUserCharacters(data))
      .catch((error) => console.error('Error fetching characters', error));
  }, [user]);

  return (
    <div>
      <h1>Your Dragon Ball Z Characters</h1>
      {/* Pass the user's characters to the CharacterList component */}
      <CharacterList characters={userCharacters} user={user} />
    </div>
  );
}

export default CharacterHistoryPage;

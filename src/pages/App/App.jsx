import './App.css';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import CharacterHistoryPage from '../CharacterHistoryPage/CharacterHistoryPage.jsx';
import NewCharacterPage from '../NewCharacterPage/NewCharacterPage.jsx';
import AuthPage from '../AuthPage/AuthPage.jsx';
import NavBar from '../../components/NavBar/NavBar';

import { getUser } from '../../utilities/users-service'
function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route path="/characters/new" element={<NewCharacterPage />} />
            <Route path="/characters" element={<CharacterHistoryPage />} />
            
          
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}

export default App;

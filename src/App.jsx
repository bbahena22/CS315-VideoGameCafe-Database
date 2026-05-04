import { useState } from 'react'
import './App.css'
import Login from './game-cafe-system/client/LoginPage.jsx'
import Dashboard from './game-cafe-system/client/Dashboard.jsx'

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="app-shell">
      {loggedIn ? (
        <Dashboard />
      ) : (
        <Login setLoggedIn={setLoggedIn} />
      )}
    </div>
  );
}

export default App;

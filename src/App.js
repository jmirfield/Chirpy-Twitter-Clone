import React, { useContext } from 'react'
import AuthContext from './context/AuthContext';
import Login from './pages/Login/Login'

function App() {
  const ctx = useContext(AuthContext)

  return (
    <div className="App">
      {!ctx.isLogged && <Login/>}
    </div>
  );
}

export default App;

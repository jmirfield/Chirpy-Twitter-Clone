import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login/Login';
import SignIn from './components/Login/SignIn';
import SignUp from './components/Login/SignUp';
import Home from './components/Home/Home';
import MainLayout from './components/MainLayout/MainLayout';


function App() {
  const loggedIn = true
  const username = 'justinmirf'

  if (!loggedIn) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}>
            <Route path='flow/signin' element={<SignIn />} />
            <Route path='flow/signup' element={<SignUp />} />
            <Route path='flow/*' element={<Navigate replace to='/' />} />
          </Route>
          <Route path='*' element={<Navigate replace to='/'/> } />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout username={username}/>} >
          <Route path='home' element={<Home />} />
          <Route path=':user' element={<p>PLACEHOLDER</p>} />
          <Route path=':user/lists' element={<p>LISTS PLACEHOLDER</p>} />
          <Route path='flow/*' element={<p>BOOKMARKS PLACEHOLDER</p>} />
          <Route path='' element={<Navigate replace to='home' />} />
        </Route >
      </Routes>
    </BrowserRouter>
  )
}

export default App;

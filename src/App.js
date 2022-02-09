import { useContext, useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login/Login';
import SignIn from './components/Login/SignIn';
import SignUp from './components/Login/SignUp';
import Home from './components/Home/Home';
import MainLayout from './components/MainLayout/MainLayout';
import GuestLayout from './components/GuestLayout/GuestLayout';
import MainContext from './context/MainContext';
import Loading from './components/Loading/Loading';
import Profile from './components/Profile/Profile';


function App() {
  const ctx = useContext(MainContext)
  const [chirps, setChirps] = useState([])
  const [likedChirps, setLikedChirps] = useState([])
  const [retweetedChirps, setRetweetedChirps] = useState([])

  const getFeedHandler = (feed, likedChirps, retweetedChirps) => {
    const chirpArr = feed.map(chirp => {
      let isLiked;
      let isRechirped = false;
      if (chirp.rechirp) {
        isLiked = likedChirps.includes(chirp.rechirp.original_id)
      } else {
        isLiked = likedChirps.includes(chirp._id)
        isRechirped = retweetedChirps.includes(chirp._id)
      }
      return { ...chirp, isLiked, isRechirped }
    })
    setChirps(chirpArr)
  }

  if (ctx.isLoading) {
    return (
      <>
        <Loading />
      </>
    )
  }

  if (!ctx.user && !ctx.isLogged) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}>
            <Route path='flow/signin' element={<SignIn />} />
            <Route path='flow/signup' element={<SignUp />} />
            <Route path='flow/*' element={<Navigate replace to='/' />} />
          </Route>
          <Route path='home' element={<Navigate replace to='/' />} />
          <Route path=':user' element={<GuestLayout />} />
          <Route path='*' element={<Navigate replace to='/' />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout username={ctx.user} />} >
          <Route path='home' element={<Home chirps={chirps} onGetFeed={getFeedHandler}/>} />
          <Route path='explore' element={<p>EXPLORE PAGE</p>} />
          <Route path='notifications' element={<p>NOTFICATIONS PAGE</p>} />
          <Route path='messages' element={<p>MESSAGES PAGE</p>} />
          <Route path='flow/bookmarks' element={<p>BOOKMARKS PAGE</p>} />
          <Route path=':user' element={<Profile />} />
          <Route path=':user/lists' element={<p>LISTS PLACEHOLDER</p>} />
          <Route path=':user/status/:chirpId' element={<p>CHIRP PLACEHOLDER</p>} />
          <Route path='*' element={<Navigate replace to='/home' />} />
          <Route path='/' element={<Navigate replace to='/home' />} />
        </Route >
      </Routes>
    </BrowserRouter>
  )
}

export default App;

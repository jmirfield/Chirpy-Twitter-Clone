import { useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login/Login';
import SignIn from './components/Login/SignIn';
import SignUp from './components/Login/SignUp';
import Home from './components/Home/Home';
import MainLayout from './components/MainLayout/MainLayout';
import AuthContext from './context/AuthContext';
import LoadingIcon from './components/Loading/LoadingIcon';
import Profile from './components/Profile/Profile';
import ProfileFeed from './components/Profile/ProfileFeed';
import ProfileLikes from './components/Profile/ProfileLikes';
import ProfileRelationships from './components/Profile/ProfileRelationships';
import ProfileFollowings from './components/Profile/ProfileFollowing';
import ProfileFollowers from './components/Profile/ProfileFollower';
import ProfileMedia from './components/Profile/ProfileMedia';
import Explore from './components/Explore/Explore';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Status from './components/Status/Status';
import StatusReplies from './components/Status/StatusReplies';

const App = () => {
  const { state } = useContext(AuthContext)

  if (state.isLoading) {
    return (
      <>
        <LoadingIcon />
      </>
    )
  }

  if (!state.user && !state.isLogged) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}>
            <Route path='flow/signin' element={<SignIn />} />
            <Route path='flow/signup' element={<SignUp />} />
            <Route path='flow/*' element={<Navigate replace to='/' />} />
          </Route>
          <Route path='home' element={<Navigate replace to='/' />} />
          <Route path='*' element={<Navigate replace to='/' />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />} >
          <Route path='home' element={<Home />} />
          <Route path='explore' element={<Explore />} />
          <Route path='notifications' element={<p>NOTFICATIONS PAGE</p>} />
          <Route path='messages' element={<p>MESSAGES PAGE</p>} />
          <Route path='flow/bookmarks' element={<p>BOOKMARKS PAGE</p>} />
          <Route path=':user' element={<Profile />} >
            <Route path='' element={<ProfileFeed />} />
            <Route path='media' element={<ProfileMedia />} />
            <Route path='likes' element={<ProfileLikes />} />
          </Route>
          <Route path=':user/*' element={<ProfileRelationships />}>
            <Route path='following' element={<ProfileFollowings />} />
            <Route path='follower' element={<ProfileFollowers />} />
            <Route path='*' element={<Navigate replace to='' />} />
          </Route>
          <Route path='flow/lists' element={<p>LISTS PLACEHOLDER</p>} />
          <Route path=':user/status' element={<Status />} >
            <Route path=':chirpId' element={<StatusReplies />} />
          </Route>
          <Route path='*' element={<Navigate replace to='/home' />} />
          <Route path='/' element={<Navigate replace to='/home' />} />
          <Route path='flow' element={<Navigate replace to='/home' />} />
        </Route >
      </Routes>
    </BrowserRouter>
  )
}

export default App;

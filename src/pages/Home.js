import { Fragment, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import Login from '../components/Login/Login'

const Home = () => {
    const ctx = useContext(AuthContext)
    return (
        <Fragment>
            {!ctx.isLogged && <Login />}
        </Fragment>
    )
}

export default Home

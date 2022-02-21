import React, { useContext, useState } from 'react'
import ProfileImage from '../UI/ProfileImage/ProfileImage'
import AuthContext from '../../context/AuthContext'
import classes from './MenubarLogout.module.css'

const MenubarLogout = (props) => {
    const { state } = useContext(AuthContext)
    const [isHover, setIsHover] = useState(false)
    const hoverOnHandler = () => setIsHover(true)
    const hoverOffHandler = () => setIsHover(false)

    const buttonClass = !isHover ? classes.logout : `${classes.logout} ${classes.active}`

    return (
        <button
            className={buttonClass}
            onMouseOver={hoverOnHandler}
            onMouseLeave={hoverOffHandler}
            onClick={props.onClick}
        >
            {!isHover
                ? <>
                    <ProfileImage
                        default={true}
                        className={classes.logout__icon}
                    />
                    <span>{state.user}</span> : <h2></h2>
                </>
                : <span>Logout</span>
            }
        </button>
    )
}

export default MenubarLogout
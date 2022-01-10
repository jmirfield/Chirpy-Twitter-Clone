import React from 'react'
import ReactDOM from 'react-dom'

import classes from './LoginModal.module.css'

const portalElement = document.getElementById('overlays')

const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onClick} />
}

const LoginOverlay = (props) => {
    return (
        <div className={classes.modal} onClick={props.onClick} >
            {props.children}
        </div>
    )
}

const LoginModal = (props) => {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(<Backdrop />, portalElement)}
            {ReactDOM.createPortal(<LoginOverlay>{props.children}</LoginOverlay>, portalElement)}
        </React.Fragment>
    )
}

export default LoginModal
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'

import classes from './Modal.module.css'

const portalElement = document.getElementById('overlays')

const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onClick} />
}

const Overlay = (props) => {
    return (
        <div className={classes.modal} onClick={props.onClick} >
            {props.children}
        </div>
    )
}

const Modal = (props) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [])
    return (
        <React.Fragment>
            {ReactDOM.createPortal(<Backdrop onClick={props.onClick} />, portalElement)}
            {ReactDOM.createPortal(<Overlay>{props.children}</Overlay>, portalElement)}
        </React.Fragment>
    )
}

export default Modal
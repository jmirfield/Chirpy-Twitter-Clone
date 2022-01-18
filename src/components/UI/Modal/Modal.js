import React from 'react'
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
    return (
        <React.Fragment>
            {ReactDOM.createPortal(<Backdrop onClick={props.onClick}/>, portalElement)}
            {ReactDOM.createPortal(<Overlay>{props.children}</Overlay>, portalElement)}
        </React.Fragment>
    )
}

export default Modal
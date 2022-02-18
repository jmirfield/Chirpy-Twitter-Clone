import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'

import classes from './Modal.module.css'

const portalElement = document.getElementById('overlays')

const Backdrop = (props) => {
    return <div className={props.className} onClick={props.onClick} />
}

const Overlay = (props) => {
    return (
        <div className={props.className} onClick={props.onClick} >
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
    const modalClass = props.modalClass ? props.modalClass : classes.modal
    const backdropClass = props.backdropClass ? props.backdropClass : classes.backdrop
    return (
        <React.Fragment>
            {ReactDOM.createPortal(<Backdrop className={backdropClass} onClick={props.onClick} />, portalElement)}
            {ReactDOM.createPortal(<Overlay className={modalClass}>{props.children}</Overlay>, portalElement)}
        </React.Fragment>
    )
}

export default Modal
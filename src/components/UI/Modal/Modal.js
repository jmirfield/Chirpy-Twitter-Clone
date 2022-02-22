import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'

import styles from './Modal.module.css'

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
    const modalClass = props.modalClass ? props.modalClass : styles.modal
    const backdropClass = props.backdropClass ? props.backdropClass : styles.backdrop
    return (
        <React.Fragment>
            {ReactDOM.createPortal(<Backdrop className={backdropClass} onClick={props.onClick} />, portalElement)}
            {ReactDOM.createPortal(<Overlay className={modalClass}>{props.children}</Overlay>, portalElement)}
        </React.Fragment>
    )
}

export default Modal
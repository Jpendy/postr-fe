import React from 'react'
import ReactDom from 'react-dom'

const modalStyles = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#7ca6fc',
    padding: '25px 75px',
    zIndex: 1000,
    textAlign: 'center'
}

const overlayStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .7)',
    zIndex: 1000
}

export default function Modal({ children, open, handleCloseModal }) {


    if (!open) return null;
    return ReactDom.createPortal(
        <>
            <div style={overlayStyles} onClick={handleCloseModal} />
            <div style={modalStyles}>
                <button onClick={handleCloseModal} style={{ cursor: 'pointer' }} >close</button>
                {children}
            </div>
        </>,
        document.getElementById('portal')
    )
}

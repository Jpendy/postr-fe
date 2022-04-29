import React from 'react'
import ReactDom from 'react-dom'
import styles from './Modal.css'

const windowWidth = 600;



const overlayStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .7)',
    zIndex: 1000
}

export default function Modal({ children, open, handleCloseModal, backgroundColor = '#FFFFFF' }) {

    const modalStyles = {
        position: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        top: window.innerWidth < windowWidth ? '30px' : '50%',
        left: window.innerWidth < windowWidth ? '0' : '50%',
        transform: window.innerWidth > windowWidth && 'translate(-50%, -50%)',
        height: window.innerWidth < windowWidth && '85vh',
        width: window.innerWidth < windowWidth && '100%',
        backgroundColor,
        maxHeight: '100vh',
        // overflowY: 'scroll',
        zIndex: 1000,
        textAlign: 'center',
    }

    if (!open) return null;
    return ReactDom.createPortal(
        <>
            <div style={overlayStyles} onClick={handleCloseModal} />
            <div style={modalStyles}>
                <button
                    className={styles.modalButton}
                    onClick={handleCloseModal}
                    style={{ cursor: 'pointer' }}
                >
                    close
                </button>
                {children}
            </div>
        </>,
        document.getElementById('portal')
    )
}
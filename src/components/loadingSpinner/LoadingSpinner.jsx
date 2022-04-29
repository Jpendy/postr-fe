import React from 'react'
import ReactDom from 'react-dom'
import styles from './LoadingSpinner.css'

export default function LoadingSpinner() {
    return ReactDom.createPortal(<div className={styles.loader} />, document.getElementById('portal'))
}

import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { TextField } from '@material-ui/core';
import { useAuthError, useGoogleOAuth, usePostrLogin } from '../../providers/AuthProvider';
import styles from './Login.css'

export default function Login({ modalStyle, handleCloseModal }) {
    const history = useHistory()
    const postrLogin = usePostrLogin()
    const googleOAuth = useGoogleOAuth()
    const error = useAuthError();

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    const handleSubmit = e => {
        e.preventDefault()
        postrLogin({ email, password })
            .then(() => {
                if (handleCloseModal) handleCloseModal()
                else history.push('/')
            })
            .catch(console.error)

    }

    return (
        <div className={styles['login-area']} style={modalStyle} >
            <img src='/postr-logo2.png' alt='' />
            <button onClick={googleOAuth} className={styles.googleButton} > <img src="google-logo.png" alt="" />Log in with Google</button>
            <form onSubmit={handleSubmit} >
                {error && <p style={{ color: 'red' }} >{`${error}`}</p>}

                <TextField
                    variant="outlined"
                    size="small"
                    type="email"
                    label='Email'
                    required={true}
                    onChange={e => setEmail(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    size="small"
                    type='password'
                    label='Password'
                    required={true}
                    onChange={e => setPassword(e.target.value)}
                />
                <button className={styles.loginButton} >submit</button>
            </form>
        </div>
    )
}

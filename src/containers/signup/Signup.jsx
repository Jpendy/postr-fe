import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import Input from '../../components/input/Input';
import { useAuthError, useGoogleOAuth, usePostrSignup } from '../../providers/AuthProvider';
import { TextField } from '@material-ui/core';
import styles from './Signup.css'

export default function Signup({ modalStyle, handleCloseModal }) {
    const history = useHistory()
    const postrSignup = usePostrSignup()
    const googleOAuth = useGoogleOAuth()
    const error = useAuthError();

    const [email, setEmail] = useState(null)
    const [displayName, setDisplayName] = useState('')
    const [password, setPassword] = useState(null)

    const handleSubmit = e => {
        e.preventDefault()
        postrSignup({ email, displayName, password })
            .then(() => {
                if (handleCloseModal) handleCloseModal()
                else history.push('/')
            })
            .catch(console.error)
    }

    return (
        <div className={styles['sign-up-area']} style={modalStyle} >
            <img src='/postr-logo2.png' alt='' />
            <button onClick={googleOAuth} className={styles.googleButton} > <img src="google-logo.png" alt="" /> Sign up with Google</button>
            <form onSubmit={handleSubmit} >

                <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    type="email"
                    label='Email'
                    required={true}
                    onChange={e => setEmail(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    type="text"
                    label="Display Name"
                    required={true}
                    onChange={e => setDisplayName(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    type='password'
                    label='Password'
                    required={true}
                    onChange={e => setPassword(e.target.value)}
                />

                <button className={styles.signupButton} >submit</button>
            </form>
            {error && <p style={{ color: 'red' }} >{`${error}`}</p>}
        </div>
    )
}
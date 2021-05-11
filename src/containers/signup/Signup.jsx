import React, { useState } from 'react'
import { useAuthError, useGoogleOAuth, usePostrSignup } from '../../providers/AuthProvider';
// import { useSignup, useAuthError } from '../../hooks/AuthContext'
import styles from './Signup.css'

export default function Signup() {
    const postrSignup = usePostrSignup()
    const googleOAuth = useGoogleOAuth()
    const error = useAuthError();

    const [email, setEmail] = useState(null)
    const [displayName, setDisplayName] = useState('')
    const [password, setPassword] = useState(null)

    const handleSubmit = e => {
        e.preventDefault()
        postrSignup({ email, displayName, password })
    }

    return (
        <div className={styles['sign-up-area']} >
            <img src='/postr-logo2.png' alt='' />
            <button onClick={googleOAuth} className={styles.googleButton} > <img src="google-logo.png" alt="" /> Sign up with Google</button>
            <form onSubmit={handleSubmit} >
                {error && <p style={{ color: 'red' }} >{`${error}`}</p>}
                <input placeholder='email' onChange={e => setEmail(e.target.value)} />
                <input type="text" placeholder="display name" onChange={e => setDisplayName(e.target.value)} />
                <input type='password' placeholder='password' onChange={e => setPassword(e.target.value)} />
                <button>submit</button>
            </form>
        </div>
    )
}
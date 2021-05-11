import React, { useState } from 'react'
import { useAuthError, useGoogleOAuth, usePostrLogin } from '../../providers/AuthProvider';
import styles from './Login.css'

export default function Login() {
    const postrLogin = usePostrLogin()
    const googleOAuth = useGoogleOAuth()
    const error = useAuthError();

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    const handleSubmit = e => {
        e.preventDefault()
        postrLogin({ email, password })
    }

    return (
        <div className={styles['login-area']} >
            <img src='/postr-logo2.png' alt='' />
            <button onClick={googleOAuth} className={styles.googleButton} > <img src="google-logo.png" alt="" />Log in with Google</button>
            <form onSubmit={handleSubmit} >
                {error && <p style={{ color: 'red' }} >{`${error}`}</p>}
                <input placeholder='email' onChange={e => setEmail(e.target.value)} />
                <input type='password' placeholder='password' onChange={e => setPassword(e.target.value)} />
                <button>submit</button>
            </form>
        </div>
    )
}

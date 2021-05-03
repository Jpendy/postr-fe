import React, { useState, useEffect } from 'react'

export default function LoginDevelopment() {

    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)


    const login = () => {
        window.location.assign('http://localhost:7890/api/v1/auth/google-login')
    }

    const logout = () => {
        fetch('http://localhost:7890/api/v1/auth/logout', { credentials: 'include' })
            .then(() => setUser(null))
    }

    useEffect(() => {
        fetch('http://localhost:7890/api/v1/auth/verify', {
            credentials: 'include'
        })
            .then(res => Promise.all([res.ok, res.json()]))
            .then(([ok, json]) => {
                if (!ok) throw json;
                return json;
            })
            .then(user => setUser(user))
            .catch(err => setError(err.message))
    }, [])

    if (user) return (
        <>{console.log(user)}
            <button onClick={logout} >Logout</button>
            <h2>welcome, {user.displayName || user.username}</h2>
            <img src={user.userImageUrl} style={{ width: '150px' }} />
        </>
    )
    return (
        <div>
            {error}
            <button onClick={login} >Login</button>
        </div>
    )
}

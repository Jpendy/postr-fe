import React from 'react'
import { Link } from 'react-router-dom'
import { useActiveUser, useAuthError, useLogout } from '../../providers/AuthProvider'
import { login } from '../../services/auth'

export default function Header() {

    const activeUser = useActiveUser()
    const logout = useLogout()
    const authError = useAuthError()

    if (activeUser) return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
                <Link to='/' >Home</Link>
                <Link to='/create-board' >Create Board</Link>
                <h3>Hello {activeUser.displayName || activeUser.username}</h3>
                <button onClick={logout} style={{ height: '40px' }} >Log Out</button>
            </div>
        </>
    )
    return (
        <div>
            {authError && <p style={{ color: 'red' }} >{authError}</p>}
            <button onClick={login} >Login</button>
        </div>
    )
}

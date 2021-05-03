import React, { useState, useEffect } from 'react'
import { useActiveUser, useLogin, useLogout } from '../../providers/AuthProvider'
import { login } from '../../services/auth'

export default function LoginDevelopment() {

    const activeUser = useActiveUser()
    const logout = useLogout()

    console.log(activeUser)
    return (
        <div>
            hello {activeUser?.username}
            <button onClick={login} >Login</button>
            <button onClick={logout} >Logout</button>
        </div>
    )
}

import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { verifyUser, fetchLogout, fetchPostrSignup, fetchPostrLogin, fetchGoogleOAuth } from '../services/auth';

const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
    const [activeUser, setActiveUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(false);
    const [authError, setAuthError] = useState(null);

    const history = useHistory()

    useEffect(() => {
        setAuthLoading(true)
        verifyUser()
            .then(user => setActiveUser(user))
            // .catch(err => setAuthError(err.message))
            .finally(() => setAuthLoading(false))
    }, [])

    const postrSignup = body => {
        setAuthLoading(true)
        fetchPostrSignup(body)
            .then(user => {
                setActiveUser(user)
                history.push('/')
            })
            .catch(err => setAuthError(err.message))
            .finally(() => setAuthLoading(false))
    }

    const postrLogin = body => {
        setAuthLoading(true)
        fetchPostrLogin(body)
            .then(user => {
                setActiveUser(user)
                history.push('/')
            })
            .catch(err => setAuthError(err.message))
            .finally(() => setAuthLoading(false))
    }

    const googleOAuth = () => {
        setAuthLoading(true)
        fetchGoogleOAuth()
            .then(user => setActiveUser(user))
            .catch(err => setAuthError(err.message))
            .finally(() => setAuthLoading(false))
    }

    const logout = () => fetchLogout().then(() => setActiveUser(null))

    return (
        <AuthContext.Provider value={{ activeUser, setActiveUser, authLoading, authError, postrSignup, postrLogin, googleOAuth, logout }} >
            {children}
        </AuthContext.Provider>
    )
}

const useAuthSelector = value => useContext(AuthContext)[value]

export const useActiveUser = () => useAuthSelector('activeUser')
export const useSetActiveUser = () => useAuthSelector('setActiveUser')
export const usePostrSignup = () => useAuthSelector('postrSignup')
export const usePostrLogin = () => useAuthSelector('postrLogin')
export const useGoogleOAuth = () => useAuthSelector('googleOAuth')
export const useLogout = () => useAuthSelector('logout')
export const useAuthError = () => useAuthSelector('authError')
export const useAuthLoading = () => useAuthSelector('authLoading')
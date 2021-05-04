import React, { useState, useEffect, useContext } from 'react';
import { verifyUser, fetchLogout } from '../services/auth';

const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
    const [activeUser, setActiveUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(false);
    const [authError, setAuthError] = useState(null);

    useEffect(() => {
        setAuthLoading(true)
        verifyUser()
            .then(user => setActiveUser(user))
            .catch(err => setAuthError(err))
            .finally(() => setAuthLoading(false))
    }, [])

    const logout = () => fetchLogout().then(() => setActiveUser(null))

    return (
        <AuthContext.Provider value={{ activeUser, authLoading, authError, logout }} >
            {children}
        </AuthContext.Provider>
    )
}

const useAuthSelector = value => useContext(AuthContext)[value]

export const useActiveUser = () => useAuthSelector('activeUser')
export const useLogout = () => useAuthSelector('logout')
export const useAuthError = () => useAuthSelector('authError')
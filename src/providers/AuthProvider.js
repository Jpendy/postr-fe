import React, { useState, useEffect, useContext } from 'react';

const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
    const [activeUser, setActiveUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(false);
    const [authError, setAuthError] = useState(null);

    useEffect(() => {

    })

    return (
        <AuthContext.Provider value={activeUser, authLoading} >
            {children}
        </AuthContext.Provider>
    )
}
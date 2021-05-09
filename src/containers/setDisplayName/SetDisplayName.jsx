import React, { useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { useActiveUser, useAuthLoading, useSetActiveUser } from '../../providers/AuthProvider'
import { fetchUpdateUserDisplayName } from '../../services/apiFetches'

export default function SetDisplayName() {
    const activeUser = useActiveUser()
    const setActiveUser = useSetActiveUser()
    const authLoading = useAuthLoading()

    if (!activeUser && !authLoading) return <Redirect to="/" />

    const [displayName, setDisplayName] = useState('')
    const [error, setError] = useState(null)

    const history = useHistory()

    const handleFormSubmit = (e) => {
        e.preventDefault()
        setError(null)

        fetchUpdateUserDisplayName({ displayName })
            .then(user => {
                setActiveUser(user)
                history.push('/')
            })
            .catch(err => setError(err.message))
    }

    return (
        <div>
            <h3>Set Display Name</h3>
            <form onSubmit={handleFormSubmit} >
                {error && <p style={{ color: 'red' }} >{error}</p>}
                <input type="text" onChange={e => setDisplayName(e.target.value)} value={displayName} />
                <button type="submit" >submit</button>
            </form>
        </div>
    )
}

import React, { useState } from 'react'
import { useActiveUser, useSetActiveUser } from '../../providers/AuthProvider'
import { fetchUpdateUserInfo } from '../../services/apiFetches'
import styles from './UpdateUser.css'

export default function UpdateUser({ handleCloseModal }) {

    const activeUser = useActiveUser()
    const setActiveUser = useSetActiveUser()

    const [displayName, setDisplayName] = useState(activeUser.displayName)
    const [aboutMe, setAboutMe] = useState(activeUser.aboutMe || '')
    const [error, setError] = useState(null)

    const handleSubmit = e => {
        e.preventDefault()

        fetchUpdateUserInfo(activeUser.id, { displayName, aboutMe })
            .then(user => {
                setActiveUser(user)
                handleCloseModal()
            })
            .catch(err => setError(err.message))
    }

    return (
        <form onSubmit={handleSubmit} className={styles.UpdateUser} >
            <input
                type="text"
                required
                value={displayName}
                placeholder="display name"
                onChange={e => setDisplayName(e.target.value)}
            />
            <textarea
                type="text"
                value={aboutMe}
                placeholder="about me"
                onChange={e => setAboutMe(e.target.value)}
            />
            {error && <p style={{ color: 'red' }} >{error}</p>}
            <button type="submit" >update</button>
        </form>
    )
}

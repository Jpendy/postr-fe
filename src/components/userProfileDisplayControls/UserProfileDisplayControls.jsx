import React from 'react'
import styles from './UserProfileDisplayControls.css'

export default function UserProfileDisplayControls({ setDisplay }) {
    return (
        <div className={styles.ProfileDisplayControls} >
            <button onClick={() => setDisplay('userInfo')} >My Profile</button>
            <button onClick={() => setDisplay('userPosts')} >My Posts</button>
        </div>
    )
}

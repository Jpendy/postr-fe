import React from 'react'
import styles from './UserInfo.css'

export default function UserInfo({ displayName, aboutMe, userImageUrl }) {
    return (
        <div className={styles.UserInfo} >
            <h2>My Profile </h2>
            <h3>Display Name: {displayName}</h3>
            <img src={userImageUrl} />
            <p>{aboutMe}</p>
        </div>
    )
}

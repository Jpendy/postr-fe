import React, { useState } from 'react'
import Modal from '../modal/Modal'
import styles from './UserInfo.css'
import UpdateUser from '../updateUser/UpdateUser'

export default function UserInfo({ displayName, aboutMe, userImageUrl }) {

    const [updateUserModalOpen, setUpdateUserModalOpen] = useState(false)

    const handleCloseModal = () => setUpdateUserModalOpen(false)
    return (
        <div className={styles.UserInfo} >

            <Modal
                open={updateUserModalOpen}
                handleCloseModal={handleCloseModal}
            >
                <UpdateUser handleCloseModal={handleCloseModal} />
            </Modal>


            <h2>My Profile </h2>
            <h3>Display Name: {displayName}</h3>
            <img src={userImageUrl} />

            <p>About Me: {aboutMe || 'There\'s nothing here!'}</p>

            <button onClick={() => setUpdateUserModalOpen(true)} >edit user info</button>
        </div>
    )
}

import React, { useState } from 'react'
import Modal from '../modal/Modal'
import styles from './UserInfo.css'
import UpdateUser from '../updateUser/UpdateUser'
import { useActiveUser } from '../../providers/AuthProvider'

export default function UserInfo({ id, displayName, aboutMe, userImageUrl }) {

    const activeUser = useActiveUser()
    const activeUserTrue = activeUser?.id === id

    const [updateUserModalOpen, setUpdateUserModalOpen] = useState(false)
    const handleCloseModal = () => setUpdateUserModalOpen(false)

    return (
        <div className={styles.UserInfo} >

            <h2>My Profile </h2>
            <h3>Display Name: {displayName}</h3>
            <img src={userImageUrl} />

            <p>About Me: {aboutMe || 'There\'s nothing here!'}</p>

            {
                activeUserTrue &&
                <>
                    <button onClick={() => setUpdateUserModalOpen(true)} >edit user info</button>
                    <Modal
                        open={updateUserModalOpen}
                        handleCloseModal={handleCloseModal}
                    >
                        <UpdateUser handleCloseModal={handleCloseModal} />
                    </Modal>
                </>
            }
        </div>
    )
}

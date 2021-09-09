import React from 'react'
import CreateBoardForm from '../../components/createBoardForm/CreateBoardForm'
import styles from './CreateBoardPage.css'

export default function CreateBoardPage() {



    return (
        <div className={styles.createBoardPage} >
            <CreateBoardForm />
        </div>
    )
}

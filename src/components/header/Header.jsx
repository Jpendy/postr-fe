import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from '../../providers/AppProvider'
import { useActiveUser, useLogout } from '../../providers/AuthProvider'
import { getReplies } from '../../selectors/selectors'
import styles from './Header.css'

export default function Header() {

    const activeUser = useActiveUser()
    const logout = useLogout()

    const replies = useSelector(getReplies)
    const newMessages = replies.some(comment => !comment.readByParent)

    if (activeUser) return (
        <div className={styles['header-body']} >
            <Link to='/' className={styles['logo-link']} ><img className={styles.logo} src="/postr-logo2.png" alt="" /></Link>

            <div className={styles['link-buttons']} >
                <Link to='/create-board' >Create Board</Link>
                <Link to='/user-profile' >My Profile</Link>
                <Link to='/user-inbox' style={{ display: 'flex', justifyContent: 'space-evenly' }} >
                    Inbox
                    {newMessages && < img style={{ width: '15px' }} src="/mail.ico" />}
                </Link>
            </div>

            <div className={styles['header-right-area']} >
                <h3>Hello {activeUser.displayName || activeUser.email}</h3>
                <button onClick={logout} style={{ height: '40px' }} >Log Out</button>
            </div>
        </div>
    )

    return (
        <div>
            <div className={styles['header-body']} >

                <Link className={styles['logo-link']} to='/' > <img className={styles.logo} src='/postr-logo2.png' alt="" /></Link>

                <div className={styles['link-buttons']} >
                    <Link to='/signup' >Sign Up</Link>
                    <Link to='/login' >Login</Link>
                    <Link to='/' >Front Page</Link>
                </div>
            </div>
        </div>
    )
}

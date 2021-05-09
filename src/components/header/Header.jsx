import React from 'react'
import { Link } from 'react-router-dom'
import { useActiveUser, useAuthError, useLogout } from '../../providers/AuthProvider'
import { login } from '../../services/auth'
import styles from './Header.css'

export default function Header() {

    const activeUser = useActiveUser()
    console.log(activeUser)
    const logout = useLogout()

    if (activeUser) return (
        <>
            <div className={styles['header-body']} >
                <Link to='/' className={styles['logo-link']} ><img className={styles.logo} src="/postr-logo2.png" alt="" /></Link>

                <div className={styles['link-buttons']} >
                    <Link to='/create-board' >Create Board</Link>
                </div>

                <div className={styles['header-right-area']} >
                    <h3>Hello {activeUser.displayName || activeUser.email.split('|')[0]}</h3>
                    <button onClick={logout} style={{ height: '40px' }} >Log Out</button>
                </div>
            </div>
        </>
    )
    return (
        <div>
            <div className={styles['header-body']} >

                <Link className={styles['logo-link']} to='/' > <img className={styles.logo} src='/postr-logo2.png' alt="" /></Link>

                <div className={styles['link-buttons']} >
                    <Link to='/signup' >Sign Up</Link>
                    <button onClick={login} >Login</button>
                    <Link to='/' >Front Page</Link>
                </div>
            </div>
        </div>
    )
}

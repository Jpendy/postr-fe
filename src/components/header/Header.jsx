import React, { useState } from 'react'
import ReactDom from 'react-dom'
import { Link } from 'react-router-dom'
import { useSelector } from '../../providers/AppProvider'
import { useActiveUser, useLogout } from '../../providers/AuthProvider'
import { getReplies } from '../../selectors/selectors'
import styles from './Header.css'

export default function Header() {

    const activeUser = useActiveUser()
    const logout = useLogout()

    const [navWidth, setNavWidth] = useState(0)
    const closeNav = () => setNavWidth(0)
    const openNav = () => setNavWidth(250)

    const replies = useSelector(getReplies)
    const newMessages = replies.some(comment => !comment.readByParent)

    if (activeUser) return (
        <>
            <div className={styles['header-top-margin']} />
            <div className={styles['header-body']} >
                <Link to='/' className={styles['logo-link']} ><img className={styles.logo} src="/postr-logo2.png" alt="" /></Link>

                <div className={styles['link-buttons']} >

                    {ReactDom.createPortal(
                        <div className={styles.sidebar} style={{ width: navWidth }}>
                            <a className={styles.closebtn} onClick={closeNav}>&times;</a>
                            <Link to='/' onClick={closeNav}>Mother Board</Link>
                            {/* <Link to='/user-profile' onClick={closeNav} >My Profile</Link> */}
                            <Link to='/create-board' onClick={closeNav} >Create Board</Link>
                            {/* <Link to='/user-inbox' onClick={closeNav} style={{ display: 'flex', justifyContent: 'space-between' }} >
                                Inbox
                                {newMessages && < img style={{ width: '15px' }} src="/mail.ico" />}
                            </Link> */}
                            <div className={styles.logout} onClick={logout} style={{ height: '40px' }} >Log Out</div>
                        </div>, document.getElementById('portal')
                    )}
                </div>

                <h3>Hello {activeUser.displayName || activeUser.email}</h3>
                <div className={styles['header-right-area']} >
                    <button className={styles.openbtn} style={{ width: '20px', padding: '0px' }} onClick={openNav}>&#9776;</button>
                </div>
            </div>
        </>
    )

    return (
        <div>
            <div className={styles['header-top-margin']} />
            <div className={styles['header-body']} >

                <Link className={styles['logo-link']} to='/' > <img className={styles.logo} src='/postr-logo2.png' alt="" /></Link>

                <div className={styles['link-buttons']} >
                    <Link to='/signup' >Sign Up</Link>
                    <Link to='/login' >Login</Link>
                    {/* <Link to='/' >Front Page</Link> */}
                </div>
            </div>
        </div>
    )
}

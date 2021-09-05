import React, { useState } from 'react'
import UserInfo from '../../components/userInfo/UserInfo'
import UserProfileDisplayControls from '../../components/userProfileDisplayControls/UserProfileDisplayControls'
import UserProfileUserPosts from '../../components/userProfileUserPosts/UserProfileUserPosts'
import { useActiveUser } from '../../providers/AuthProvider'

export default function UserProfile() {

    const activeUser = useActiveUser()
    const [display, setDisplay] = useState('userInfo')

    return (
        <div>
            <UserProfileDisplayControls setDisplay={setDisplay} />
            {display === 'userInfo' && <UserInfo {...activeUser} />}
            {display === 'userPosts' && <UserProfileUserPosts />}
        </div>
    )
}

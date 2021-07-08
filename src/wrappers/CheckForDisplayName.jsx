import React from 'react'
import { Redirect } from 'react-router-dom'
import { useActiveUser } from '../providers/AuthProvider'

export default function CheckForDisplayName() {

    const activeUser = useActiveUser()

    if (activeUser && !activeUser?.displayName) return <Redirect to="/display-name" />
    return <></>
}

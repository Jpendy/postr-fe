import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useActiveUser, useAuthLoading } from '../../providers/AuthProvider'

export default function PrivateRoute({ ...props }) {

    const activeUser = useActiveUser()
    const authLoading = useAuthLoading()

    if (!activeUser && !authLoading) return <Redirect to="/" />

    return <Route {...props} />
}

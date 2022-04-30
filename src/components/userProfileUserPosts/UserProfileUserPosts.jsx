import React from 'react'
import { useActiveUser } from '../../providers/AuthProvider'
import PostList from '../../components/postList/PostList'
import useUserPosts from '../../hooks/useUserPosts'
import LoadingSpinner from '../loadingSpinner/LoadingSpinner'

export default function UserProfileUserPosts() {

    const activeUser = useActiveUser()

    const { posts, loading, error } = useUserPosts(activeUser.id)

    if (loading) return <LoadingSpinner />
    return (
        <div style={{ textAlign: 'center' }} >
            {error && <p style={{ color: 'red' }} >{error}</p>}
            <h2>My Posts </h2>
            <PostList posts={posts} />
        </div>
    )
}

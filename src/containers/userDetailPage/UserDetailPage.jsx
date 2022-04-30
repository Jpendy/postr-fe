import React from 'react'
import PostList from '../../components/postList/PostList'
import useUserPosts from '../../hooks/useUserPosts'
import UserInfo from '../../components/userInfo/UserInfo'
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner'

export default function UserDetailPage({ match }) {

    const { user, posts, loading, error } = useUserPosts(match.params.id)

    if (loading) return <LoadingSpinner />
    return (
        <div style={{ textAlign: "center", paddingBottom: "200px" }} >
            <h2>Posts by {user.displayName || user.email}</h2>
            {error && <p style={{ color: 'red' }} >{error}</p>}
            {/* <UserInfo {...user} /> */}
            <PostList posts={posts} />
        </div>
    )
}

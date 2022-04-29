import React from 'react'
import PostList from '../../components/postList/PostList'
import useUserPosts from '../../hooks/useUserPosts'
import UserInfo from '../../components/userInfo/UserInfo'

export default function UserDetailPage({ match }) {

    const { user, posts, loading, error } = useUserPosts(match.params.id)
    console.log(user)
    if (loading) return <h3>Loading...</h3>
    return (
        <div style={{ textAlign: "center", paddingBottom: "200px" }} >
            <h2>Posts by {user.displayName || user.email}</h2>
            {error && <p style={{ color: 'red' }} >{error}</p>}
            {/* <UserInfo {...user} /> */}
            <PostList posts={posts} />
        </div>
    )
}

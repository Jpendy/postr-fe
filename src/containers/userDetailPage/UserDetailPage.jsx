import React from 'react'
import PostList from '../../components/postList/PostList'
import useUserPosts from '../../hooks/useUserPosts'

export default function UserDetailPage({ match }) {

    const { posts, loading, error } = useUserPosts(match.params.id)

    if (loading) return <h3>Loading...</h3>
    return (
        <div>
            {error && <p style={{ color: 'red' }} >{error}</p>}
            <PostList posts={posts} />
        </div>
    )
}

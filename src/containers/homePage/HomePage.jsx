import React from 'react'
import { Redirect } from 'react-router-dom'
import PostList from '../../components/postList/PostList'
import CreatePost from '../../components/createPost/CreatePost'
import { useActiveUser } from '../../providers/AuthProvider'
import usePosts from '../../hooks/usePosts'
import Sort from '../../components/sort/Sort'

export default function HomePage() {

    const activeUser = useActiveUser()

    // if (activeUser && !activeUser?.displayName) return <Redirect to="/display-name" />

    const { posts, loading } = usePosts()

    if (loading) return <h2>Loading...</h2>
    return (
        <div>
            {activeUser && <CreatePost />}
            <Sort />
            <PostList frontPage={true} posts={posts} />
        </div>
    )
}

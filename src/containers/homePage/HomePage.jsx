import React, { useEffect } from 'react'
import PostList from '../../components/postList/PostList'
import CreatePost from '../../components/createPost/CreatePost'
import { useActiveUser } from '../../providers/AuthProvider'
import usePosts from '../../hooks/usePosts'
import Sort from '../../components/sort/Sort'

export default function HomePage() {


    const activeUser = useActiveUser()

    const { posts, loading } = usePosts()
    if (loading) return <h2>Loading...</h2>
    return (
        <div  >
            {activeUser && <CreatePost />}
            <Sort />
            <PostList frontPage={true} posts={posts} />
        </div>
    )
}

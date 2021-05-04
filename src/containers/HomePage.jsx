import React, { useEffect } from 'react'
import PostList from '../components/postList/PostList'
import CreatePost from '../components/createPost/CreatePost'
import { useActiveUser } from '../providers/AuthProvider'

export default function HomePage() {

    const activeUser = useActiveUser()

    return (
        <>
            {activeUser && <CreatePost />}
            <PostList />
        </>
    )
}

import React from 'react'
import Post from '../post/Post'
import usePosts from '../../hooks/usePosts'
import { v4 as uuidv4 } from 'uuid'

export default function PostList() {

    const { posts, loading } = usePosts()

    console.log(posts)
    if (loading) return <h2>Loading...</h2>
    return (
        <ul>
            {posts.map(post => <li key={uuidv4()}><Post {...post} /></li>)}
        </ul>
    )
}

import React from 'react'
import Post from '../post/Post'
import usePosts from '../../hooks/usePosts'
import { v4 as uuidv4 } from 'uuid'

export default function PostList() {

    const { posts, loading } = usePosts()

    // console.log(postVoteHistory)
    if (loading) return <h2>Loading...</h2>
    return (
        <ul>
            {posts.map((post, i) => <li key={i}><Post {...post} /></li>)}
        </ul>
    )
}

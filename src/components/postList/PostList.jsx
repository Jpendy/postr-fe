import React from 'react'
import Post from '../post/Post'
import usePosts from '../../hooks/usePosts'
import { v4 as uuidv4 } from 'uuid'
import styles from './PostList.css'

export default function PostList({ posts }) {

    return (
        <ul className={styles.postList}>
            {posts.map(post => <li key={post.id}><Post {...post} /></li>)}
        </ul>
    )
}

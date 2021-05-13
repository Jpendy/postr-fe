import React, { useState } from 'react'
import Post from '../post/Post'
import usePosts from '../../hooks/usePosts'
import { v4 as uuidv4 } from 'uuid'
import styles from './PostList.css'

export default function PostList({ posts }) {

    const [closedPosts, setClosedPosts] = useState([])
    const [allPostsClosed, setAllPostsClosed] = useState(false)

    const handleOpenDetails = (id) => {
        closedPosts.includes(id) ?
            setClosedPosts(closedPosts.filter(item => item !== id))
            : setClosedPosts([...closedPosts, id])
    }

    const handleCloseAllPosts = () => {
        const PostIdArr = posts.map(({ id }) => id)

        allPostsClosed ? setClosedPosts([]) : setClosedPosts(PostIdArr)
        setAllPostsClosed(allPostsClosed ? false : true)
    }

    return (
        <>
            <button onClick={handleCloseAllPosts} >{allPostsClosed ? 'open all' : 'close all'}</button>
            <ul className={styles.postList}>
                {posts.map(post => (
                    <li key={post.id}>
                        <Post
                            handleOpenDetails={handleOpenDetails}
                            closedPosts={closedPosts}
                            allPostsClosed={allPostsClosed}
                            {...post}
                        />
                    </li>
                ))}
            </ul>
        </>
    )
}

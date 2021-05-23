import React, { useState } from 'react'
import Post from '../post/Post'
import usePosts from '../../hooks/usePosts'
import { v4 as uuidv4 } from 'uuid'
import styles from './PostList.css'

export default function PostList({ bgColor, postColor, fontColor, linkColor, posts }) {

    const [closedPosts, setClosedPosts] = useState(posts.map(post => post.id))
    const [allPostsClosed, setAllPostsClosed] = useState(true)

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
        <div style={{ backgroundColor: bgColor }}>
            <button className={styles.closePostsButton} onClick={handleCloseAllPosts} >{allPostsClosed ? 'open all' : 'close all'}</button>

            <ul className={styles.postList}>
                {posts.map(post => (
                    <li key={post.id}>
                        <Post
                            {...post}
                            postColor={postColor}
                            fontColor={fontColor}
                            linkColor={linkColor}
                            handleOpenDetails={handleOpenDetails}
                            closedPosts={closedPosts}
                            allPostsClosed={allPostsClosed}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}

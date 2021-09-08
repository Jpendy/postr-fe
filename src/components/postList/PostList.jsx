import React, { useState } from 'react'
import Post from '../post/Post'
import usePosts from '../../hooks/usePosts'
import styles from './PostList.css'

export default function PostList({ bgColor, postColor, fontColor, linkColor, posts, page, PageButtons, upDateVoteFn }) {

    const [closedPosts, setClosedPosts] = useState(posts.map(post => post.id))
    const [allPostsClosed, setAllPostsClosed] = useState(true)
    const [postOpen, setPostOpen] = useState(false)

    const handleOpenDetails = (id) => {
        closedPosts.includes(id) ?
            setClosedPosts(closedPosts.filter(item => item !== id))
            : setClosedPosts([...closedPosts, id])
    }

    const handleCloseAllPosts = () => {
        const PostIdArr = posts?.map(({ id }) => id)

        allPostsClosed ? setClosedPosts([]) : setClosedPosts(PostIdArr)
        setAllPostsClosed(allPostsClosed ? false : true)
    }

    return (
        <div className={styles.postsContainer} style={{ backgroundColor: bgColor }}>
            {/* <button className={styles.closePostsButton} onClick={handleCloseAllPosts} >{allPostsClosed ? 'show all' : 'hide all'}</button> */}

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
                            upDateVoteFn={upDateVoteFn}
                        />
                    </li>
                ))}
            </ul>
            {PageButtons && <PageButtons />}
        </div>
    )
}

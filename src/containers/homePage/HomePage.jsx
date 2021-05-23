import React from 'react'
import PostList from '../../components/postList/PostList'
import usePosts from '../../hooks/usePosts'
import Sort from '../../components/sort/Sort'
import BoardSearch from '../../components/boardSearch/BoardSearch'
import styles from './HomePage.css'

export default function HomePage() {

    const { posts, loading } = usePosts()

    if (loading) return <h2>Loading...</h2>
    return (
        <div className={styles.homePage} >
            <div className={styles.listArea} >
                <Sort />
                <PostList frontPage={true} posts={posts} />
            </div>
            <div className={styles.boardSearch} >
                <BoardSearch />
            </div>
        </div>
    )
}

{/* {activeUser && <CreatePost />} */ }
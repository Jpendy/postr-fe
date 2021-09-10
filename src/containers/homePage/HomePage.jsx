import React, { useEffect } from 'react'
import PostList from '../../components/postList/PostList'
import usePosts from '../../hooks/usePosts'
import Sort from '../../components/sort/Sort'
import BoardSearch from '../../components/boardSearch/BoardSearch'
import styles from './HomePage.css'
import usePagination from '../../hooks/usePagination'
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner'

export default function HomePage() {


    const { posts, loading, error, page, PageButtons } = usePosts()

    if (loading) return <LoadingSpinner />
    return (
        <div className={styles.homePage} >
            <div className={styles.listArea} >
                <Sort />
                {error && <h4 style={{ color: 'red' }} >{error}</h4>}
                {!error && <PostList
                    frontPage={true}
                    count={posts.count}
                    posts={posts.postArray}
                    page={page}
                    PageButtons={PageButtons}
                />}
            </div>
            <div className={styles.boardSearch} >
                <BoardSearch />
            </div>
        </div>
    )
}

{/* {activeUser && <CreatePost />} */ }
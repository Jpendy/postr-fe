import React, { useEffect, useState } from 'react'
import PostList from '../../components/postList/PostList'
import usePosts from '../../hooks/usePosts'
import Sort from '../../components/sort/Sort'
import BoardSearch from '../../components/boardSearch/BoardSearch'
import styles from './HomePage.css'
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner'

export default function HomePage() {


    const { posts, loading, error, page, PageButtons } = usePosts()

    // const [boardSearchHeight, setBoardSearchHeight] = useState(0)

    // const toggleBoardSearch = () => {
    //     setBoardSearchHeight(curr => curr === 0 ? 200 : 0)
    // }

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
            {/* <button className={styles.toggleSearchButton} onClick={toggleBoardSearch} >search boards</button> */}
            <div className={styles.boardSearch}
            // style={{ height: boardSearchHeight }} 
            >
                <BoardSearch />
            </div>
        </div>
    )
}

{/* {activeUser && <CreatePost />} */ }
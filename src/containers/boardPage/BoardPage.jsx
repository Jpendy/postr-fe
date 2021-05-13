import React, { useEffect, useState } from 'react'
import { setPosts, setSingleBoard } from '../../actions/reducerActions'
import { useDispatch, useSelector } from '../../providers/AppProvider'
import { getSingleBoard } from '../../selectors/selectors'
import { fetchBoardByName } from '../../services/apiFetches'
import PostList from '../../components/postList/PostList'
import usePosts from '../../hooks/usePosts'

export default function BoardPage({ match }) {

    const dispatch = useDispatch()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const board = useSelector(getSingleBoard)
    const { posts } = usePosts()
    console.log(board)
    useEffect(() => {
        setError(null)
        fetchBoardByName(match.params.name)
            .then(board => {
                dispatch(setSingleBoard(board))
                dispatch(setPosts(board.posts))
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <h3>Loading...</h3>
    return (
        <div>
            {error && <p style={{ color: 'red' }} >{error}</p>}
            {board?.bannerImageUrl && <img style={{ width: '100%', height: '250px' }} src={board?.bannerImageUrl} alt="banner image" />}
            <h2>{board?.name}</h2>
            {posts && <PostList posts={board?.posts} />}
        </div>
    )
}

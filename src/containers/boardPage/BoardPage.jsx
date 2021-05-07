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

    const { name, bannerImageUrl } = useSelector(getSingleBoard)
    const { posts } = usePosts()

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
            {bannerImageUrl && <img style={{ width: '100%', height: '250px' }} src={bannerImageUrl} alt="banner image" />}
            <h2>{name}</h2>
            {posts && <PostList posts={posts} />}
        </div>
    )
}

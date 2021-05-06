import React, { useEffect, useState } from 'react'
import { setPosts } from '../../actions/reducerActions'
import { useDispatch, useSelector } from '../../providers/AppProvider'
import { fetchUserAndUserPosts } from '../../services/apiFetches'
import PostList from '../../components/postList/PostList'
import { getPosts } from '../../selectors/selectors'

export default function UserDetailPage({ match }) {

    const dispatch = useDispatch()
    const [user, setUser] = useState()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const posts = useSelector(getPosts)

    useEffect(() => {
        fetchUserAndUserPosts(match.params.id)
            .then(user => {
                console.log(user)
                dispatch(setPosts(user.posts))
                setUser(user)
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <h3>Loading...</h3>
    return (
        <div>
            {error && <p style={{ color: 'red' }} >{error}</p>}
            <PostList posts={posts} />
        </div>
    )
}

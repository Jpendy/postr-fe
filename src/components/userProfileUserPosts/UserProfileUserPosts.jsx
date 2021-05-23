import React, { useEffect, useState } from 'react'
import { setPosts } from '../../actions/reducerActions'
import { useDispatch, useSelector } from '../../providers/AppProvider'
import { useActiveUser } from '../../providers/AuthProvider'
import { getPosts } from '../../selectors/selectors'
import { fetchUserAndUserPosts } from '../../services/apiFetches'
import PostList from '../../components/postList/PostList'

export default function UserProfileUserPosts() {
    const dispatch = useDispatch()
    const activeUser = useActiveUser()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const posts = useSelector(getPosts)

    useEffect(() => {
        fetchUserAndUserPosts(activeUser.id)
            .then(user => dispatch(setPosts(user.posts)))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <h3>Loading...</h3>
    return (
        <div style={{ textAlign: 'center' }} >
            {error && <p style={{ color: 'red' }} >{error}</p>}
            <h2>My Posts </h2>
            <PostList posts={posts} />
        </div>
    )
}

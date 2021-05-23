import { useEffect, useState } from 'react'
import { setPosts } from '../actions/reducerActions'
import { useDispatch, useSelector } from '../providers/AppProvider'
import { getPosts } from '../selectors/selectors'
import { fetchUserAndUserPosts } from '../services/apiFetches'

export default function useUserPosts(id) {
    const dispatch = useDispatch()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const posts = useSelector(getPosts)

    useEffect(() => {
        fetchUserAndUserPosts(id)
            .then(user => dispatch(setPosts(user.posts)))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [])

    return {
        posts,
        loading,
        error
    }
}

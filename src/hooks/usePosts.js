import { useState, useEffect } from 'react'
import { setPosts } from '../actions/reducerActions'
import { useDispatch, useSelector } from '../providers/AppProvider'
import { getPosts } from '../selectors/selectors'
import { fetchAllPosts } from '../services/apiFetches'
import usePagination from './usePagination'

export default function usePosts() {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const dispatch = useDispatch()
    const posts = useSelector(getPosts)

    const { page, PageButtons } = usePagination(posts.count)

    useEffect(() => {
        setLoading(true)
        fetchAllPosts({ page })
            .then(posts => dispatch(setPosts(posts)))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [page])

    return {
        posts,
        loading,
        error,
        page,
        PageButtons
    }
}

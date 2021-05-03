import { useState, useEffect } from 'react'
import { setPosts } from '../actions/reducerActions'
import { useDispatch, useSelector } from '../providers/AppProvider'
import { getPosts } from '../selectors/selectors'
import { fetchAllPosts } from '../services/apiFetches'

export default function usePosts() {

    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()
    const posts = useSelector(getPosts)

    useEffect(() => {
        setLoading(true)
        fetchAllPosts()
            .then(posts => dispatch(setPosts(posts)))
            .finally(() => setLoading(false))
    }, [])

    return {
        posts,
        loading
    }
}

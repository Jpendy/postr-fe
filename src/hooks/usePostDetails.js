import React, { useEffect, useState } from 'react'
import { setPostDetails } from '../actions/reducerActions'
import { useDispatch, useSelector } from '../providers/AppProvider'
import { getPostDetails } from '../selectors/selectors'
import { fetchPostDetails } from '../services/apiFetches'

export default function usePostDetails(id) {

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    const postDetails = useSelector(getPostDetails)

    useEffect(() => {
        setLoading(true)
        fetchPostDetails(id)
            .then(post => dispatch(setPostDetails(post)))
            .finally(() => setLoading(false))
    }, [])

    return {
        postDetails,
        loading
    }
}

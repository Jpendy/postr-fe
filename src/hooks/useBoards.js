import React, { useState, useEffect } from 'react'
import { setBoards } from '../actions/reducerActions';
import { useDispatch, useSelector } from '../providers/AppProvider'
import { getBoards } from '../selectors/selectors';
import { fetchAllBoards } from '../services/apiFetches'

export default function useBoards() {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)
    const boards = useSelector(getBoards)

    useEffect(() => {
        setLoading(true)
        fetchAllBoards()
            .then(boards => dispatch(setBoards(boards)))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [])

    return {
        boards,
        loading,
        error
    }
}

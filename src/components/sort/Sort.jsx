import React from 'react'
import { setPosts } from '../../actions/reducerActions'
import { useDispatch } from '../../providers/AppProvider'
import { fetchAllPosts } from '../../services/apiFetches'
import styles from './Sort.css'

export default function Sort() {

    const dispatch = useDispatch()

    const handleSortClick = ({ target }) => {
        fetchAllPosts(target.value)
            .then(posts => dispatch(setPosts(posts)))
    }

    return (
        <div className={styles.sortArea} >
            <button value='top' onClick={handleSortClick} >Top</button>
            <button value='new' onClick={handleSortClick} >New</button>
        </div>
    )
}

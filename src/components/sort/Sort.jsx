import React from 'react'
import { useHistory } from 'react-router-dom'
import { setPosts } from '../../actions/reducerActions'
import { useDispatch } from '../../providers/AppProvider'
import { fetchAllPosts } from '../../services/apiFetches'
import styles from './Sort.css'

export default function Sort() {

    const history = useHistory()
    const dispatch = useDispatch()

    const handleSortClick = ({ target }) => {
        history.push('?page=1')
        fetchAllPosts({ sort: target.value, page: 1 })
            .then(posts => dispatch(setPosts(posts)))
    }

    return (
        <div className={styles.sortArea} >
            <button value='top' onClick={handleSortClick} >Top</button>
            <button value='new' onClick={handleSortClick} >New</button>
        </div>
    )
}

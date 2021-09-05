import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from '../../providers/AppProvider'
import { setReplies } from '../../actions/reducerActions'
import { getReplies } from '../../selectors/selectors'
import Comment from '../comment/Comment'
import { fetchAllReplies } from '../../services/apiFetches'

export default function UserInbox() {
    const dispatch = useDispatch();
    const replies = useSelector(getReplies)

    useEffect(() => {
        fetchAllReplies()
            .then(replies => dispatch(setReplies(replies)))
    }, [])

    const repliesList = replies.map(comment => (
        <li key={comment.id} >
            <Comment {...comment} unread={!comment.readByParent} />
            <Link to={`/post-detail/${comment.postId}/${comment.id}`} >
                <button>Go To Comment</button>
            </Link>
        </li>
    ))

    return (
        <div>
            <ul style={{ width: '50%', listStyle: 'none' }}>
                {repliesList}
            </ul>
        </div>
    )
}

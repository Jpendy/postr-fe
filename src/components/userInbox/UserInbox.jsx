import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from '../../providers/AppProvider'
import { getReplies } from '../../selectors/selectors'
import Comment from '../comment/Comment'

export default function UserInbox() {

    const replies = useSelector(getReplies)

    const repliesList = replies.map(comment => (
        <li key={comment.id} >
            <Comment {...comment} />
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

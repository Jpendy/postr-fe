import React, { useState } from 'react'
import { setPostDetails } from '../../actions/reducerActions'
import { useDispatch, useSelector } from '../../providers/AppProvider'
import { useActiveUser } from '../../providers/AuthProvider'
import { getPostDetails } from '../../selectors/selectors'
import { fetchDeleteComment, fetchPostDetails } from '../../services/apiFetches'
import CommentList from '../commentList/CommentList'
import CreateComment from '../createComment/CreateComment'

export default function Comment({
    id,
    body,
    voteScore,
    dateCreated,
    dateModifed,
    replies,
    userId,
}) {

    const [error, setError] = useState(null)
    const dispatch = useDispatch()
    const activeUser = useActiveUser()
    const postDetails = useSelector(getPostDetails)

    const handleDeleteComment = () => {
        setError(null)

        const confirm = window.confirm('Are you sure you want to delete this comment?')
        if (confirm) {
            fetchDeleteComment(id)
                .then(() => fetchPostDetails(postDetails.id))
                .then(post => dispatch(setPostDetails(post)))
                .catch(err => setError(err.message))
        }
    }

    const replyMessage = replies?.length > 1 ? 'replies' : 'reply'
    return (
        <>
            <p>{body}</p>
            <p>Score: {voteScore}</p>
            <p>Created on: {dateCreated}</p>
            {dateModifed && <p>Modified on: {dateModifed}</p>}
            <p>Created by: {userId}</p>
            {error && <p style={{ color: 'red' }} >Error: {error}</p>}
            {+activeUser?.id === userId && <button onClick={handleDeleteComment} >delete comment</button>}
            {activeUser && <CreateComment post={postDetails} parentCommentId={id} replyBoolDefault={false} />}

            {replies && <details>
                <summary>{`${replies.length} ${replyMessage}`}</summary>
                <CommentList comments={replies} />
            </details>}
        </>
    )
}

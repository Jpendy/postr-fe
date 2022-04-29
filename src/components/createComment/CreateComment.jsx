import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { createCommentReply, createPostComment, setPostDetails } from '../../actions/reducerActions'
import { useDispatch } from '../../providers/AppProvider'
import { useActiveUser } from '../../providers/AuthProvider'
import { fetchCreateComment, fetchPostDetails } from '../../services/apiFetches'
import styles from './CreateComment.css'

const styleObj = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
}

export default function CreateComment({ post, postDetails, parentCommentId, parentUserId, replyBoolDefault }) {
    const dispatch = useDispatch()

    const { commentId } = useParams()

    const [body, setBody] = useState('')
    const [error, setError] = useState(null)
    const [replyBool, setReplyBool] = useState(parentCommentId === +commentId || replyBoolDefault)

    const handleCommentSubmit = e => {
        e.preventDefault()
        if (!body.trim()) return

        fetchCreateComment({ body, parentUserId, postId: postDetails?.id || post.id, parentCommentId })
            .then(newComment => {
                if (!newComment.parentCommentId) dispatch(createPostComment(newComment))
                else dispatch(createCommentReply(newComment))
                setBody('')
            })
            .catch(err => setError(err.message))
    }

    const replyBoolFn = () => setReplyBool(replyBool ? false : true)

    if (!replyBool) return <button onClick={replyBoolFn} >reply</button>

    return (
        <div className={styles.createComment} >
            {!replyBoolDefault && <button onClick={replyBoolFn}>close reply</button>}

            <form style={styleObj} onSubmit={handleCommentSubmit} >
                {error && <h3 style={{ color: 'red' }} >{error.message}</h3>}
                <textarea autoFocus={parentCommentId === +commentId} value={body} onChange={e => setBody(e.target.value)} />
                <button disabled={!body.trim()}>Submit Comment</button>
            </form>
        </div>
    )
}

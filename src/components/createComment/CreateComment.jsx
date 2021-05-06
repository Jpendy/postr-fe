import React, { useState } from 'react'
import { createPostComment, setPostDetails } from '../../actions/reducerActions'
import { useDispatch } from '../../providers/AppProvider'
import { fetchCreateComment, fetchPostDetails } from '../../services/apiFetches'

const styleObj = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
}

export default function CreateComment({ post, postDetails, parentCommentId, replyBoolDefault }) {
    const dispatch = useDispatch()

    const [body, setBody] = useState('')
    const [error, setError] = useState(null)
    const [replyBool, setReplyBool] = useState(replyBoolDefault)

    const handleCommentSubmit = e => {
        e.preventDefault()
        if (!body.trim()) return

        fetchCreateComment({ body, postId: postDetails?.id, parentCommentId })
            .then(newComment => {
                if (!newComment.parentCommentId) dispatch(createPostComment(newComment))
                else fetchPostDetails(post.id).then(post => dispatch(setPostDetails(post)))
                setBody('')
            })
            .catch(err => setError(err.message))
    }

    const replyBoolFn = () => setReplyBool(replyBool ? false : true)

    if (!replyBool) return <button onClick={replyBoolFn} >Reply to comment</button>
    return (
        <div>
            {!replyBoolDefault && <button onClick={replyBoolFn}>close reply</button>}

            <form style={styleObj} onSubmit={handleCommentSubmit} >
                {error && <h3 style={{ color: 'red' }} >{error.message}</h3>}
                <textarea value={body} onChange={e => setBody(e.target.value)} />
                <button disabled={!body.trim()}>Submit Comment</button>
            </form>
        </div>
    )
}

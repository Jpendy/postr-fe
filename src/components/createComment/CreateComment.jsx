import React, { useState } from 'react'
import { createPostComment, setPostDetails } from '../../actions/reducerActions'
import { useDispatch, useSelector } from '../../providers/AppProvider'
import { getPosts } from '../../selectors/selectors'
import { fetchCreateComment, fetchPostDetails } from '../../services/apiFetches'

const styleObj = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
}

export default function CreateComment({ post, postDetails, parentCommentId, replyBoolDefault }) {

    const [body, setBody] = useState('')
    const [error, setError] = useState(null)
    const [replyBool, setReplyBool] = useState(replyBoolDefault)

    const dispatch = useDispatch()
    const posts = useSelector(getPosts)

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

        alert('Comment Submitted!')
    }

    if (!replyBool) return <button onClick={() => setReplyBool(replyBool ? false : true)} >Reply to comment</button>
    return (
        <div>
            <button onClick={() => setReplyBool(replyBool ? false : true)}>close reply</button>
            <form style={styleObj} onSubmit={handleCommentSubmit} >
                {error && <h3 style={{ color: 'red' }} >{error.message}</h3>}
                <textarea value={body} onChange={e => setBody(e.target.value)} />
                <button disabled={!body.trim()}>Submit Comment</button>
            </form>
        </div>
    )
}

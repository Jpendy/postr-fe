import React, { useState } from 'react'
import { setPostDetails, setPosts } from '../../actions/reducerActions'
import { useDispatch, useSelector } from '../../providers/AppProvider'
import { getPosts } from '../../selectors/selectors'
import { fetchCreateComment } from '../../services/apiFetches'

const styleObj = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
}

export default function CreateComment({ postDetails, parentCommentId }) {

    const [body, setBody] = useState('')
    const [error, setError] = useState(null)

    const dispatch = useDispatch()
    const posts = useSelector(getPosts)

    const handleCommentSubmit = e => {
        e.preventDefault()

        if (!body.trim()) return

        fetchCreateComment({ body, postId: postDetails.id, parentCommentId: null })
            .then(newComment => {
                dispatch(setPostDetails({
                    ...postDetails,
                    comments: [newComment, ...postDetails.comments]
                }))
                setBody('')
            })
            .catch(err => setError(err.message))

        alert('Comment Submitted!')
    }

    return (
        <div>
            <form style={styleObj} onSubmit={handleCommentSubmit} >
                {error && <h3 style={{ color: 'red' }} >{error.message}</h3>}
                <textarea value={body} onChange={e => setBody(e.target.value)} />
                <button disabled={!body.trim()}>Submit Comment</button>
            </form>
        </div>
    )
}

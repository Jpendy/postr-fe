import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { createNewCommentVoteHistory, setPostDetails, updateUserCommentVoteHistory } from '../../actions/reducerActions'
import { useDispatch, useSelector } from '../../providers/AppProvider'
import { useActiveUser } from '../../providers/AuthProvider'
import { getPostDetails, getUserCommentVoteHistory } from '../../selectors/selectors'
import { fetchDeleteComment, fetchPostDetails, fetchVoteOnComment } from '../../services/apiFetches'
import CommentList from '../commentList/CommentList'
import CreateComment from '../createComment/CreateComment'

export default function Comment({
    id,
    body,
    voteScore,
    dateCreated,
    dateModifed,
    createdBy,
    replies,
    userId,
    depthCounter
}) {

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const activeUser = useActiveUser()
    const postDetails = useSelector(getPostDetails)
    const commentVoteHistory = useSelector(getUserCommentVoteHistory)

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

    const currentVote = commentVoteHistory.find(voteHistory => +voteHistory.commentId === +id)?.vote

    const upvote = () => {
        setLoading(true)
        const body = {
            voteHistory: currentVote,
            vote: 1
        }
        fetchVoteOnComment(id, body)
            .then(({ voteHistory }) => {
                if (currentVote === undefined) dispatch(createNewCommentVoteHistory(voteHistory))
                else dispatch(updateUserCommentVoteHistory(voteHistory))

                // if (!parentCommentId) fetchPostDetails(postDetails.id).then(post => dispatch(setPostDetails(post)))
            })
            .then(() => fetchPostDetails(postDetails.id))
            .then(post => {
                dispatch(setPostDetails(post))
                setLoading(false)
            })
    }

    const downvote = () => {
        setLoading(true)
        const body = {
            voteHistory: currentVote,
            vote: -1
        }
        fetchVoteOnComment(id, body)
            .then(({ voteHistory }) => {
                if (currentVote === undefined) dispatch(createNewCommentVoteHistory(voteHistory))
                else dispatch(updateUserCommentVoteHistory(voteHistory))
            })
            .then(() => fetchPostDetails(postDetails.id))
            .then(post => {
                dispatch(setPostDetails(post))
                setLoading(false)
            })
    }

    const replyMessage = replies?.length > 1 ? 'replies' : 'reply'
    return (
        <>
            <p>{body}</p>

            <div style={{ display: 'flex', alignItems: 'center' }}>
                {activeUser && <button onClick={upvote} disabled={loading} style={{ height: '25px', marginRight: '5px', color: currentVote === 1 && 'green' }} >upvote</button>}
                <p>Score: {voteScore}</p>
                {activeUser && <button onClick={downvote} disabled={loading} style={{ height: '25px', marginLeft: '5px', color: currentVote === -1 && 'red' }}>downvote</button>}
            </div>

            <p>Created on: {dateCreated}</p>
            {dateModifed && <p>Modified on: {dateModifed}</p>}
            <p>Comment by: <Link to={`/user-page/${userId}`} >{createdBy}</Link></p>
            {error && <p style={{ color: 'red' }} >Error: {error}</p>}
            {+activeUser?.id === userId && <button onClick={handleDeleteComment} >delete comment</button>}
            {activeUser && <CreateComment post={postDetails} parentCommentId={id} replyBoolDefault={false} />}

            {replies && <details open={depthCounter % 3 !== 0}>
                <summary >{`${replies.length} ${replyMessage}`}</summary>
                <CommentList depthCounter={depthCounter} comments={replies} />
            </details>}
        </>
    )
}

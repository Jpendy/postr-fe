import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { createNewCommentVoteHistory, deleteComment, setPostDetails, updateCommentVote, updateUserCommentVoteHistory } from '../../actions/reducerActions'
import { useDispatch, useSelector } from '../../providers/AppProvider'
import { useActiveUser } from '../../providers/AuthProvider'
import { getPostDetails, getUserCommentVoteHistory } from '../../selectors/selectors'
import { fetchDeleteComment, fetchPostDetails, fetchVoteOnComment } from '../../services/apiFetches'
import CommentList from '../commentList/CommentList'
import CreateComment from '../createComment/CreateComment'
import styles from './Comment.css'

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

    const { commentId } = useParams()

    const handleDeleteComment = () => {
        setError(null)

        const confirm = window.confirm('Are you sure you want to delete this comment?')
        if (confirm) {
            fetchDeleteComment(id)
                .then(() => dispatch(deleteComment(id)))
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
            .then(({ comment, voteHistory }) => {
                if (currentVote === undefined) dispatch(createNewCommentVoteHistory(voteHistory))
                else dispatch(updateUserCommentVoteHistory(voteHistory))


                dispatch(updateCommentVote({ id, score: comment.voteScore }))
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
            .then(({ comment, voteHistory }) => {
                if (currentVote === undefined) dispatch(createNewCommentVoteHistory(voteHistory))
                else dispatch(updateUserCommentVoteHistory(voteHistory))

                dispatch(updateCommentVote({ id, score: comment.voteScore }))
                setLoading(false)
            })
    }

    const date = new Date(+dateCreated).toString()
    const dateMod = new Date(+dateModifed).toString()

    const replyMessage = replies?.length === 1 ? 'reply' : 'replies'

    return (
        <div className={styles.commentArea} >
            <p><Link to={`/user-page/${userId}`} >{createdBy}</Link> - {date.slice(0, 16)}</p>

            <p className={styles.body} >{body}</p>

            <div className={styles.voteArea}>

                {activeUser && <img
                    src="/upArrow.png"
                    onClick={upvote}
                    disabled={loading}
                    style={{ filter: currentVote === 1 && 'drop-shadow(1.5px 1.5px 2px orangered)' }}
                />}


                <p>{voteScore}</p>
                {activeUser && <img
                    src="/downArrow.png"
                    onClick={downvote}
                    disabled={loading}
                    style={{ filter: currentVote === -1 && 'drop-shadow(1.5px 1.5px 2px blue)' }}
                />
                }

            </div>

            {dateModifed && <p>Modified on: {dateMod}</p>}

            {error && <p style={{ color: 'red' }} >Error: {error}</p>}

            {+activeUser?.id === +userId && <button onClick={handleDeleteComment} >delete</button>}
            {activeUser && <CreateComment
                post={postDetails}
                parentCommentId={id}
                parentUserId={userId}
                replyBoolDefault={false}
            />}

            {replies && <details open={(depthCounter % 3 !== 0) || isCommentDownStream(replies, +commentId)}>
                <summary >{`${replies.length} ${replyMessage}`}</summary>
                <CommentList depthCounter={depthCounter} comments={replies} />
            </details>}
        </div>
    )
}

function isCommentDownStream(comments, commentId) {
    for (let i = 0; i < comments.length; i++) {
        const { id, replies } = comments[i];
        if (id === commentId) return true;
        if (replies) return isCommentDownStream(replies, commentId)
    }
    return false;
}

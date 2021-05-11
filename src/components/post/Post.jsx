import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { createNewPostVoteHistory, deletePost, updatePostVote, updatePostVoteHistory } from '../../actions/reducerActions'
import { useDispatch, useSelector } from '../../providers/AppProvider'
import { useActiveUser } from '../../providers/AuthProvider'
import { getUserPostVoteHistory } from '../../selectors/selectors'
import { fetchDeletePost, fetchVoteOnPost } from '../../services/apiFetches'
import styles from './Post.css'

export default function Post({
    id,
    title,
    imageUrl,
    body,
    voteScore,
    dateCreated,
    dateModifed,
    createdBy,
    board,
    userId,
    boardId,
    commentCount
}) {

    const activeUser = useActiveUser()
    const dispatch = useDispatch()
    const postVoteHistory = useSelector(getUserPostVoteHistory)
    const [loading, setLoading] = useState(false)

    const handleDeletePost = () => {
        const confirm = window.confirm('Are you sure you want to delete this post?')
        if (confirm) {
            fetchDeletePost(id)
                .then(post => dispatch(deletePost(post)))
        }
    }
    const currentVote = postVoteHistory.find(voteHistory => +voteHistory.postId === +id)?.vote

    const upvote = () => {
        setLoading(true)
        const body = {
            voteHistory: currentVote,
            vote: 1
        }
        fetchVoteOnPost(id, body)
            .then(({ post, voteHistory }) => {
                dispatch(updatePostVote(post))
                if (currentVote === undefined) dispatch(createNewPostVoteHistory(voteHistory))
                else dispatch(updatePostVoteHistory(voteHistory))

                setLoading(false)
            })
    }
    const downvote = () => {
        setLoading(true)
        const body = {
            voteHistory: currentVote,
            vote: -1
        }
        fetchVoteOnPost(id, body)
            .then(({ post, voteHistory }) => {
                dispatch(updatePostVote(post))
                if (currentVote === undefined) dispatch(createNewPostVoteHistory(voteHistory))
                else dispatch(updatePostVoteHistory(voteHistory))

                setLoading(false)
            })
    }
    const date = new Date(+dateCreated).toString()
    const dateMod = new Date(+dateModifed).toString()
    return (
        <div className={styles.post} >
            <Link to={`/post-detail/${id}`} >
                <h2>{title}</h2>
                {imageUrl && <img src={imageUrl} />}
            </Link>

            {body && <p>{body}</p>}

            <div className={styles.votingArea}>
                {activeUser && <button onClick={upvote} disabled={loading} style={{ height: '25px', marginRight: '5px', color: currentVote === 1 && 'limegreen' }} >Like</button>}
                <p>Score: {voteScore}</p>
                {activeUser && <button onClick={downvote} disabled={loading} style={{ height: '25px', marginLeft: '5px', color: currentVote === -1 && 'red' }}>Dislike</button>}
            </div>

            <p>Posted on: {date}</p>
            {dateModifed && <p>Modified on: {DatedateModifed}</p>}

            <p>Created by: <Link to={`/user-page/${userId}`} >{createdBy}</Link></p>

            <p>Posted to: <Link to={`/board/${board}`} >{board}</Link></p>


            <p>Comments:  <Link to={`/post-detail/${id}`} >{commentCount}</Link></p>
            {activeUser?.id === userId && <button onClick={handleDeletePost} >Delete Post</button>}
        </div>
    )
}

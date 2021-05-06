import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { createNewVoteHistory, deletePost, updateBoardPostVote, updatePostVote, updatePostVoteHistory } from '../../actions/reducerActions'
import { useDispatch, useSelector } from '../../providers/AppProvider'
import { useActiveUser } from '../../providers/AuthProvider'
import { getUserPostVoteHistory } from '../../selectors/selectors'
import { fetchDeletePost, fetchVoteOnPost } from '../../services/apiFetches'

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


    const handleDeletePost = () => {
        const confirm = window.confirm('Are you sure you want to delete this post?')
        if (confirm) {
            fetchDeletePost(id)
                .then(post => dispatch(deletePost(post)))
        }
    }
    const currentVote = postVoteHistory.find(voteHistory => +voteHistory.postId === +id)?.vote

    const upvote = () => {
        const body = {
            voteHistory: currentVote,
            vote: 1
        }
        fetchVoteOnPost(id, body)
            .then(({ post, voteHistory }) => {
                dispatch(updatePostVote(post))
                if (currentVote === undefined) dispatch(createNewVoteHistory(voteHistory))
                else dispatch(updatePostVoteHistory(voteHistory))
            })
    }
    const downvote = () => {
        const body = {
            voteHistory: currentVote,
            vote: -1
        }
        fetchVoteOnPost(id, body)
            .then(({ post, voteHistory }) => {
                dispatch(updatePostVote(post))
                if (currentVote === undefined) dispatch(createNewVoteHistory(voteHistory))
                else dispatch(updatePostVoteHistory(voteHistory))
            })
    }

    return (
        <>
            <Link to={`/post-detail/${id}`} >
                <h2>{title}</h2>
                {imageUrl && <img src={imageUrl} />}
            </Link>
            {body && <p>{body}</p>}

            <div style={{ display: 'flex', alignItems: 'center' }}>
                {activeUser && <button onClick={upvote} style={{ height: '25px', marginRight: '5px', color: currentVote === 1 && 'green' }} >upvote</button>}
                <p>Score: {voteScore}</p>
                {activeUser && <button onClick={downvote} style={{ height: '25px', marginLeft: '5px', color: currentVote === -1 && 'red' }}>downvote</button>}
            </div>

            <p>Created on: {dateCreated}</p>
            {dateModifed && <p>Modified on: {dateModifed}</p>}
            <p>Created by: {createdBy}</p>

            <p>Posted to: <Link to={`/board/${board}`} >{board}</Link></p>


            <p>Comments: {commentCount}</p>
            {activeUser?.id === userId && <button onClick={handleDeletePost} >Delete Post</button>}
        </>
    )
}

import React from 'react'
import usePostDetails from '../../hooks/usePostDetails'
import CommentList from '../commentList/CommentList'

export default function PostDetail({ match }) {

    const { postDetails, loading } = usePostDetails(match.params.id)
    console.log(postDetails)
    const {
        title,
        imageUrl,
        body,
        voteScore,
        dateCreated,
        dateModifed,
        comments,
        userId,
        boardId
    } = postDetails;

    if (loading) return <h2>Loading...</h2>
    return (
        <>
            <h2>{title}</h2>
            {imageUrl && <img src={imageUrl} />}
            {body && <p>{body}</p>}
            <p>Score: {voteScore}</p>
            <p>Created on: {dateCreated}</p>
            {dateModifed && <p>Modified on: {dateModifed}</p>}
            <p>Created by: {userId}</p>
            <p>Board: {boardId}</p>
            {comments && <CommentList comments={comments} />}
        </>
    )
}

import React from 'react'
import usePostDetails from '../../hooks/usePostDetails'
import CommentList from '../commentList/CommentList'

export default function PostDetail({ match }) {

    const { postDetails: pd, loading } = usePostDetails(match.params.id)

    console.log(pd)

    if (loading) return <h2>Loading...</h2>
    return (
        <>
            <h2>{pd.title}</h2>
            {pd.imageUrl && <img src={pd.imageUrl} />}
            {pd.body && <p>{pd.body}</p>}
            <p>Score: {pd.voteScore}</p>
            <p>Created on: {pd.dateCreated}</p>
            {pd.dateModifed && <p>Modified on: {pd.dateModifed}</p>}
            <p>Created by: {pd.userId}</p>
            <p>Board: {pd.boardId}</p>
            {pd.comments && <CommentList comments={pd.comments} />}
        </>
    )
}

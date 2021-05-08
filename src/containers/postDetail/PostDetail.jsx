import React from 'react'
import { Link } from 'react-router-dom'
import usePostDetails from '../../hooks/usePostDetails'
import { useActiveUser } from '../../providers/AuthProvider'
import CommentList from '../../components/commentList/CommentList'
import CreateComment from '../../components/createComment/CreateComment'

export default function PostDetail({ match }) {

    const activeUser = useActiveUser()
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
            <p>Posted by: <Link to={`/user-page/${pd.userId}`} >{pd.createdBy}</Link></p>
            <p>Board: {pd.board}</p>
            {pd.dateModifed && <p>Modified on: {pd.dateModifed}</p>}

            {activeUser && <CreateComment postDetails={pd} parentCommentId={null} replyBoolDefault={true} />}
            {pd.comments && <CommentList comments={pd.comments} />}
        </>
    )
}

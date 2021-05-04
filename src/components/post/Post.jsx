import React from 'react'
import { Link } from 'react-router-dom'
import { deletePost } from '../../actions/reducerActions'
import { useDispatch, useSelector } from '../../providers/AppProvider'
import { useActiveUser } from '../../providers/AuthProvider'
import { getPosts } from '../../selectors/selectors'
import { fetchDeletePost } from '../../services/apiFetches'

export default function Post({
    id,
    title,
    imageUrl,
    body,
    voteScore,
    dateCreated,
    dateModifed,
    userId,
    boardId,
    commentCount
}) {

    const activeUser = useActiveUser()
    const dispatch = useDispatch()
    const posts = useSelector(getPosts)

    const handleDeletePost = () => {

        const confirm = window.confirm('Are you sure you want to delete this post?')

        if (confirm) {
            fetchDeletePost(id)
                .then(post => dispatch(deletePost(post)))
        }
    }

    return (
        <>
            <Link to={`/post-detail/${id}`} >
                <h2>{title}</h2>
                {imageUrl && <img src={imageUrl} />}
            </Link>
            {body && <p>{body}</p>}
            <p>Score: {voteScore}</p>
            <p>Created on: {dateCreated}</p>
            {dateModifed && <p>Modified on: {dateModifed}</p>}
            <p>Created by: {userId}</p>
            <p>Board: {boardId}</p>
            <p>Comments: {commentCount}</p>
            {activeUser?.id === userId && <button onClick={handleDeletePost} >Delete Post</button>}
        </>
    )
}

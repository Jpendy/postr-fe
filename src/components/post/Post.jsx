import React from 'react'
import { Link } from 'react-router-dom'

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
        </>
    )
}

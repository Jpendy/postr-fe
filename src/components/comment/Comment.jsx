import React from 'react'
import CommentList from '../commentList/CommentList'

export default function Comment({
    body,
    voteScore,
    dateCreated,
    dateModifed,
    replies,
    userId,
}) {

    console.log('score', voteScore)

    return (
        <>
            <p>{body}</p>
            <p>Score: {voteScore}</p>
            <p>Created on: {dateCreated}</p>
            {dateModifed && <p>Modified on: {dateModifed}</p>}
            <p>Created by: {userId}</p>
            {replies && <details>
                <summary>replies</summary>
                <CommentList comments={replies} />
            </details>}
        </>
    )
}

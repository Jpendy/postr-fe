import React from 'react'
import { useSelector } from '../../providers/AppProvider'
import { useActiveUser } from '../../providers/AuthProvider'
import { getPostDetails } from '../../selectors/selectors'
import CommentList from '../commentList/CommentList'
import CreateComment from '../createComment/CreateComment'

export default function Comment({
    id,
    body,
    voteScore,
    dateCreated,
    dateModifed,
    replies,
    userId,
}) {

    const activeUser = useActiveUser()
    const postDetails = useSelector(getPostDetails)

    const replyMessage = replies > 1 ? 'replies' : 'reply'
    return (
        <>
            <p>{body}</p>
            <p>Score: {voteScore}</p>
            <p>Created on: {dateCreated}</p>
            {dateModifed && <p>Modified on: {dateModifed}</p>}
            <p>Created by: {userId}</p>
            {activeUser && <CreateComment post={postDetails} parentCommentId={id} replyBoolDefault={false} />}

            {replies && <details>
                <summary>{`${replies.length} ${replyMessage}`}</summary>
                <CommentList comments={replies} />
            </details>}
        </>
    )
}

import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import Comment from '../comment/Comment'

export default function CommentList({ depthCounter = 0, comments }) {
    depthCounter++
    return (
        <ul>
            {comments.map(comment => <li key={comment.id}> <Comment depthCounter={depthCounter} {...comment} /> </li>)}
        </ul>
    )
}

import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import Comment from '../comment/Comment'

export default function CommentList({ comments }) {

    return (
        <ul>
            {comments.map((comment, i) => <li key={i}> <Comment {...comment} /> </li>)}
        </ul>
    )
}

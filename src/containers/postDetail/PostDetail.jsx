import React, { forwardRef, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import usePostDetails from '../../hooks/usePostDetails'
import { useActiveUser } from '../../providers/AuthProvider'
import CommentList from '../../components/commentList/CommentList'
import CreateComment from '../../components/createComment/CreateComment'
import styles from './PostDetail.css'

// const commentlist = forwardRef((props, commentEls) => (
//     <CommentList commentEls={commentEls} comments={pd.comments} />
// ))

export default function PostDetail({ match }) {

    const activeUser = useActiveUser()
    const { postDetails: pd, loading } = usePostDetails(match.params.id)

    const date = new Date(+pd.dateCreated).toString()
    const dateMod = new Date(+pd.dateModifed).toString()

    if (loading) return <h2>Loading...</h2>
    return (
        <div className={styles.postArea} >

            <div className={styles.post}>
                <h2>{pd.title}</h2>
                {pd.imageUrl && <img src={pd.imageUrl} />}
                {pd.body && <p>{pd.body}</p>}
                <p>Score: {pd.voteScore}</p>
                <p>Created on {date.slice(0, 16)}</p>

                <div className={styles.postedBy} >
                    <p>Posted by <Link to={`/user-page/${pd.userId}`} >{pd.createdBy}</Link> to&nbsp;</p>
                    <p><Link to={`/board/${pd.board}`} > {pd.board}</Link></p>
                </div>

                {pd.dateModifed && <p>Modified on: {dateMod}</p>}
            </div>

            {activeUser && <CreateComment
                postDetails={pd}
                parentCommentId={null}
                parentUserId={pd.userId}
                replyBoolDefault={true}
            />}
            {pd.comments && <CommentList comments={pd.comments} />}
        </div>
    )
}

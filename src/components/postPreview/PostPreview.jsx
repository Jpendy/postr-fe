import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { createNewPostVoteHistory, deletePost, updatePostVote, updatePostVoteHistory } from '../../actions/reducerActions'
import { useDispatch, useSelector } from '../../providers/AppProvider'
import { useActiveUser } from '../../providers/AuthProvider'
import { getUserPostVoteHistory } from '../../selectors/selectors'
import { fetchDeletePost, fetchVoteOnPost } from '../../services/apiFetches'
import Modal from '../modal/Modal'
import Login from '../../containers/login/Login'
import Signup from '../../containers/signup/Signup'
import styles from '../post/Post.css'

export default function PostPreview({
    id,
    title,
    imageUrl,
    body,
    voteScore,
    dateCreated,
    dateModifed,
    createdBy,
    board,
    userId,
    boardId,
    commentCount,
    handleOpenDetails,
    closedPosts,
    allPostsClosed,
    postColor,
    fontColor,
    linkColor,
    upDateVoteFn
}) {

    const activeUser = useActiveUser()

    const [postOpen, setPostOpen] = useState(true)

    const handleOpenPost = (id) => {
        setPostOpen(curr => !curr)
        handleOpenDetails(id)
    }

    const commentMessage = 'comments';

    const date = new Date(+dateCreated).toString()
    const dateMod = new Date(+dateModifed).toString()
    return (
        <>
            <div style={{ backgroundColor: postColor, color: fontColor, width: window.innerWidth > 615 && '100%' }} className={styles.post} >

                <div className={styles.votingArea}>
                    <img src="/upArrow.png" />
                    <p>0</p>
                    <img src="/downArrow.png" />
                </div>

                {/* <div className={styles.postArea} > */}
                <div className={styles.postTopArea} >
                    <p>Posted to <Link to={`/board/${board}`} style={{ color: linkColor }} >{board}</Link> by&nbsp;
                        <Link style={{ color: linkColor }} to={`/user-page/${userId}`} >{createdBy}</Link></p>
                    {/* <p>&nbsp;on {date.slice(0, 16)}</p> */}
                </div>

                <Link to={`/post-detail/${id}`} style={{ color: linkColor }} >
                    <h2 className={styles.title}>{title}</h2>
                </Link>

                <img className={styles.summaryIcon}
                    onClick={() => handleOpenPost(id)}
                    src={imageUrl || '/text-icon1.png'}
                    // style={{
                    //     // objectFit: 'cover',
                    //     height: '70px',
                    //     width: '70px',
                    // }}
                    alt='post image icon' />

                {postOpen && <div className={styles.imageArea} >
                    {imageUrl && <Link to={`/post-detail/${id}`} style={{ color: linkColor }} ><img className={styles.postImage} src={imageUrl} /></Link>}
                    {body && <p className={styles.postBody} >{body}</p>}
                </div>}

                {dateModifed && <p>Modified on: {DatedateModifed}</p>}

                <p className={styles.comments} ><Link style={{ color: linkColor }} to={`/post-detail/${id}`} >{`0 ${commentMessage}`} </Link></p>
                {/* </div> */}



            </div>
        </>
    )
}
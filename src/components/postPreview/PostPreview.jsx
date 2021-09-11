import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useActiveUser } from '../../providers/AuthProvider'

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
                    <p>Posted to <Link style={{ color: linkColor }} >{board}</Link> by&nbsp;
                        <Link style={{ color: linkColor }}>{createdBy}</Link></p>
                    {/* <p>&nbsp;on {date.slice(0, 16)}</p> */}
                </div>

                <Link to={`/post-detail/${id}`} style={{ color: linkColor }} >
                    <h2 className={styles.title}>{title}</h2>
                </Link>

                <img className={styles.summaryIcon}
                    style={{ backgroundColor: 'white', width: window.innerWidth > 800 && '8vw', height: window.innerWidth > 800 && '8vw' }}
                    onClick={() => handleOpenPost(id)}
                    src={imageUrl || '/text-icon1.png'}
                    alt='post image icon' />

                {postOpen && <div style={{ height: '100%' }} className={styles.imageArea} >
                    {imageUrl && <img className={styles.postImage} src={imageUrl} />}
                    {body && <p className={styles.postBody} >{body}</p>}
                </div>}

                <p className={styles.comments} ><Link style={{ color: linkColor }} >{`0 ${commentMessage}`} </Link></p>
            </div>
        </>
    )
}

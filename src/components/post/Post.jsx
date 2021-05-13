import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { createNewPostVoteHistory, deletePost, updatePostVote, updatePostVoteHistory } from '../../actions/reducerActions'
import { useDispatch, useSelector } from '../../providers/AppProvider'
import { useActiveUser } from '../../providers/AuthProvider'
import { getUserPostVoteHistory } from '../../selectors/selectors'
import { fetchDeletePost, fetchVoteOnPost } from '../../services/apiFetches'
import styles from './Post.css'

export default function Post({
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
    allPostsClosed
}) {

    const activeUser = useActiveUser()
    const dispatch = useDispatch()
    const postVoteHistory = useSelector(getUserPostVoteHistory)
    const [loading, setLoading] = useState(false)

    const handleDeletePost = () => {
        const confirm = window.confirm('Are you sure you want to delete this post?')
        if (confirm) {
            fetchDeletePost(id)
                .then(post => dispatch(deletePost(post)))
        }
    }
    const currentVote = postVoteHistory.find(voteHistory => +voteHistory.postId === +id)?.vote

    const upvote = () => {
        setLoading(true)
        const body = {
            voteHistory: currentVote,
            vote: 1
        }
        fetchVoteOnPost(id, body)
            .then(({ post, voteHistory }) => {
                dispatch(updatePostVote(post))
                if (currentVote === undefined) dispatch(createNewPostVoteHistory(voteHistory))
                else dispatch(updatePostVoteHistory(voteHistory))

                setLoading(false)
            })
    }
    const downvote = () => {
        setLoading(true)
        const body = {
            voteHistory: currentVote,
            vote: -1
        }
        fetchVoteOnPost(id, body)
            .then(({ post, voteHistory }) => {
                dispatch(updatePostVote(post))
                if (currentVote === undefined) dispatch(createNewPostVoteHistory(voteHistory))
                else dispatch(updatePostVoteHistory(voteHistory))

                setLoading(false)
            })
    }
    const date = new Date(+dateCreated).toString()
    const dateMod = new Date(+dateModifed).toString()
    return (
        <div className={styles.post} >

            <div className={styles.votingArea}>
                {activeUser && <img
                    src="/upArrow.png"
                    onClick={upvote}
                    disabled={loading}
                    style={{ filter: currentVote === 1 && 'drop-shadow(1.5px 1.5px 2px orangered)' }}
                />}

                <p>{voteScore}</p>

                {activeUser && <img
                    src="/downArrow.png"
                    onClick={downvote}
                    disabled={loading}
                    style={{ filter: currentVote === -1 && 'drop-shadow(1.5px 1.5px 2px blue)' }}
                />}

            </div>

            <div className={styles.postArea} >
                <div className={styles.postTopArea} >
                    <p>Posted to <Link to={`/board/${board}`} >{board}</Link> by&nbsp;</p>
                    <p><Link to={`/user-page/${userId}`} >{createdBy}</Link></p>
                    <p>&nbsp;on {date.slice(0, 16)}</p>
                </div>

                <Link to={`/post-detail/${id}`} >
                    <h2>{title}</h2>
                </Link>

                <details open={!allPostsClosed}>
                    <summary className={styles.summary} onClick={() => handleOpenDetails(id)} >
                        <img className={styles.summaryIcon} src={closedPosts.includes(id) ? '/open-icon.png' : '/x-close.png'} alt='' />
                    </summary>
                    {imageUrl && <Link to={`/post-detail/${id}`} ><img className={styles.postImage} src={imageUrl} /></Link>}
                    {body && <p>{body}</p>}
                </details>




                {dateModifed && <p>Modified on: {DatedateModifed}</p>}

                <p><Link to={`/post-detail/${id}`} >{commentCount} comments</Link></p>
                {activeUser?.id === userId && <button onClick={handleDeletePost} >Delete Post</button>}
            </div>


        </div>
    )
}

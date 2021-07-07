import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { createNewPostVoteHistory, deletePost, updatePostVote, updatePostVoteHistory } from '../../actions/reducerActions'
import { useDispatch, useSelector } from '../../providers/AppProvider'
import { useActiveUser } from '../../providers/AuthProvider'
import { getUserPostVoteHistory } from '../../selectors/selectors'
import { fetchDeletePost, fetchVoteOnPost } from '../../services/apiFetches'
import Modal from '../modal/Modal'
import Login from '../../containers/login/Login'
import Signup from '../../containers/signup/Signup'
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
    allPostsClosed,
    postColor,
    fontColor,
    linkColor,
    upDateVoteFn
}) {

    const activeUser = useActiveUser()
    const dispatch = useDispatch()
    const postVoteHistory = useSelector(getUserPostVoteHistory)
    const [loading, setLoading] = useState(false)

    const [loginSignupModalOpen, setLoginSignupModalOpen] = useState(false)
    const [loginOrSignup, setLoginOrSignup] = useState('login')
    const handleModalChange = () => setLoginOrSignup(curr => curr === 'login' ? 'signup' : 'login')
    const handleCloseModal = () => setLoginSignupModalOpen(false)

    const handleDeletePost = () => {
        const confirm = window.confirm('Are you sure you want to delete this post?')
        if (confirm) {
            fetchDeletePost(id)
                .then(post => dispatch(deletePost(post)))
        }
    }
    const currentVote = postVoteHistory.find(voteHistory => +voteHistory.postId === +id)?.vote

    const upvote = () => {
        if (!activeUser) {
            setLoginSignupModalOpen(true)
            return
        }

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
        if (!activeUser) {
            setLoginSignupModalOpen(true)
            return
        }

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

    const modalButtonStyle = { marginTop: '15px' }
    const modalStyle = { width: '90%' }

    const commentMessage = +commentCount === 1 ? 'comment' : 'comments'

    const date = new Date(+dateCreated).toString()
    const dateMod = new Date(+dateModifed).toString()
    return (
        <>
            <Modal
                open={loginSignupModalOpen}
                handleCloseModal={handleCloseModal}
            >
                <h3>Please log in or sign up to vote on posts!</h3>
                {loginOrSignup === 'login' && <div>
                    <Login modalStyle={modalStyle} handleCloseModal={handleCloseModal} />
                    <button style={modalButtonStyle} onClick={handleModalChange} >Sign Up</button>
                </div>}

                {loginOrSignup === 'signup' && <div >
                    <Signup modalStyle={modalStyle} handleCloseModal={handleCloseModal} />
                    <button style={modalButtonStyle} onClick={handleModalChange} >Log in</button>
                </div>}

            </Modal>

            <div style={{ backgroundColor: postColor, color: fontColor }} className={styles.post} >

                <div className={styles.votingArea}>
                    <img
                        src="/upArrow.png"
                        onClick={upvote}
                        disabled={loading}
                        style={{ filter: currentVote === 1 && 'drop-shadow(1.5px 1.5px 2px orangered)' }}
                    />

                    <p>{voteScore}</p>

                    <img
                        src="/downArrow.png"
                        onClick={downvote}
                        disabled={loading}
                        style={{ filter: currentVote === -1 && 'drop-shadow(1.5px 1.5px 2px blue)' }}
                    />

                </div>

                <div className={styles.postArea} >
                    <div className={styles.postTopArea} >
                        <p>Posted to <Link to={`/board/${board}`} style={{ color: linkColor }} >{board}</Link> by&nbsp;</p>
                        <p><Link style={{ color: linkColor }} to={`/user-page/${userId}`} >{createdBy}</Link></p>
                        <p>&nbsp;on {date.slice(0, 16)}</p>
                    </div>

                    <Link to={`/post-detail/${id}`} style={{ color: linkColor }} >
                        <h2>{title}</h2>
                    </Link>

                    <details open={!allPostsClosed}>
                        <summary className={styles.summary} onClick={() => handleOpenDetails(id)} >
                            <img className={styles.summaryIcon}
                                src={closedPosts.includes(id) ? imageUrl : '/x-close.png'}
                                style={{
                                    // objectFit: 'cover',
                                    height: closedPosts.includes(id) ? '70px' : '15px',
                                    width: closedPosts.includes(id) ? '70px' : '15px',
                                }}
                                alt='post image icon' />
                        </summary>
                        {imageUrl && <Link to={`/post-detail/${id}`} style={{ color: linkColor }} ><img className={styles.postImage} src={imageUrl} /></Link>}
                        {body && <p>{body}</p>}
                    </details>

                    {dateModifed && <p>Modified on: {DatedateModifed}</p>}

                    <p><Link style={{ color: linkColor }} to={`/post-detail/${id}`} >{`${commentCount} ${commentMessage}`} </Link></p>
                    {activeUser?.id === userId && <button onClick={handleDeletePost} >Delete Post</button>}
                </div>


            </div>
        </>
    )
}

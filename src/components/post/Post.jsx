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

    const image = new Image()
    image.src = imageUrl;
    let imageHeight = 0;
    image.onload = function () {
        imageHeight = (this.height / (this.width / window.innerWidth))
    }

    const [postHeight, setPostHeight] = useState(0)

    const togglePostHeight = () => {
        setPostHeight(curr => curr === 0 ? (imageHeight + (((body?.length || 0) / 40) * 25)) : 0)
    }

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
        if (loading) return;
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

            })
        setLoading(false)
    }

    const downvote = () => {
        if (!activeUser) {
            setLoginSignupModalOpen(true)
            return
        }
        if (loading) return;
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

            })
        setLoading(false)
    }

    const handleOpenPost = (id) => {
        togglePostHeight()
        handleOpenDetails(id)
    }

    // const modalButtonStyle = { marginTop: '15px' }
    const modalStyle = { width: window.innerWidth > 600 ? '90%' : '100%', marginTop: '30px' }

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
                    <button className={styles.switchModalButton} onClick={handleModalChange} >Sign Up</button>
                </div>}

                {loginOrSignup === 'signup' && <div >
                    <Signup modalStyle={modalStyle} handleCloseModal={handleCloseModal} />
                    <button className={styles.switchModalButton} style={{ marginBottom: '20px' }} onClick={handleModalChange} >Log in</button>
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
                    alt='post image icon' />

                {<div style={{ height: postHeight }} className={styles.imageArea} >
                    {imageUrl && <Link to={`/post-detail/${id}`} style={{ color: linkColor }} ><img className={styles.postImage} src={imageUrl} /></Link>}
                    {body && <p className={styles.postBody} >{body}</p>}
                </div>}

                {dateModifed && <p>Modified on: {DatedateModifed}</p>}

                <p className={styles.comments} ><Link style={{ color: linkColor }} to={`/post-detail/${id}`} >{`${commentCount} ${commentMessage}`} </Link></p>
                {/* </div> */}


                {/* {activeUser?.id === userId && <button
                    className={styles.deletePost}
                    onClick={handleDeletePost} >
                    Delete Post
                </button>} */}
            </div>
        </>
    )
}

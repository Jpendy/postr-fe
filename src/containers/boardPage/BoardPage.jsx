import React, { useEffect, useState } from 'react'
import { setPosts, setSingleBoard, updateBoardPostVote } from '../../actions/reducerActions'
import { useDispatch, useSelector } from '../../providers/AppProvider'
import { getSingleBoard } from '../../selectors/selectors'
import { fetchBoardByName } from '../../services/apiFetches'
import PostList from '../../components/postList/PostList'
import CreatePost from '../../components/createPost/CreatePost'
import { useActiveUser } from '../../providers/AuthProvider'
import styles from './BoardPage.css'
import Modal from '../../components/modal/Modal'

export default function BoardPage({ match }) {

    const activeUser = useActiveUser()
    const dispatch = useDispatch()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const [createPostBool, setCreatePostBool] = useState(false)

    const board = useSelector(getSingleBoard)

    const [bgColor, setBgColor] = useState('')
    const [postColor, setPostColor] = useState('')
    const [fontColor, setFontColor] = useState('')
    const [linkColor, setLinkColor] = useState('')

    const owner = board.userId === activeUser?.id

    console.log(activeUser)

    useEffect(() => {
        setError(null)
        fetchBoardByName(match.params.name)
            .then(board => {
                dispatch(setSingleBoard(board))
                // dispatch(setPosts(board.posts))
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [])

    const revertColors = () => {
        setBgColor(board.bgColor)
        setPostColor(board.postColor)
        setFontColor(board.fontColor)
        setLinkColor(board.linkColor)
    }

    const handleOpenCreatePost = () => setCreatePostBool(curr => !curr)

    if (loading) return <h3>Loading...</h3>
    return (
        <div className={styles.boardPage} style={{ backgroundColor: bgColor || board.bgColor }}>

            {error && <p style={{ color: 'red' }} >{error}</p>}
            {/* {board?.bannerImageUrl && <img style={{ width: '100%', height: '250px' }} src={board?.bannerImageUrl} alt="banner image" />} */}
            <h2 style={{ margin: '0px', textAlign: 'center' }} >{board?.name}</h2>

            {owner && <div>
                <input type="color" onChange={e => setBgColor(e.target.value)} />
                <input type="color" onChange={e => setPostColor(e.target.value)} />
                <input type="color" onChange={e => setFontColor(e.target.value)} />
                <input type="color" onChange={e => setLinkColor(e.target.value)} />
                <button onClick={revertColors} >revert colors</button>

            </div>}

            {activeUser && <button className={styles.createPostButton}
                onClick={handleOpenCreatePost}
            >New Post
            </button>}

            <Modal
                open={createPostBool}
                handleCloseModal={handleOpenCreatePost}
                backgroundColor="EEE4E1"
            >
                {activeUser && < CreatePost
                    boardId={board.id}
                    boardName={board.name}
                    userName={activeUser.displayName}
                    handleCloseModal={handleOpenCreatePost}
                />}
            </Modal>

            {board.posts && <PostList
                posts={board?.posts}
                bgColor={bgColor || board.bgColor}
                upDateVoteFn={updateBoardPostVote}
                postColor={postColor || board.postColor}
                fontColor={fontColor || board.fontColor}
                linkColor={linkColor || board.linkColor}
            />}
        </div>
    )
}

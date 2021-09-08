import React, { useState } from 'react'
import useBoards from '../../hooks/useBoards'
import { v4 as uuidv4 } from 'uuid'
import { fetchCreatePost } from '../../services/apiFetches'
import { useDispatch } from '../../providers/AppProvider'
import { createPost } from '../../actions/reducerActions'
import styles from './CreatePost.css'
import Input from '../input/Input'

const styleObj = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '50%',
}

export default function CreatePost({ boardId }) {

    const dispatch = useDispatch()
    const { boards, loading, error } = useBoards()

    const [title, setTitle] = useState('')
    const [postBody, setPostBody] = useState('')

    const [imagePreviewSource, setImagePreviewSource] = useState('')
    const [file, setFile] = useState('')
    const [postError, setPostError] = useState(null)


    const handleFileInputChange = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => setImagePreviewSource(reader.result)
    }

    const createPostSubmit = (e) => {
        e.preventDefault()
        setPostError(null)

        if (!title.trim() || !boardId) return

        const post = {
            title,
            imageData: imagePreviewSource,
            body: postBody,
            boardId
        }

        fetchCreatePost(post)
            .then(post => {
                dispatch(createPost(post))
                setTitle('')
                setPostBody('')
                setImagePreviewSource('')
                setFile('')
            })
            .catch(err => setPostError(err.message))
    }

    return (
        <div className={styles.createPost} style={{ display: 'flex', justifyContent: 'center' }} >
            <form style={styleObj} onSubmit={createPostSubmit} >
                Create Post
                <Input value={title} type="text" placeholder="Title" onChange={e => setTitle(e.target.value)} />
                <Input height="100px" value={postBody} placeholder="Post Body" onChange={e => setPostBody(e.target.value)} />

                {/* <select id="board-list" onChange={e => setBoardId(e.target.value)} >
                    <option value="">choose board</option>
                    {boards.map((board, i) => <option key={i - 9999} value={board.id}> {board.name} </option>)}
                </select> */}

                <input type="file" name="image-upload" onChange={handleFileInputChange} value={file} />

                <button className={styles.createPostButton} disabled={!title.trim() || !boardId} >Submit Post</button>
                {postError && <p style={{ color: 'red' }}>{postError}</p>}
            </form>
            {imagePreviewSource && <img src={imagePreviewSource} alt="image preview" style={{ height: '300px' }} />}

        </div >
    )
}

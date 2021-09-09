import React, { useState } from 'react'
import useBoards from '../../hooks/useBoards'
import { fetchCreatePost } from '../../services/apiFetches'
import { useDispatch } from '../../providers/AppProvider'
import { createPost } from '../../actions/reducerActions'
import styles from './CreatePost.css'
// import Input from '../input/Input'
import { TextField, FormControl, Input } from '@material-ui/core';
import PostPreview from '../postPreview/PostPreview'


const styleObj = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '500px',
}

export default function CreatePost({ boardId, boardName, userName }) {

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
        <div className={styles.createPost} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >
            <form className={styles.createPostForm} style={styleObj} onSubmit={createPostSubmit} >
                <FormControl >
                    <TextField
                        className={styles.postTitle}
                        value={title}
                        type="text"
                        label="Title"
                        variant="outlined"
                        size="small"
                        onChange={e => setTitle(e.target.value)}
                    />
                    <TextField
                        className={styles.postBody}
                        variant="outlined"
                        multiline
                        rows={3}
                        maxRows={Infinity}
                        value={postBody}
                        label="Post Body"
                        onChange={e => setPostBody(e.target.value)}
                    />
                    <Input
                        className={styles.postFile}
                        type="file"
                        disableUnderline={true}
                        name="image-upload"
                        onChange={handleFileInputChange}
                        value={file}
                    />

                    <div>
                        <PostPreview
                            title={title}
                            imageUrl={imagePreviewSource}
                            body={postBody}
                            board={boardName}
                            createdBy={userName}
                        />
                    </div>

                    {/* {(imagePreviewSource || title || postBody) && <p className={styles.postPreview}>Post Preview</p>}
                    {imagePreviewSource && <img src={imagePreviewSource} alt="image preview" style={{ height: '100%', width: '200px', margin: 'auto' }} />} */}
                    <button className={styles.createPostButton} disabled={!title.trim() || !boardId} >Submit Post</button>
                    {postError && <p style={{ color: 'red' }}>{postError}</p>}
                </FormControl>
            </form>

        </div >
    )
}

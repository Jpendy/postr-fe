import React, { useState } from 'react'
import useBoards from '../../hooks/useBoards'
import { v4 as uuidv4 } from 'uuid'
import { fetchCreatePost } from '../../services/apiFetches'
import { useDispatch, useSelector } from '../../providers/AppProvider'
import { getPosts } from '../../selectors/selectors'
import { setPosts } from '../../actions/reducerActions'


const styleObj = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '50%',
}

export default function CreatePost() {

    const dispatch = useDispatch()
    const posts = useSelector(getPosts)

    const [imageUrl, setImageUrl] = useState('')
    const [title, setTitle] = useState('')
    const [postBody, setPostBody] = useState('')
    const [boardId, setBoardId] = useState('')

    const { boards, loading, error } = useBoards()

    const createPostSubmit = (e) => {
        e.preventDefault()
        if (!title || !boardId) return

        const post = {
            title,
            imageUrl,
            body: postBody,
            boardId: boardId
        }

        fetchCreatePost(post)
            .then(post => dispatch(setPosts([post, ...posts])))
    }

    console.log(boardId, title, postBody, imageUrl)

    return (
        <div style={{ margin: 'auto' }} >
            <form style={styleObj} onSubmit={createPostSubmit} >
                <input type="text" placeholder="Image Url" onChange={e => setImageUrl(e.target.value)} />
                <input type="text" placeholder="Title" onChange={e => setTitle(e.target.value)} />
                <textarea placeholder="Post Body" onChange={e => setPostBody(e.target.value)} />

                <select id="board-list" onChange={e => setBoardId(e.target.value)} >
                    <option value="">choose board</option>
                    {boards.map(board => <option key={uuidv4()} value={board.id}> {board.name} </option>)
                    }
                </select>
                <button>Submit Post</button>
            </form>

        </div >
    )
}

import React, { useState } from 'react'
import { TextField, FormControl, Button, Input } from '@material-ui/core';
import { useHistory } from 'react-router-dom'
import { createBoard } from '../../actions/reducerActions'
import { useDispatch } from '../../providers/AppProvider'
import { fetchCreateBoard } from '../../services/apiFetches'
import styles from './CreateBoardForm.css'

const styleObj = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
}

export default function CreateBoardForm() {
    const history = useHistory()
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [bgColor, setBgColor] = useState('')
    const [postColor, setPostColor] = useState('')
    const [fontColor, setFontColor] = useState('')
    const [linkColor, setLinkColor] = useState('')
    const [bannerImageUrl, setBannerImageUrl] = useState('')
    const [error, setError] = useState(null)

    const handleCreateBoard = (e) => {
        e.preventDefault()

        fetchCreateBoard({
            name,
            bgColor,
            postColor,
            fontColor,
            linkColor,
            bannerImageUrl
        })
            .then(board => {
                dispatch(createBoard(board))
                history.push(`/board/${board.name}`)
            })
            .catch(err => setError(err.message))
    }

    return (

        <form style={styleObj} onSubmit={handleCreateBoard} >
            {error && <p style={{ color: 'red' }} >{error}</p>}
            <TextField variant="outlined" size="small" label="board name - required" onChange={e => setName(e.target.value)} />
            <TextField variant="outlined" size="small" label="banner image url" onChange={e => setBannerImageUrl(e.target.value)} />
            <label >Background Color:  <Input style={{ width: '50px' }} type="color" onChange={e => setBgColor(e.target.value)} /></label>
            <label >Post Color: <Input style={{ width: '50px' }} type="color" onChange={e => setPostColor(e.target.value)} /></label>
            <label >Font Color: <Input style={{ width: '50px' }} type="color" onChange={e => setFontColor(e.target.value)} /></label>
            <label >Url Color: <Input style={{ width: '50px' }} type="color" onChange={e => setLinkColor(e.target.value)} /></label>

            <button disabled={!name.trim()} >create board</button>
        </form>
    )
}

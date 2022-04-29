import React, { useState } from 'react'
import { TextField, FormControl, InputLabel, Input } from '@material-ui/core';
import { useHistory } from 'react-router-dom'
import { createBoard } from '../../actions/reducerActions'
import { useDispatch } from '../../providers/AppProvider'
import { fetchCreateBoard } from '../../services/apiFetches'
import styles from './CreateBoardForm.css'

const styleObj = {
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'flex-start'
}

export default function CreateBoardForm() {
    const history = useHistory()
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [bgColor, setBgColor] = useState('#FFFFFF')
    const [postColor, setPostColor] = useState('#EEE4E1')
    const [fontColor, setFontColor] = useState('')
    const [linkColor, setLinkColor] = useState('#C23104')
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

        <form className={styles.createBoardForm} onSubmit={handleCreateBoard} >
            {error && <p style={{ color: 'red' }} >{error}</p>}

            <div>
                <InputLabel margin="normal" className={styles.boardNameLabel} htmlFor="board-name">Choose your board's name!</InputLabel>
                <TextField id="board-name" required variant="outlined" size="small" label="name - required" onChange={e => setName(e.target.value)} />
            </div>

            {/* <TextField variant="outlined" size="small" label="banner image url" onChange={e => setBannerImageUrl(e.target.value)} /> */}

            <div>
                <InputLabel htmlFor="background-color">Choose your background color!</InputLabel>
                <Input id="background-color" value={bgColor} type="color" disableUnderline onChange={e => setBgColor(e.target.value)} />
            </div>

            <div>
                <InputLabel htmlFor="post-color">Choose your post color!</InputLabel>
                <Input id="post-color" value={postColor} type="color" disableUnderline onChange={e => setPostColor(e.target.value)} />
            </div>

            <div>
                <InputLabel htmlFor="font-color">Choose your font color!</InputLabel>
                <Input id="font-color" type="color" disableUnderline onChange={e => setFontColor(e.target.value)} />
            </div>

            <div>
                <InputLabel htmlFor="link-color">Choose your link color!</InputLabel>
                <Input id="link-color" value={linkColor} type="color" disableUnderline onChange={e => setLinkColor(e.target.value)} />
            </div>

            <button disabled={!name.trim()} >create board</button>
        </form>
    )
}

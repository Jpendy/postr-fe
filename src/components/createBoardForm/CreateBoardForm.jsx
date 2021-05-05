import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { createBoard } from '../../actions/reducerActions'
import { useDispatch } from '../../providers/AppProvider'
import { fetchCreateBoard } from '../../services/apiFetches'

const styleObj = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
}

export default function CreateBoardForm() {
    const history = useHistory()
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [primaryColor, setPrimaryColor] = useState('')
    const [secondaryColor, setSecondaryColor] = useState('')
    const [tertiaryColor, setTertiaryColor] = useState('')
    const [bannerImageUrl, setBannerImageUrl] = useState('')
    const [error, setError] = useState(null)

    const handleCreateBoard = (e) => {
        e.preventDefault()

        fetchCreateBoard({
            name,
            primaryColor,
            secondaryColor,
            tertiaryColor,
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
            <input type="text" placeholder="board name - required" onChange={e => setName(e.target.value)} />
            <input type="text" placeholder="banner image url" onChange={e => setBannerImageUrl(e.target.value)} />
            <label htmlFor="">Primary Color:  <input type="color" onChange={e => setPrimaryColor(e.target.value)} /></label>
            <label htmlFor="">Secondary Color: <input type="color" onChange={e => setSecondaryColor(e.target.value)} /></label>
            <label htmlFor="">Tertiary Color: <input type="color" onChange={e => setTertiaryColor(e.target.value)} /></label>
            <button disabled={!name.trim()} >create board</button>
        </form>
    )
}

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useBoards from '../../hooks/useBoards'
import styles from './BoardSearch.css'
import Input from '../input/Input'

export default function BoardSearch() {

    const [search, setSearch] = useState('')

    const { boards } = useBoards()

    const boardsList = boards
        .filter(board => {
            if (search.trim()) return board.name.toLowerCase().includes(search.toLowerCase().trim())
            return true;
        })
        .sort((a, b) => b.postCount - a.postCount)

    const list = boardsList.map(({ name, postCount }) => (
        <li key={name} >
            <Link to={`/board/${name}`} >{name}</Link> <span>~ {postCount} posts</span>
        </li>
    ))

    const height = 85 + boardsList.length * 26;

    return (
        <div style={{ height: `${height}px` }} className={styles.boardSearch}  >
            {/* <Input type="text" placeholder="board search" onChange={e => setSearch(e.target.value)} /> */}
            <input type="text" placeholder="board search" onChange={e => setSearch(e.target.value)} />
            <ul>
                {list}
            </ul>
        </div>
    )
}

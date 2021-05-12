import { postcss } from 'autoprefixer'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useBoards from '../../hooks/useBoards'
import styles from './BoardSearch.css'

export default function BoardSearch() {

    const [search, setSearch] = useState('')

    const { boards } = useBoards()

    const boardsList = boards
        .filter(board => {
            if (search.trim()) return board.name.toLowerCase().includes(search.toLowerCase())
            return true;
        })
        .sort((a, b) => b.postCount - a.postCount)

    const list = boardsList.map(({ name, postCount }) => (
        <li key={name} >
            <Link to={`/board/${name}`} >{name}</Link> <span>~ {postCount} posts</span>
        </li>
    ))


    return (
        <div className={styles.boardSearch} >
            <input type="text" placeholder="board search" onChange={e => setSearch(e.target.value)} />
            <ul>
                {list}
            </ul>
        </div>
    )
}

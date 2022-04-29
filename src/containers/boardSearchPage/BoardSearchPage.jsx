import React from 'react'
import BoardSearch from '../../components/boardSearch/BoardSearch'

export default function BoardSearchPage() {
    let width = '50%';
    if (window.innerWidth < 600) width = '80%';
    if (window.innerWidth < 400) width = '100%';

    return (
        <div style={{ display: "flex", justifyContent: "center" }} >
            <div
                style={{ width }}
            >
                <BoardSearch />
            </div>
        </div>
    )
}

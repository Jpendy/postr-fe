import React from 'react'
import { useLocation, useHistory } from 'react-router-dom';

export default function usePagination(count) {

    const location = useLocation();
    const history = useHistory();
    const page = Number((new URLSearchParams(location.search)).get('page') || 1);

    const totalPages = count / 10

    const buttonStyles = {
        width: '80px',
        margin: '0px 5px 0px 5px',
        cursor: 'pointer'
    }

    const PageButtons = () => (
        <div style={{ textAlign: 'center', marginBottom: '50px' }} >
            <button
                style={buttonStyles}
                disabled={page <= 1}
                onClick={() => history.push(`?page=${page - 1}`)}
            >
                previous
            </button>
            {/* <span>{`${page} / ${totalPages}`}</span> */}
            <button
                style={buttonStyles}
                disabled={page >= totalPages}
                onClick={() => history.push(`?page=${page + 1}`)}
            >
                next
            </button>
        </div>
    );

    return {
        page,
        PageButtons
    };
}

// const PageButton = () => (
//     <div style={{ textAlign: 'center', marginBottom: '50px' }} >

//         <button
//             disabled={page >= totalPages}
//             name='next'
//             onClick={() => history.push(`?page=${page + 1}`)}
//         >
//             Load More
//         </button>
//     </div>
// );
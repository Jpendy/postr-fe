import React from 'react'
import styles from '../utils/css/pagination.css'
import { useLocation, useHistory } from 'react-router-dom';

export default function usePagination(count) {

    const location = useLocation();
    const history = useHistory();
    const page = Number((new URLSearchParams(location.search)).get('page') || 1);

    const totalPages = count / 10

    const PageButtons = () => (
        <div className={styles.buttonContainer} >
            <button
                className={styles.button}
                style={{ opacity: page <= 1 && '.5' }}
                disabled={page <= 1}
                onClick={() => history.push(`?page=${page - 1}`)}
            >
                previous
            </button>
            <button
                className={styles.button}
                style={{ opacity: page >= totalPages && '.5' }}
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

import React, { useReducer, useEffect, useContext } from 'react';
import { setReplies, setUserCommentVoteHistory, setUserPostVoteHistory } from '../actions/reducerActions';
import reducer, { initialState } from '../reducers/appReducer';
import { fetchAllReplies, fetchUserCommentVoteHistory, fetchUserPostVoteHistory } from '../services/apiFetches';
import { useActiveUser } from './AuthProvider';

const AppContext = React.createContext();

export default function AppProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const activeUser = useActiveUser()

    useEffect(() => {

        if (!activeUser) return;
        Promise.all([
            fetchUserPostVoteHistory(),
            fetchUserCommentVoteHistory(),
            fetchAllReplies(),
        ])
            .then(([postHistory, commentHistory, replies]) => {
                dispatch(setUserPostVoteHistory(postHistory))
                dispatch(setUserCommentVoteHistory(commentHistory))
                dispatch(setReplies(replies))
            })
            .catch(e => console.error('Error', e))

    }, [activeUser])

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

export const useDispatch = () => {
    const { dispatch } = useContext(AppContext);
    return dispatch;
};

export const useSelector = selectorFn => {
    const { state } = useContext(AppContext);
    return selectorFn(state);
};
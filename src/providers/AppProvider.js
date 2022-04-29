import React, { useReducer, useEffect, useContext } from 'react';
import { setUserCommentVoteHistory, setUserPostVoteHistory } from '../actions/reducerActions';
import reducer, { initialState } from '../reducers/appReducer';
import { fetchUserCommentVoteHistory, fetchUserPostVoteHistory } from '../services/apiFetches';
import { useActiveUser } from './AuthProvider';

const AppContext = React.createContext();

export default function AppProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const activeUser = useActiveUser()

    useEffect(() => {

        if (!activeUser) return;
        Promise.all([
            fetchUserPostVoteHistory(),
            fetchUserCommentVoteHistory()
        ])
            .then(([postHistory, commentHistory]) => {
                dispatch(setUserPostVoteHistory(postHistory))
                dispatch(setUserCommentVoteHistory(commentHistory))
            })

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
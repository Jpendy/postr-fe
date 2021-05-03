import React, { useReducer, useEffect, useContext } from 'react';
import reducer, { initialState } from '../reducers/appReducer';

const AppContext = React.createContext();

export default function AppProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

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
import { SET_BOARDS, SET_POSTS } from "../actions/reducerActions";

export const initialState = {
    boards: [],
    posts: [],
};

export default function reducer(state, action) {
    switch (action.type) {
        case SET_BOARDS: {
            return { ...state, boards: action.payload };
        }
        case SET_POSTS: {
            return { ...state, posts: action.payload };
        }

        default: return state;
    }
}

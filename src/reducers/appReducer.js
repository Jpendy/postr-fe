import { SET_BOARDS, SET_POSTS, SET_POST_DETAILS } from "../actions/reducerActions";

export const initialState = {
    boards: [],
    posts: [],
    postDetails: {}
};

export default function reducer(state, action) {
    switch (action.type) {
        case SET_BOARDS: {
            return { ...state, boards: action.payload };
        }
        case SET_POSTS: {
            return { ...state, posts: action.payload };
        }
        case SET_POST_DETAILS: {
            return { ...state, postDetails: action.payload }
        }
        default: return state;
    }
}

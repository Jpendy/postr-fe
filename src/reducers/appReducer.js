import { CREATE_COMMENT_REPLY, CREATE_POST, CREATE_POST_COMMENT, DELETE_POST, SET_BOARDS, SET_POSTS, SET_POST_DETAILS } from "../actions/reducerActions";

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
        case CREATE_POST: {
            return { ...state, posts: [action.payload, ...state.posts] }
        }
        case SET_POSTS: {
            return { ...state, posts: action.payload };
        }
        case DELETE_POST: {
            return { ...state, posts: state.posts.filter(post => post.id !== action.payload.id) }
        }
        case SET_POST_DETAILS: {
            return { ...state, postDetails: action.payload }
        }
        case CREATE_POST_COMMENT: {
            return {
                ...state,
                postDetails: {
                    ...state.postDetails,
                    comments: [action.payload, ...state.postDetails.comments]
                }
            }
        }
        case CREATE_COMMENT_REPLY: {
            return { ...state }
        }
        default: return state;
    }
}

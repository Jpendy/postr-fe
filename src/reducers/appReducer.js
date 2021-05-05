import { CREATE_COMMENT_REPLY, CREATE_NEW_VOTE_HISTORY, CREATE_POST, CREATE_POST_COMMENT, DELETE_POST, SET_BOARDS, SET_POSTS, SET_POST_DETAILS, SET_USER_POST_VOTE_HISTORY, UPDATE_POST, UPDATE_POST_VOTE, UPDATE_USER_POST_VOTE_HISTORY } from "../actions/reducerActions";

export const initialState = {
    boards: [],
    posts: [],
    postDetails: {},
    userPostVoteHistory: []
};

export default function reducer(state, action) {
    switch (action.type) {
        case SET_BOARDS: {
            return { ...state, boards: action.payload };
        }
        case CREATE_POST: {
            return { ...state, posts: [action.payload, ...state.posts] }
        }
        case UPDATE_POST_VOTE: {
            return {
                ...state, posts: state.posts.map(post => {
                    if (post.id === action.payload.id) return { ...post, voteScore: action.payload.voteScore }
                    return post;
                })
            }
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
        case SET_USER_POST_VOTE_HISTORY: {
            return { ...state, userPostVoteHistory: action.payload }
        }
        case CREATE_NEW_VOTE_HISTORY: {
            return { ...state, userPostVoteHistory: [...state.userPostVoteHistory, action.payload] }
        }
        case UPDATE_USER_POST_VOTE_HISTORY: {
            return {
                ...state, userPostVoteHistory: state.userPostVoteHistory.map(voteHistory => {
                    if (voteHistory.id === action.payload.id) return action.payload
                    return voteHistory;
                })
            }
        }
        default: return state;
    }
}

import { CREATE_BOARD, CREATE_NEW_COMMENT_VOTE_HISTORY, CREATE_NEW_POST_VOTE_HISTORY, CREATE_POST, CREATE_POST_COMMENT, DELETE_COMMENT, DELETE_POST, SET_BOARDS, SET_POSTS, SET_POST_DETAILS, SET_SINGLE_BOARD, SET_USER_COMMENT_VOTE_HISTORY, SET_USER_POST_VOTE_HISTORY, UPDATE_BOARD_POST_VOTE, UPDATE_COMMENT_VOTE, UPDATE_POST, UPDATE_POST_DETAIL_COMMENT_VOTE, UPDATE_POST_VOTE, UPDATE_USER_COMMENT_VOTE_HISTORY, UPDATE_USER_POST_VOTE_HISTORY } from "../actions/reducerActions";
import mapAndDeleteComment from "../utils/reducerHelperFns/mapAndDeleteComment";
import mapAndUpdateCommentScore from "../utils/reducerHelperFns/mapAndUpdateCommentScore";

export const initialState = {
    boards: [],
    posts: [],
    postDetails: {},
    board: {},
    userPostVoteHistory: [],
    userCommentVoteHistory: []
};

export default function reducer(state, action) {
    switch (action.type) {
        case SET_BOARDS: {
            return { ...state, boards: action.payload };
        }
        case CREATE_BOARD: {
            return { ...state, boards: [...state.boards, action.payload] }
        }
        case SET_SINGLE_BOARD: {
            return { ...state, board: action.payload }
        }
        case CREATE_POST: {
            return { ...state, posts: [action.payload, ...state.posts] }
        }
        case UPDATE_POST_VOTE: {
            return {
                ...state, posts: state.posts.map(post => {
                    if (+post.id === +action.payload.id) return { ...post, voteScore: +action.payload.voteScore }
                    return post;
                })
            }
        }
        case SET_POSTS: {
            return { ...state, posts: action.payload };
        }
        case DELETE_POST: {
            return { ...state, posts: state.posts.filter(post => +post.id !== +action.payload.id) }
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
        case CREATE_NEW_POST_VOTE_HISTORY: {
            return { ...state, userPostVoteHistory: [...state.userPostVoteHistory, action.payload] }
        }
        case UPDATE_USER_POST_VOTE_HISTORY: {
            return {
                ...state, userPostVoteHistory: state.userPostVoteHistory.map(voteHistory => {
                    if (+voteHistory.id === +action.payload.id) return action.payload
                    return voteHistory;
                })
            }
        }
        case SET_USER_COMMENT_VOTE_HISTORY: {
            return { ...state, userCommentVoteHistory: action.payload }
        }
        case CREATE_NEW_COMMENT_VOTE_HISTORY: {
            return { ...state, userCommentVoteHistory: [...state.userCommentVoteHistory, action.payload] }
        }
        case UPDATE_USER_COMMENT_VOTE_HISTORY: {
            return {
                ...state, userCommentVoteHistory: state.userCommentVoteHistory.map(voteHistory => {
                    if (+voteHistory.id === +action.payload.id) return action.payload
                    return voteHistory
                })
            }
        }
        case UPDATE_COMMENT_VOTE: {
            return { ...state, postDetails: mapAndUpdateCommentScore(state.postDetails, action.payload) }
        }
        case DELETE_COMMENT: {
            return { ...state, postDetails: mapAndDeleteComment(state.postDetails, action.payload) }
        }
        default: return state;
    }
}

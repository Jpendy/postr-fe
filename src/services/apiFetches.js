import { del, get, post, put } from "./request";

export const fetchUpdateUserDisplayName = body => put('/api/v1/users/update-display-name', body)
export const fetchUpdateUserInfo = (id, body) => put(`/api/v1/users/${id}`, body)

export const fetchAllBoards = () => get('/api/v1/boards')
export const fetchCreateBoard = body => post('/api/v1/boards', body)
export const fetchBoardByName = name => get(`/api/v1/boards/${name}`)

export const fetchAllPosts = ({ sort = 'top', page = "1" }) => get(`/api/v1/posts/?sort=${sort}&page=${page}`)
export const fetchPostDetails = id => get(`/api/v1/posts/${id}`)
export const fetchCreatePost = body => post('/api/v1/posts', body)
export const fetchDeletePost = id => del(`/api/v1/posts/${id}`)

export const fetchCreateComment = body => post('/api/v1/comments', body)
export const fetchDeleteComment = id => del(`/api/v1/comments/${id}`)
export const fetchAllUnreadReplies = () => get('/api/v1/comments/new-replies')

export const fetchUserPostVoteHistory = () => get('/api/v1/users/post-vote-history')
export const fetchUserCommentVoteHistory = () => get('/api/v1/users/comment-vote-history')

export const fetchVoteOnPost = (id, body) => post(`/api/v1/posts/vote/${id}`, body)
export const fetchVoteOnComment = (id, body) => post(`/api/v1/comments/vote/${id}`, body)

export const fetchUserAndUserPosts = id => get(`/api/v1/users/user-posts/${id}`)

export const fetchUploadPost = body => post('/api/v1/cloudinary', body)

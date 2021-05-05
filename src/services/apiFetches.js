import { del, get, post } from "./request";

export const fetchAllBoards = () => get('/api/v1/boards')
export const fetchCreateBoard = body => post('/api/v1/boards', body)
export const fetchBoardByName = name => get(`/api/v1/boards/${name}`)

export const fetchAllPosts = () => get('/api/v1/posts')
export const fetchPostDetails = id => get(`/api/v1/posts/${id}`)
export const fetchCreatePost = body => post('/api/v1/posts', body)
export const fetchDeletePost = id => del(`/api/v1/posts/${id}`)

export const fetchCreateComment = body => post('/api/v1/comments', body)
export const fetchDeleteComment = id => del(`/api/v1/comments/${id}`)

export const fetchUserPostVoteHistory = () => get('/api/v1/users/post-vote-history')
export const fetchVoteOnPost = (id, body) => post(`/api/v1/posts/vote/${id}`, body)

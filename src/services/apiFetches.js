import { del, get, post } from "./request";

export const fetchAllBoards = () => get('/api/v1/boards')

export const fetchAllPosts = () => get('/api/v1/posts')

export const fetchPostDetails = id => get(`/api/v1/posts/${id}`)

export const fetchCreatePost = body => post('/api/v1/posts', body)

export const fetchDeletePost = id => del(`/api/v1/posts/${id}`)
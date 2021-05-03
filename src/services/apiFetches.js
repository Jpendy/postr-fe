import { get } from "./request";

export const fetchAllBoards = () => get('/api/v1/boards')

export const fetchAllPosts = () => get('/api/v1/posts')
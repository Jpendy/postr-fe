export const SET_BOARDS = 'SET_BOARDS';
export const setBoards = boards => ({
    type: SET_BOARDS,
    payload: boards
})

export const SET_POSTS = 'SET_POSTS';
export const setPosts = posts => ({
    type: SET_POSTS,
    payload: posts
})

export const SET_POST_DETAILS = 'SET_POST_DETAILS';
export const setPostDetails = postDetails => ({
    type: SET_POST_DETAILS,
    payload: postDetails
})
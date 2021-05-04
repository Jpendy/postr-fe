export const SET_BOARDS = 'SET_BOARDS';
export const setBoards = boards => ({
    type: SET_BOARDS,
    payload: boards
})

export const CREATE_POST = 'CREATE_POST';
export const createPost = post => ({
    type: CREATE_POST,
    payload: post
})

export const SET_POSTS = 'SET_POSTS';
export const setPosts = posts => ({
    type: SET_POSTS,
    payload: posts
})

export const DELETE_POST = 'DELETE_POST';
export const deletePost = id => ({
    type: DELETE_POST,
    payload: id
})

export const SET_POST_DETAILS = 'SET_POST_DETAILS';
export const setPostDetails = post => ({
    type: SET_POST_DETAILS,
    payload: post
})

export const CREATE_POST_COMMENT = 'CREATE_POST_COMMENT';
export const createPostComment = comment => ({
    type: CREATE_POST_COMMENT,
    payload: comment
})

export const CREATE_COMMENT_REPLY = 'CREATE_COMMENT_REPLY';
export const createCommentReply = comment => ({
    type: CREATE_COMMENT_REPLY,
    payload: comment
})


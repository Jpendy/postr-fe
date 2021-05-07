export const SET_BOARDS = 'SET_BOARDS';
export const setBoards = boards => ({
    type: SET_BOARDS,
    payload: boards
})

export const CREATE_BOARD = 'CREATE_BOARD';
export const createBoard = payload => ({
    type: CREATE_BOARD,
    payload
})

export const SET_SINGLE_BOARD = 'SET_SINGLE_BOARD';
export const setSingleBoard = payload => ({
    type: SET_SINGLE_BOARD,
    payload
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

export const UPDATE_POST_VOTE = 'UPDATE_POST_VOTE';
export const updatePostVote = post => ({
    type: UPDATE_POST_VOTE,
    payload: post
})

export const CREATE_COMMENT_REPLY = 'CREATE_COMMENT_REPLY';
export const createCommentReply = comment => ({
    type: CREATE_COMMENT_REPLY,
    payload: comment
})

export const SET_USER_POST_VOTE_HISTORY = 'SET_USER_POST_VOTE_HISTORY';
export const setUserPostVoteHistory = payload => ({
    type: SET_USER_POST_VOTE_HISTORY,
    payload
})

export const CREATE_NEW_POST_VOTE_HISTORY = 'CREATE_NEW_POST_VOTE_HISTORY';
export const createNewPostVoteHistory = payload => ({
    type: CREATE_NEW_POST_VOTE_HISTORY,
    payload
})

export const UPDATE_USER_POST_VOTE_HISTORY = 'UPDATE_USER_POST_VOTE_HISTORY';
export const updatePostVoteHistory = payload => ({
    type: UPDATE_USER_POST_VOTE_HISTORY,
    payload
})

export const SET_USER_COMMENT_VOTE_HISTORY = 'SET_USER_COMMENT_VOTE_HISTORY';
export const setUserCommentVoteHistory = payload => ({
    type: SET_USER_COMMENT_VOTE_HISTORY,
    payload
})

export const CREATE_NEW_COMMENT_VOTE_HISTORY = 'CREATE_NEW_COMMENT_VOTE_HISTORY';
export const createNewCommentVoteHistory = payload => ({
    type: CREATE_NEW_COMMENT_VOTE_HISTORY,
    payload
})

export const UPDATE_USER_COMMENT_VOTE_HISTORY = 'UPDATE_USER_COMMENT_VOTE_HISTORY';
export const updateUserCommentVoteHistory = payload => ({
    type: UPDATE_USER_COMMENT_VOTE_HISTORY,
    payload
})

export const UPDATE_COMMENT_VOTE = 'UPDATE_COMMENT_VOTE';
export const updateCommentVote = payload => ({
    type: UPDATE_COMMENT_VOTE,
    payload
})

export const DELETE_COMMENT = 'DELETE_COMMENT';
export const deleteComment = payload => ({
    type: DELETE_COMMENT,
    payload
})
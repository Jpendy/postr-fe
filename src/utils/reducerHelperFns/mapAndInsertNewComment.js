
export default function mapAndInsertComment(post, id, insertObj) {
    if (post.comments?.length) {
        return {
            ...post,
            comments: recurse(post.comments, id, insertObj)
        }
    }
    else return post
}

function recurse(comments, insertObj = {}) {

    if (comments && comments?.length) return comments.map(comment => {

        if (+comment.id === +insertObj.parentCommentId) {
            return {
                ...comment,
                replies: comment.replies ? [insertObj, ...recurse(comment.replies)] : [insertObj]
            }
        }
        else return {
            ...comment,
            replies: recurse(comment.replies, insertObj)
        }
    })

    else return comments
}

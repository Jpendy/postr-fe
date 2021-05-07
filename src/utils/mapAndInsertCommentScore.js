
export default function mapAndUpdateCommentScore(post, insertObj) {
    if (post.comments.length > 0) {
        return {
            ...post,
            comments: recurse(post.comments, insertObj)
        }
    }
    else return post
}

function recurse(replies, insertObj = {}) {

    if (replies) return replies.map(comment => {

        if (comment.id === insertObj.id) {
            return {
                ...comment,
                voteScore: insertObj.score,
                replies: recurse(comment.replies)
            }
        }
        else return {
            ...comment,
            replies: recurse(comment.replies, insertObj)
        }
    })

    else return replies
}





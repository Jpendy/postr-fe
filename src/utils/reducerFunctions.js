
export const mapAndInsert = (post, id) => {
    if (post.comments.length > 0) {
        return {
            ...post,
            comments: recurse(post.comments, id)
        }
    }
    else return post

}

function recurse(comments, id = null) {

    if (comments.length > 0)

        return comments.map(comment => {

            if (comment.id === id) {
                return {
                    ...comment,
                    voteScore: comment.voteScore + 1,
                    comments: recurse(comment.comments)
                }
            }
            else return {
                ...comment,
                comments: recurse(comment.comments, id)
            }

        })

    else return comments
}





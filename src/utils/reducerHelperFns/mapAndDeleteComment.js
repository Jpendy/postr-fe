
export default function mapAndDeleteComment(post, id) {
    if (post.comments.length) {
        return {
            ...post,
            comments: recurse(post.comments, id)
        }
    }
    else return post

}

function recurse(comments, id = null) {

    if (comments.length) return comments.reduce((acc, comment) => {

        if (comment.id === id) return acc;
        if (!comment.replies?.length) acc.push(comment)

        else acc.push({
            ...comment,
            replies: recurse(comment.replies, id)
        })

        return acc;
    }, [])

    else return comments
}
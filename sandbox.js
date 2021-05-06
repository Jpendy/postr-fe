if (!parentCommentId) dispatch(updatePostDetailCommentVote(comment))
else fetchPostDetails(postDetails.id).then(post => dispatch(setPostDetails(post)))
import React, { useEffect } from 'react'
import PostList from '../../components/postList/PostList'
import CreatePost from '../../components/createPost/CreatePost'
import { useActiveUser } from '../../providers/AuthProvider'
import { useSelector } from '../../providers/AppProvider'
import { getUserPostVoteHistory } from '../../selectors/selectors'

export default function HomePage() {

    const activeUser = useActiveUser()



    return (
        <div  >
            {activeUser && <CreatePost />}
            <PostList />
        </div>
    )
}

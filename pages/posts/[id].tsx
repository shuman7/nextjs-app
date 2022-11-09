import { format } from 'date-fns';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr/immutable';
import { db } from '../../firebase/client';
import { useUser } from '../../lib/user';
import { Post } from '../../types/posts';
import { User } from '../../types/user';

const PostDetailPage = () => {
    const [post, setPost] = useState<Post>();
    const router = useRouter();
    const postId = router.query.id;
    const user = useUser(post?.authorId);

    useEffect(() => {
        const ref = doc((db), `posts/${postId}`)
        getDoc(ref).then(snap => {
            setPost(snap.data() as Post)
        })
    }, [postId])

    useEffect(() => {

    }, [post])

    if(!post) {
        return null;
    }

  return (
      <div className="container">
          <div className="aspect-video bg-slate-200 mb-4 rounded-md"></div>
          <h1 className="font-bold text-lg mb-6">{post.title}</h1>
          {user && (
              <div className="flex mb-4">
                    <div className="w-10 h-10 bg-slate-400 rounded-full mr-2"></div>
                    <div className="flex-1">
                        <p>{user.name}</p>
                        <p className="text-slate-500">
                            {format(post.createdAt, 'yyyy年MM月dd日')}
                        </p>
                    </div>
                </div>
          )}
          <p>{post.body}</p>
      </div>
  )
}

export default PostDetailPage
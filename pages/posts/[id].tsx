import { format } from 'date-fns';
import { doc, getDoc } from 'firebase/firestore';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr/immutable';
import { db } from '../../firebase/client';
import { adminDB } from '../../firebase/server';
import { useUser } from '../../lib/user';
import { Post } from '../../types/posts';
import { User } from '../../types/user';


/////////////////////////////////////// 
////////// ↓next.jsにおけるnode.jsの領域↓
// ストックを作るためにfirabaseからサーバーに持ってくる作業をするのが getStaticProps
export const getStaticProps: GetStaticProps<{
        post: Post;
    }> = async (context) => {
    const snap = await adminDB.doc(`posts/${context.params?.id}`).get() //このidはファイル名の[]内のテキストと同じ。[post].tsxであれば、ここはpostになる。
    const post = snap.data() as Post

    return {
        props: {
            post,
            // post: post これと上記はjs的には全く一緒
        },
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    // getStaticPathsはあらかじめ記事のidがわかっているものについては予め作るから教えてよという機能
    return {
        paths: [],
        //記事を生成している時のロード画面見せるか見せないかの設定 
        // やる場合はtrue / やらない場合はfalse / blokingは生成中何も表示させない。生成されたらページを表示する。実装コストが少ない。
        fallback: 'blocking', 
    }
}
////////// ↑next.jsにおけるnode.jsの領域↑
///////////////////////////////////////

const PostDetailPage = ({
    post,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const user = useUser(post?.authorId);

    if(!post) {
        return <p>記事が存在しません</p>;
    }

  return (
      <div className="container">
          <p>
              <Link href="/search">
                <a>Search</a>
              </Link>
          </p>
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
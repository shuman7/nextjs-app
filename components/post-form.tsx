import classNames from 'classnames';
import { collection, deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import Button from '../components/button';
import { useAuth } from '../context/auth';
import { auth, db } from '../firebase/client';
import { revalidate } from '../lib/revalidate';
import { Post } from '../types/posts';

const PostForm = ({isEditMode}: {
    isEditMode: boolean
}) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Post>();

    const {fbUser, isLoading} = useAuth();
    const router = useRouter();
    const editTargetId = router.query.id as string;
    
    useEffect(() => {
        if (editTargetId){
            const ref = doc(db, `posts/${editTargetId}`)
            getDoc(ref).then((snap) => {
                const oldPost = snap.data() as Post;
                reset(oldPost);
            })
        }
    }, [editTargetId])

    
    if (!fbUser){
        if(isLoading) {
            // router.push('/login');
        }
        return null;
    }

    const submit = (data: Post) => {
        
        const ref = isEditMode
         ? doc(db, `posts/${editTargetId}`) 
         : doc(collection(db, 'posts'))

        const post: Post = {
            id: isEditMode ? editTargetId : ref.id,
            title: data.title,
            body: data.body,
            createdAt: editTargetId ? data.createdAt : Date.now(),
            updatedAt: editTargetId ? Date.now() : null,
            authorId: fbUser.uid,
        }

        setDoc(ref, post).then(async () => {
            await revalidate('/')

            // fetchを行うと即席で秘密の合言葉的なのを生成する
            return revalidate(`/posts/${post.id}`)
                .then((res) => res.json()) //revalidateが成功したら成功した結果が、resに渡る。res.json()でjson形式にして中身を取り出せる。
                // res.json自体もpromisになっているため、時間がかかる。その取り出しが成功したら下記のthenが走るという世界観
                .then(() => {
                    alert(`記事を${isEditMode ? '更新' : '作成'}しました`)
                })
                .catch(e => {
                    console.log(e);
                    alert('ページ再生成が失敗しました')
                })
        });
    }

    const deletePost = () => {
        const ref = doc(db, `posts/${editTargetId}`)
        return deleteDoc(ref).then( async () => {
            alert('記事を削除しました');

            await revalidate('/')
            await revalidate(`/posts/${editTargetId}`)

            router.push('/');
        })
    }

  return (
    <div>
        <h1>記事{isEditMode ? '編集' : '投稿'}</h1>

        <form onSubmit={handleSubmit(submit)}>
            <div>
                <label className="block mb-0.5" htmlFor="name">
                    タイトル*
                </label>
                <input 
                    className={classNames(
                        'rouded border',
                        errors.title ? 'border-red-500' : 'border-slate-300' 
                    )}
                    autoComplete="name"
                    {...register('title',{
                        required: '必須入力です',
                        maxLength: {
                            value: 100,
                            message: '最大50文字です',
                        },
                    })} 
                    id="title" 
                    type="text" 
                />
                {errors.title && (
                    <p className="text-red-500 mt-0.5">{errors.title?.message}</p>
                )}
            </div>

            <div>
                <label className="block mb-0.5" htmlFor="name">
                    画像投稿*
                </label>
                <input 
                    className={classNames(
                        'rouded border',
                        errors.title ? 'border-red-500' : 'border-slate-300' 
                    )}
                    autoComplete="name"
                    {...register('title',{
                        required: '必須入力です',
                        maxLength: {
                            value: 100,
                            message: '最大50文字です',
                        },
                    })} 
                    id="main-img" 
                    type="text" 
                />
                {errors.title && (
                    <p className="text-red-500 mt-0.5">{errors.title?.message}</p>
                )}
            </div>

            <div>
                <label className="block mb-0.5" htmlFor="name">
                    本文*
                </label>
                <textarea 
                    className={classNames(
                        'rouded border',
                        errors.body ? 'border-red-500' : 'border-slate-300' 
                    )}
                    {...register('body',{
                        required: '必須入力です',
                        maxLength: {
                            value: 400,
                            message: '最大50文字です',
                        },
                    })} 
                    id="body" 
                />
                {errors.body && (
                    <p className="text-red-500 mt-0.5">{errors.body?.message}</p>
                )}
            </div>

                <Button>{isEditMode ? '更新' : '投稿'}</Button>
                
                {isEditMode && (
                    <button type="button" onClick={deletePost}>削除</button>
                )}
        </form>
    </div>
  )
}

export default PostForm
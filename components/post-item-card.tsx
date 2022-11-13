import { UserIcon } from "@heroicons/react/24/outline";
import { format, formatDistance } from "date-fns";
import Link from "next/link";
import { useUser } from "../lib/user";
import { Post } from "../types/posts";

const PostItemCard = ({post}:{
    post: Post
}) => {
    const user = useUser(post.authorId);

    return (
        <div className='rouded-md shadow p-4'>
            <h2 className="line-clamp-2">
                <Link href={`posts/${post.id}`}>
                    <a>{post.title}</a>
                </Link>
            </h2>
            {user && (
                <div className="flex items-center">
                    <div className="relative w-10 h-10 block rounded-full mr-2 bg-slate-200">
                    {/* <img src={user?.avatarURL} alt="" className='w-10 h-10 block rounded-full mr-2' /> */}
                    { user.avatarURL ? (
                        <img 
                                src={user?.avatarURL}
                                // className="w-full h-full object-cover block" 
                                className='w-10 h-10 block rounded-full mr-2'
                                alt="ユーザープロフィール画像"
                                />
                                ) : <UserIcon className="w-6 h-6 object-cover block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                            }
                    </div>
                    <div>
                        <p className="truncate">{user.name}</p>
                        <p className="text-slate-500 text-sm">
                            {format(post.createdAt, 'yyyy年MM月dd日')}
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PostItemCard;
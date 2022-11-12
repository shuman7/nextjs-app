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
                    <img src={user?.avatarURL} alt="" className='w-10 h-10 block rounded-full mr-2' />
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
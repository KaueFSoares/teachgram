import { Post } from "../../../interface/home/Post"
import { getTimeAgo } from "../../../util/getTimeAgo"

interface PostItemProps {
  post: Post
}

const PostItem = ({ post }: PostItemProps) => {
  return (
    <div className="w-full shadow-full p-4 rounded-lg flex flex-col gap-4">
      <header className="w-full flex gap-4">
        <div className="w-1/6 aspect-square overflow-hidden flex items-center justify-center rounded-full 
                        xl:w-[10%]">
          <img src={post.userPhotoLink} alt="" className="w-full" />
        </div>

        <div className="flex justify-between flex-grow text-gray">
          <div className="flex flex-col lg:gap-1">
            <h1 className="text-base">{post.username}</h1>
            <h2 className="text-sm">há {getTimeAgo(post.createdAt).value} {getTimeAgo(post.createdAt).unit}</h2>
          </div>

          <button className="h-full flex w-4 justify-end">
            <img src="/icon/options.svg" alt="" className="h-1/3" />
          </button>
        </div>
      </header>

      <main className="w-full flex flex-col gap-4">

        {post.description && (
          <p className="text-gray text-base">
            {post.description}
          </p>
        )}

        {post.photoLink && (
          <img src={post.photoLink} alt="" className="w-full rounded-xl" />
        )}

      </main>

      <footer className="w-full flex items-center text-gray text-sm">
        <button className="flex gap-4">
          <img src="/icon/outline_heart.svg" alt="" className="" />
          <p>{post.likes} curtidas</p>
        </button>
      </footer>
    </div>
  )
}

export default PostItem

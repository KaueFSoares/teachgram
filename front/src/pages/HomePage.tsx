import { useTranslation } from "react-i18next"
import Navbar from "../components/layout/navbar/Navbar.tsx"
import { Post } from "../interface/home/Post.ts"
import PostItem from "../components/layout/util/PostItem.tsx"

interface HomePageProps {
  posts: Post[]
  incrementPage: () => void
}

const HomePage = ({ posts, incrementPage }: HomePageProps) => {
  const { t } = useTranslation()
  
  return (
    <main className="relative w-full min-h-screen flex items-center justify-start flex-col">
      <div className="w-full flex flex-col h-full p-12 gap-8 mb-10">
        <img src="/images/full_logo.svg" alt="" className="w-2/3 mb-4" />
        {posts.length > 0 ? (
          <>
            {posts.map((post) => (
              
              <PostItem  key={post.id} post={post} />

            ))}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-gray-800">
              Nenhum post encontrado
            </h1>
          </div>
        )}

        {/* remove */}
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={incrementPage}
        >
          {t("Carregar mais")}
        </button>
      </div>
      <Navbar />
    </main>
  )
}

export default HomePage

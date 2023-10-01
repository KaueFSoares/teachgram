import { useTranslation } from "react-i18next"
import { useEffect } from "react"
import Navbar from "../components/layout/navbar/Navbar.tsx"
import { Post } from "../interface/home/Post.ts"
import PostItem from "../components/layout/util/PostItem.tsx"
import Button from "../components/layout/form/Button.tsx"

interface HomePageProps {
  posts: Post[]
  incrementPage: () => void
}


const HomePage = ({ posts, incrementPage }: HomePageProps) => {
  const { t } = useTranslation()


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          console.log("intersecting")
          incrementPage()
        }
      },
      { threshold: 1 },
    )

    observer.observe(document.querySelector("#load-more") as Element)
    

    return () => observer.disconnect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [  ])
  
  return (
    <main className="relative w-full min-h-screen flex items-center justify-start flex-col">
      <div className="w-full flex flex-col h-full p-12 gap-4 mb-12">
        <img src="/images/full_logo.svg" alt="" className="w-2/3 mb-6" />
        {posts.length > 0 ? (
          <>
            {posts.map((post) => (
              
              <PostItem  key={post.id} post={post} />

            ))}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-gray-800">
              {t("noposts")}
            </h1>
          </div>
        )}

        <div id="load-more" className="w-10 h-4"></div>

        <Button 
          text="Voltar ao topo"
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />
      </div>
      <Navbar />
    </main>
  )
}

export default HomePage

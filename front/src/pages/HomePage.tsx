import Navbar from "../components/layout/navbar/Navbar.tsx"

interface Props {
  imgSrc: string
}

const HomePage = ({ imgSrc }: Props) => {
  return (
    <main className="relative w-full h-screen">
      Home page
      <Navbar 
        imgSrc={imgSrc}
      />
    </main>
  )
}

export default HomePage

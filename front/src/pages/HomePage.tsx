import { useTranslation } from "react-i18next"
import Navbar from "../components/layout/navbar/Navbar.tsx"

const HomePage = () => {
  const { t } = useTranslation()
  
  return (
    <main className="relative w-full h-screen flex items-center justify-center">
      {t("homepage.test")}
      <Navbar />
    </main>
  )
}

export default HomePage

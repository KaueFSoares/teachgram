import { useTranslation } from "react-i18next"

const Loading = () => {
  const { t } = useTranslation()

  return (
    <main className="bg-orange w-full h-screen flex items-center justify-center flex-col gap-8 absolute top-0 left-0">
      <img src="/images/short_logo.svg" alt="" className="drop-shadow-md" />
      <p className="text-white font-bold text-xl">
        {t("loading")}
      </p>
    </main>
  )
}

export default Loading

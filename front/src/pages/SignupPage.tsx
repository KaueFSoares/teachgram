import { Dispatch, FormEvent, SetStateAction } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import Button from "../components/layout/form/Button.tsx"
import Input from "../components/layout/form/Input.tsx"

interface SignupPageProps {
  name: string
  email: string
  bio: string
  phone: string
  password: string
  photo: string
  setName: Dispatch<SetStateAction<string>>
  setEmail: Dispatch<SetStateAction<string>>
  setBio: Dispatch<SetStateAction<string>>
  setPhone: Dispatch<SetStateAction<string>>
  setPassword: Dispatch<SetStateAction<string>>
  setPhoto: Dispatch<SetStateAction<string>>
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
}

const SignupPage = ({ 
  name, email, bio, phone, password, photo,
  setName, setEmail, setBio, setPhone, setPassword, setPhoto, 
  handleSubmit, 
}: SignupPageProps) => {
  const { t } = useTranslation()

  return (
    <main 
      className="w-full max-w-full min-h-screen flex justify-between"
    >
      <div
        className="flex-grow h-full min-h-screen flex flex-col items-center justify-center text-black
                  "
      >
        <div className="h-full w-full flex flex-col p-12 items-start justify-start gap-8 text-black
                        lg:w-2/3 lg:gap-6 lg:pt-0 lg:px-6 lg:pb-6  lg:overflow-auto lg:max-h-[calc(100vh-6rem)]
                          xl:w-1/2
                          2xl:w-1/3">
          <img
            src="/images/full_logo.svg"
            alt="Teachgram"
            className="self-center mb-4"
          />

          <h2 className="font-semibold text-xl
                            lg:text-lg">
            {t("signup.createaccount")}
          </h2>

          <form
            action=""
            className="w-full flex flex-col gap-4
                          lg:gap-4"
            onSubmit={handleSubmit}
          >
            <Input
              name={t("signup.input.label.name")}
              type="text"
              placeholder={t("signup.input.placeholder.name")}
              state={name}
              setState={setName}
            />

            <Input
              name={t("signup.input.label.email")}
              type="email"
              placeholder={t("signup.input.placeholder.email")}
              state={email}
              setState={setEmail}
            />

            <Input
              name={t("signup.input.label.username")}
              type="text"
              placeholder={t("signup.input.placeholder.username")}
              state={bio}
              setState={setBio}
            />

            <Input
              name={t("signup.input.label.bio")}
              type="text"
              placeholder={t("signup.input.placeholder.bio")}
              state={phone}
              setState={setPhone}
            />

            <Input
              name={t("signup.input.label.phone")}
              type="text"
              placeholder={t("signup.input.placeholder.phone")}
              state={photo}
              setState={setPhoto}
            />

            <Input
              name={t("signup.input.label.password")}
              type="password"
              placeholder={t("signup.input.placeholder.password")} 
              className="mb-8"
              state={password}
              setState={setPassword}
            />


            <Button
              text={t("signup.next")}
            />

          </form>

          <Link
            to={"/login"}
            className="w-full flex justify-center gap-2 text-sm"
          >
            <p>
              {t("signup.alreadyhaveaccount")}
            </p>

            <p
              role="button"
              className="underline text-orange font-bold"
            >
              {t("signup.login")}
            </p>
          </Link>
        </div>
      </div>
      <div
        className="hidden h-full justify-end
                      lg:flex "
      >
        <img
          src="/images/login_background.jpg"
          alt="Image"
          className="h-full max-h-screen"
        />
      </div>
    </main>
  )
}


export default SignupPage

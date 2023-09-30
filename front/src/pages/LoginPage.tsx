import { Dispatch, SetStateAction, useState } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import Button from "../components/layout/form/Button.tsx"
import Input from "../components/layout/form/Input.tsx"
import { emailValidation, emptyValidation } from "../service/validation.service.ts"
import Message from "../components/layout/form/Message.tsx"

interface LoginPageProps {
  email: string
  password: string
  setEmail: Dispatch<SetStateAction<string>>
  setPassword: Dispatch<SetStateAction<string>>
  handleSubmit: () => void
}

const LoginPage = ({ email, password, setEmail, setPassword, handleSubmit }: LoginPageProps) => {
  const { t } = useTranslation()

  const [ showEmptyMessage, setShowEmptyMessage ] = useState(false)
  const [ showEmailMessage, setShowEmailMessage ] = useState(false)

  const toogleShowMessage = (set: Dispatch<SetStateAction<boolean>>) => {
    set(true)

    setTimeout(() => {
      set(false)
    }, 5000)
  }

  const itemsList = emptyValidation([
    {
      flag: true,
      item:{
        tag: "email",
        value: email,
      },
    },
    {
      flag: true,
      item:{
        tag: "password",
        value: password,
      },
    },
  ])

  const makeEmptyValidation = () => {
    emptyValidation(itemsList)

    let valid = true

    for (const i of itemsList) {
      if(!i.flag){
        valid = false
      }
    }

    return valid
  }

  const makeEmailValidation = () => {
    emailValidation(itemsList)

    let valid = true

    for (const i of itemsList) {
      if(!i.flag){
        valid = false
      }
    }

    return valid
  }
  
  return (
    <main 
      className="w-full max-w-full min-h-screen flex justify-between"
    >
      <div
        className="flex-grow h-full min-h-screen flex flex-col items-center justify-center text-black
                  "
      >
        <div className="h-full flex w-full flex-col p-12 items-start justify-start gap-8 text-black
                        lg:w-2/3 lg:gap-6 lg:pt-0 lg:px-6 lg:pb-6  lg:overflow-auto lg:max-h-[calc(100vh-6rem)]
                        xl:w-1/2
                        2xl:w-1/3">
          <img 
            src="/images/full_logo.svg" 
            alt="Teachgram"
            className="self-center mb-4 flex"
          />

          <h2 className="font-semibold text-xl
                          lg:text-lg">
            {t("login.makelogin")}
          </h2>

          <form 
            action=""
            className="w-full flex flex-col gap-4
                        lg:gap-2"
          >
            <Input 
              name={t("login.input.label.email")} 
              type="email" 
              placeholder={t("login.input.placeholder.email")}
              className={`${((showEmptyMessage && !itemsList[0].flag)) ? "border-orange" : ""}
                            ${((showEmailMessage && itemsList[0].flag)) ? "border-orange" : ""}`}
              state={email}
              setState={setEmail}
            />

            <Input 
              name={t("login.input.label.password")} 
              type="password" 
              placeholder={t("login.input.placeholder.password")}
              state={password}
              setState={setPassword}
              className={`${((showEmptyMessage && !itemsList[1].flag)) ? "border-orange" : ""}`}
            />

            <div 
              className="flex justify-between text-sm text-black/70 mb-4
                          lg:mb-4"
            >
              <div 
                className="flex gap-2 relative items-center"
              >
                <input 
                  type="checkbox" 
                  name="remember_password" 
                  id="remember_password"
                  className="accent-orange outline-none h-4 w-4" 
                />
                <label htmlFor="remember_password" className="absolute h-4 w-4 border-orange border-solid border rounded-[.250rem] cursor-pointer"></label>
                <label htmlFor="remember_password" className=" cursor-pointer">
                  {t("login.remember")}
                </label>
              </div>

              <p 
                role="button"
                className="underline"
              > 
                {t("login.forgotpassword")}
              </p>
            </div>

            {showEmptyMessage && <Message text={t("validation.empty")} />}
            {showEmailMessage && <Message text={t("validation.email")} />}

            <Button
              type="button"
              onClick={() => {
                if (makeEmptyValidation()) {
                  if (makeEmailValidation()) {
                    handleSubmit()
                  } else {
                    toogleShowMessage(setShowEmailMessage)
                  }
                } else {
                  toogleShowMessage(setShowEmptyMessage)
                }
              }}
              text={t("login.enter")}
            />

          </form>

          <Link
            to={"/signup"}
            className="w-full flex justify-center gap-2 text-sm"
          >
            <p>
              {t("login.donthaveaccount")}
            </p>

            <p 
              role="button"
              className="underline text-orange font-bold"
            >
              {t("login.signup")}
            </p>
          </Link>

          <div
            className="w-full flex justify-around items-center text-gray"
          >
            <hr className="flex-grow"/>

            <p 
              className="flex-grow whitespace-nowrap text-center text-sm px-4"
            >
              {t("login.enterwith")}
            </p>

            <hr className="flex-grow"/>
          </div>

          <button 
            type="button"
            className="w-full flex gap-6 shadow-full py-4 justify-center rounded-lg text-gray"
          >
            <img src="/icon/google_icon.svg" alt="Google" />
            <p>{t("login.enterwith")}{t("login.google")}</p>
          </button>

          <button 
            type="button"
            className="w-full flex gap-6 shadow-full py-4 justify-center rounded-lg text-gray"
          >
            <img src="/icon/apple_icon.svg" alt="Apple" />
            <p>{t("login.enterwith")}{t("login.apple")}</p>
          </button>
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

export default LoginPage

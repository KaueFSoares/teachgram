import { Dispatch, SetStateAction, useState } from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import Button from "../components/layout/form/Button.tsx"
import Input from "../components/layout/form/Input.tsx"
import LinkModal from "../components/layout/form/LinkModal.tsx"
import { emailValidation, emptyValidation, phoneValidation } from "../service/validation.service.ts"
import Message from "../components/layout/form/Message.tsx"

interface SignupPageProps {
  name: string
  email: string
  username: string
  bio: string
  phone: string
  password: string
  photo: string
  setName: Dispatch<SetStateAction<string>>
  setEmail: Dispatch<SetStateAction<string>>
  setUsername: Dispatch<SetStateAction<string>>
  setBio: Dispatch<SetStateAction<string>>
  setPhone: Dispatch<SetStateAction<string>>
  setPassword: Dispatch<SetStateAction<string>>
  setPhoto: Dispatch<SetStateAction<string>>
  handleSubmit: () => void
}

const SignupPage = ({ 
  name, email, username, bio, phone, password, photo, 
  setName, setEmail, setUsername, setBio, setPhone, setPassword, setPhoto, 
  handleSubmit, 
}: SignupPageProps) => {
  const { t } = useTranslation()

  const [ showModal, setShowModal ] = useState(false)
  const [ showEmptyMessage, setShowEmptyMessage ] = useState(false)
  const [ showEmailMessage, setShowEmailMessage ] = useState(false)
  const [ showPhoneMessage, setShowPhoneMessage ] = useState(false)

  const toogleShowMessage = (set: Dispatch<SetStateAction<boolean>>) => {
    set(true)

    setTimeout(() => {
      set(false)
    }, 5000)
  }

  const itemsList = emptyValidation([
    {
      flag: true,
      item: {
        tag: "name",
        value: name,
      },
    },
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
        tag: "username",
        value: username,
      },
    },
    {
      flag: true,
      item:{
        tag: "description",
        value: bio,
      },
    },
    {
      flag: true,
      item:{
        tag: "phone",
        value: phone,
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

  const makePhoneValidation = () => {
    phoneValidation(itemsList)

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
        <div className={`relative h-full w-full flex flex-col p-12 items-center justify-start gap-8 text-black
                        lg:w-2/3 lg:gap-6 lg:pt-0 lg:px-6 lg:pb-6   lg:max-h-[calc(100vh-6rem)]
                        xl:w-1/2
                        ${showModal ? "overflow-hidden h-screen" : "lg:overflow-auto"}`}>
          

          { showModal ? (
            <LinkModal
              onClose={() => setShowModal(false)}
              onSubmit={handleSubmit}
              setState={setPhoto}
              state={photo}
            />
          ) : (
            <>
              <img
                src="/images/full_logo.svg"
                alt="Teachgram"
                className="self-center mb-4"
              />

              <h2 className="font-semibold text-xl w-full
                            lg:text-lg">
                {t("signup.createaccount")}
              </h2>

              <form
                action=""
                className="w-full flex flex-col gap-4
                          lg:gap-4"
              >
                <Input
                  name={t("signup.input.label.name")}
                  type="text"
                  placeholder={t("signup.input.placeholder.name")}
                  state={name}
                  setState={setName}
                  className={(showEmptyMessage && !itemsList[0].flag) ? "border-orange text-orange placeholder:text-orange" : ""}
                />

                <Input
                  name={t("signup.input.label.email")}
                  type="email"
                  placeholder={t("signup.input.placeholder.email")}
                  state={email}
                  setState={setEmail}
                  className={`${((showEmptyMessage && !itemsList[1].flag)) ? "border-orange text-orange placeholder:text-orange" : ""}
                                ${((showEmailMessage && itemsList[1].flag)) ? "border-orange text-orange placeholder:text-orange" : ""}`}
                />

                <Input
                  name={t("signup.input.label.username")}
                  type="text"
                  placeholder={t("signup.input.placeholder.username")}
                  state={username}
                  setState={setUsername}
                  className={(showEmptyMessage && !itemsList[2].flag) ? "border-orange text-orange placeholder:text-orange" : ""}
                />

                <Input
                  name={t("signup.input.label.bio")}
                  type="text"
                  placeholder={t("signup.input.placeholder.bio")}
                  state={bio}
                  setState={setBio}
                  className={(showEmptyMessage && !itemsList[3].flag) ? "border-orange text-orange placeholder:text-orange" : ""}
                />

                <Input
                  name={t("signup.input.label.phone")}
                  type="text"
                  placeholder={t("signup.input.placeholder.phone")}
                  state={phone}
                  maxLength={16}
                  setState={setPhone}
                  className={`${((showEmptyMessage && !itemsList[4].flag)) ? "border-orange text-orange placeholder:text-orange" : ""}
                                ${((showPhoneMessage && itemsList[4].flag)) ? "border-orange text-orange placeholder:text-orange" : ""}`}
                />

                <Input
                  name={t("signup.input.label.password")}
                  type="password"
                  placeholder={t("signup.input.placeholder.password")} 
                  className={`mb-4 ${(showEmptyMessage && !itemsList[5].flag) ? "border-orange text-orange placeholder:text-orange" : ""}`}
                  state={password}
                  setState={setPassword}
                />

                {showEmptyMessage && <Message text={t("validation.empty")} />}
                {showEmailMessage && <Message text={t("validation.email")} />}
                {showPhoneMessage && <Message text={t("validation.phone")} />}

                <Button
                  onClick={() => {
                    if(makeEmptyValidation()){
                      if (makeEmailValidation()) {
                        if(makePhoneValidation()){
                          setShowModal(true)
                        } else {
                          toogleShowMessage(setShowPhoneMessage)
                        }
                      } else {
                        toogleShowMessage(setShowEmailMessage)
                      }
                    } else {
                      toogleShowMessage(setShowEmptyMessage)
                    }
                  }}
                  type="button"
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
            </>
          )}
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

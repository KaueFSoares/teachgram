import { Dispatch, SetStateAction } from "react"
import Button from "../components/layout/form/Button.tsx"
import Input from "../components/layout/form/Input.tsx"

interface SignupPageProps {
  name: string
  email: string
  bio: string
  phone: string
  password: string
  setName: Dispatch<SetStateAction<string>>
  setEmail: Dispatch<SetStateAction<string>>
  setBio: Dispatch<SetStateAction<string>>
  setPhone: Dispatch<SetStateAction<string>>
  setPassword: Dispatch<SetStateAction<string>>
}

const SignupPage = ({ name, email, bio, phone, password, setName, setEmail, setBio, setPhone, setPassword }: SignupPageProps) => {
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
            Crie sua conta
          </h2>

          <form
            action=""
            className="w-full flex flex-col gap-4
                          lg:gap-4"
          >
            <Input
              name="Nome"
              type="text"
              placeholder="Digite seu nome"
              state={name}
              setState={setName}
            />

            <Input
              name="E-mail"
              type="email"
              placeholder="Digite seu e-mail"
              state={email}
              setState={setEmail}
            />

            <Input
              name="Descrição"
              type="text"
              placeholder="Faça uma descrição"
              state={bio}
              setState={setBio}
            />

            <Input
              name="Celular"
              type="text"
              placeholder="Digite seu número de celular"
              state={phone}
              setState={setPhone}
            />

            <Input
              name="Senha"
              type="password"
              placeholder="Digite sua senha"
              className="mb-8"
              state={password}
              setState={setPassword}
            />

            <Button
              text="Entrar"
            />

          </form>

          <div
            className="w-full flex justify-center gap-2 text-sm"
          >
            <p>
              Já possui conta?
            </p>

            <p
              role="button"
              className="underline text-orange font-bold"
            >
              Entrar
            </p>
          </div>
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

import { Dispatch, FormEvent, SetStateAction } from "react"
import { Link } from "react-router-dom"
import Button from "../components/layout/form/Button.tsx"
import Input from "../components/layout/form/Input.tsx"

interface LoginPageProps {
  email: string
  password: string
  setEmail: Dispatch<SetStateAction<string>>
  setPassword: Dispatch<SetStateAction<string>>
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
}

const LoginPage = ({ email, password, setEmail, setPassword, handleSubmit }: LoginPageProps) => {
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
            Faça seu login
          </h2>

          <form 
            action=""
            className="w-full flex flex-col gap-4
                        lg:gap-2"
            onSubmit={handleSubmit}
          >
            <Input 
              name="E-mail" 
              type="email" 
              placeholder="Digite seu e-mail" 
              className="mb-2"
              state={email}
              setState={setEmail}
            />

            <Input 
              name="Senha" 
              type="password" 
              placeholder="Digite sua senha" 
              state={password}
              setState={setPassword}
            />

            <div 
              className="flex justify-between text-sm text-black/70 mb-12
                          lg:mb-8"
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
                <label htmlFor="remember_password" className=" cursor-pointer">Lembrar senha</label>
              </div>

              <p 
                role="button"
                className="underline"
              > 
                Esqueci minha senha 
              </p>
            </div>

            <Button
              text="Entrar"
            />

          </form>

          <Link
            to={"/signup"}
            className="w-full flex justify-center gap-2 text-sm"
          >
            <p>
            Não possui uma conta?
            </p>

            <p 
              role="button"
              className="underline text-orange font-bold"
            >
          Cadastre-se
            </p>
          </Link>

          <div
            className="w-full flex justify-around items-center text-gray"
          >
            <hr className="flex-grow"/>

            <p 
              className="flex-grow whitespace-nowrap text-center text-sm px-4"
            >
          Entrar com
            </p>

            <hr className="flex-grow"/>
          </div>

          <button 
            type="button"
            className="w-full flex gap-6 shadow-full py-4 justify-center rounded-lg text-gray"
          >
            <img src="/icon/google_icon.svg" alt="Google" />
            <p>Entrar com Google</p>
          </button>

          <button 
            type="button"
            className="w-full flex gap-6 shadow-full py-4 justify-center rounded-lg text-gray"
          >
            <img src="/icon/apple_icon.svg" alt="Apple" />
            <p>Entrar com Apple</p>
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

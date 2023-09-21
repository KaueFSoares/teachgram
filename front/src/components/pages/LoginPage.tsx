import Button from "../layout/form/Button.tsx"
import Input from "../layout/form/Input.tsx"

const LoginPage = () => {
  return (
    <main 
      className="w-full h-screen flex flex-col p-12 items-start justify-start gap-8 text-black"
    >
      <img 
        src="/images/full_logo.svg" 
        alt="Teachgram"
        className="self-center mb-4"
      />

      <h2 className="font-semibold text-xl">
        Faça seu login
      </h2>

      <form 
        action=""
        className="w-full flex flex-col gap-4"
      >
        <Input 
          name="E-mail" 
          type="email" 
          placeholder="Digite seu e-mail" 
          className="mb-2"
        />

        <Input 
          name="Senha" 
          type="password" 
          placeholder="Digite sua senha" 
        />

        <div 
          className="flex justify-between text-sm text-black/70 mb-12"
        >
          <div 
            className="flex gap-2"
          >
            <input 
              type="checkbox" 
              name="remember_password" 
              id="remember_password"
              className="accent-orange outline-none" 
            />
            <label htmlFor="remember_password">Lembrar senha</label>
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

      <div
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
      </div>

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
        className="w-full flex gap-6 shadow-xl py-4 justify-center rounded-lg text-gray"
      >
        <img src="/icon/google_icon.svg" alt="Google" />
        <p>Entrar com Google</p>
      </button>

      <button 
        type="button"
        className="w-full flex gap-6 shadow-xl py-4 justify-center rounded-lg text-gray"
      >
        <img src="/icon/apple_icon.svg" alt="Apple" />
        <p>Entrar com Apple</p>
      </button>
    </main>
  )
}

export default LoginPage

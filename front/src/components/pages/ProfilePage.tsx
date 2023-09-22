import Button from "../layout/form/Button.tsx"
import Input from "../layout/form/Input.tsx"

const ProfilePage = () => {
  return (
    <main 
      className="w-full min-h-screen flex justify-between"
    >
      <div
        className="flex-grow h-full min-h-screen flex flex-col items-center justify-center text-black
                  "
      >
        <div className="h-full flex flex-col p-12 items-start justify-center gap-8 text-black
                        lg:w-2/3 lg:gap-6 lg:p-6
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
                        lg:gap-2"
          >
            <Input 
              name="Nome" 
              type="text" 
              placeholder="Digite seu nome" 
            />

            <Input 
              name="E-mail" 
              type="email" 
              placeholder="Digite seu e-mail" 
            />

            <Input 
              name="Descrição" 
              type="text" 
              placeholder="Faça uma descrição" 
            />

            <Input 
              name="Celular" 
              type="text" 
              placeholder="Digite seu número de celular" 
            />

            <Input 
              name="Senha" 
              type="password" 
              placeholder="Digite sua senha" 
              className="mb-8"
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

export default ProfilePage

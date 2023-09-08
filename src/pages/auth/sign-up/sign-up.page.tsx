import { useState } from 'react'
import { Loader, Loader2 } from 'lucide-react'

import { cn } from '@/lib/utils'
import Icon from '@/components/ui/icon'
import Logo from '@/components/shared/logo'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

const SignUpPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <>
      <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Logo />
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Crea una cuenta
              </h1>
              <p className="text-sm text-muted-foreground">
                Ingresar un correo para crear una cuenta
              </p>
            </div>
            <div className={cn('grid gap-6')}>
              <form onSubmit={onSubmit}>
                <div className="grid gap-2">
                  <div className="grid gap-1">
                    <Label className="sr-only" htmlFor="name">
                      Nombre
                    </Label>
                    <Input
                      id="name"
                      placeholder="Ingresa tu nombre"
                      autoComplete="username"
                      autoCapitalize="none"
                      autoCorrect="off"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="grid gap-1">
                    <Label className="sr-only" htmlFor="email">
                      Correo
                    </Label>
                    <Input
                      id="email"
                      placeholder="name@example.com"
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="grid gap-1">
                    <Label className="sr-only" htmlFor="password">
                      Contraseña
                    </Label>
                    <Input
                      id="password"
                      placeholder="*******"
                      type="password"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      disabled={isLoading}
                    />
                  </div>

                  <Link
                    to="/auth/sign-in"
                    className="hover:underline underline-offset-4 hover:text-primary text-sm ml-auto py-4 text-muted-foreground"
                  >
                    Ya tengo una cuenta
                  </Link>

                  <Button disabled={isLoading}>
                    {isLoading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Ingresar con correo
                  </Button>
                </div>
              </form>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    o continuar con
                  </span>
                </div>
              </div>
              <Button variant="outline" type="button" disabled={isLoading}>
                {isLoading ? (
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Icon name="google" className="mr-2 h-4 w-4" />
                )}
                Google
              </Button>
            </div>
            <p className="px-8 text-center text-sm text-muted-foreground">
              Al hacer clic en Continuar, aceptas nuestros{' '}
              <a
                href="#"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terminos de servicio
              </a>{' '}
              y{' '}
              <a
                href="#"
                className="underline underline-offset-4 hover:text-primary"
              >
                Politicas de privacidad
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUpPage

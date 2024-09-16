import { Helmet } from 'react-helmet-async'
import { useNavigate, useRouteError } from 'react-router-dom'

import { Button } from '@/components/ui/button'

// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
export const Error = () => {
  const navigate = useNavigate()
  const error = useRouteError() as Error

  return (
    <>
      <Helmet title={`Error: ${error?.message} || Error`} />
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="mx-auto max-w-screen-xl px-4 py-8 max-md:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-md text-center">
            <h1 className="mb-2 w-full text-5xl font-extrabold tracking-tight text-muted-foreground max-lg:text-7xl">
              Whoops!Algo deu errado...
            </h1>
            <p className="tracking-tigh mb-8 text-lg font-bold text-muted-foreground dark:text-white max-lg:text-4xl">
              Um erro inesperado ocorreu. Mais informações abaixo.
            </p>
            <pre className="mb-8 text-sm font-bold text-muted-foreground text-white">
              {error?.message || JSON.stringify(error)}
            </pre>
            <Button onClick={() => navigate('/')}>
              Volte para o Dashboard
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

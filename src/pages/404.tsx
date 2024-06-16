import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'

export const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="mx-auto max-w-screen-xl px-4 py-8 max-md:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-muted-foreground max-lg:text-7xl">
            Whoops!404
          </h1>
          <p className="tracking-tigh mb-4 text-lg font-bold text-muted-foreground dark:text-white max-lg:text-4xl">
            Página não encontrada.
          </p>
          <Button onClick={() => navigate('/')}>Volte para o Dashboard</Button>
        </div>
      </div>
    </div>
  )
}

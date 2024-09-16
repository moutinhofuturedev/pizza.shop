import { env } from '@/env'
import { setupWorker } from 'msw/browser'
import { signInMock } from './sign-in-mock'

export const worker = setupWorker(signInMock)

export const enabledWorker = async () => {
  if (env.MODE !== 'test') {
    return
  }

  await worker.start()
}

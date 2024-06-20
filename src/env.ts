import zod from 'zod'

export const envSchema = zod.object({
  VITE_BASE_URL: zod.string().url(),
})

export const env = envSchema.parse(import.meta.env)

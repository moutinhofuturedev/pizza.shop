import zod from 'zod'

export const envSchema = zod.object({
  VITE_BASE_URL: zod.string().url(),
  VITE_ENABLE_DELAY_API: zod.string().transform((value) => value === 'true'),
})

export const env = envSchema.parse(import.meta.env)

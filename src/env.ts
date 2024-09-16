import zod from 'zod'

export const envSchema = zod.object({
  VITE_BASE_URL: zod.string(),
  VITE_ENABLE_DELAY_API: zod.string().transform((value) => value === 'true'),
  MODE: zod.enum(['production', 'development', 'test']),
})

export const env = envSchema.parse(import.meta.env)

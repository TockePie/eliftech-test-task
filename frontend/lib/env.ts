import { z } from 'zod/mini'

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.url({
    message: 'NEXT_PUBLIC_API_URL must be a valid URL pointing to the API.'
  })
})

const parsed = envSchema.safeParse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL
})

if (!parsed.success) {
  throw new Error(
    `Invalid environment variables. Reason: ${JSON.stringify(z.treeifyError(parsed.error), null, 2)}`
  )
}

export const env = parsed.data

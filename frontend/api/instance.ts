import ky from 'ky'

import { env } from '@/lib/env'

export const api = ky.create({
  prefix: env.NEXT_PUBLIC_API_URL
})

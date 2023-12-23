import { z } from 'zod'

export const postsCreateSchema = z.object({
  title: z.string().min(10).max(100),
  body: z.string().min(10).max(500),
  like: z.boolean().optional(),
})

export const postsUpdateSchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string().min(10).max(100),
  body: z.string().min(10).max(500),
  like: z.boolean().optional(),
})

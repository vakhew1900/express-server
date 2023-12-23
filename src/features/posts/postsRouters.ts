import { Router } from 'express'
import db from '@/db'
import { querySchema } from '@/lib/genericValidators'
import { verifyToken } from '@/lib/auth'
import { postsCreateSchema, postsUpdateSchema } from './postsValidators'
import createHttpError from 'http-errors'

const postsRouter = Router()

postsRouter.get('/', verifyToken, async (req, res) => {
  const userId = req.body.user?.id
  const { limit, offset } = await querySchema.parseAsync(req.query)
  const posts = await db.post.findMany({
    take: limit,
    skip: offset,
    where: {
      userId,
    },

    orderBy: [
      {
        createdAt: 'asc',
      },
    ],
  })
  res.json(posts)
})

postsRouter.post('/', verifyToken, async (req, res) => {
  const userId = req.body.user?.id
  console.log(req.body.post)
  const { body, title, like } = await postsCreateSchema.parseAsync(
    req.body.post,
  )
  console.log(body)
  const post = await db.post.create({
    data: {
      body,
      title,
      like,
      userId,
    },
  })
  res.json(post)
})

postsRouter.put('/', verifyToken, async (req, res) => {
  const expectedUserId = req.body.user?.id
  const { id, userId, body, title, like } = await postsUpdateSchema.parseAsync(
    req.body.post,
  )

  if (expectedUserId !== userId) {
    throw new createHttpError.Forbidden()
  }

  console.log('update processing...')
  console.log(req.body.post)

  const post = await db.post.update({
    where: {
      id,
    },
    data: {
      id,
      title,
      body,
      like,
      userId,
    },
  })
  console.log(JSON.stringify(post))
  res.json(post)
})

export default postsRouter

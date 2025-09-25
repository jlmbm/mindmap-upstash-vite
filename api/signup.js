import { upstashGet, upstashSet, hashPassword, signToken } from './utils'

export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).end()
  const { email, password } = req.body
  if(!email || !password) return res.status(400).json({ message: 'missing' })

  const existing = await upstashGet(`user:${email}`)
  if(existing) return res.status(400).json({ message: '用户已存在' })

  const hashed = hashPassword(password)
  await upstashSet(`user:${email}`, { email, password: hashed })

  const token = signToken({ email })
  res.json({ token })
}

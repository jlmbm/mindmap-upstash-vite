import { upstashGet, comparePassword, signToken } from './utils'

export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).end()
  const { email, password } = req.body
  if(!email || !password) return res.status(400).json({ message: 'missing' })

  const user = await upstashGet(`user:${email}`)
  if(!user) return res.status(401).json({ message: '无效用户或密码' })
  const ok = comparePassword(password, user.password)
  if(!ok) return res.status(401).json({ message: '无效用户或密码' })

  const token = signToken({ email })
  res.json({ token })
}

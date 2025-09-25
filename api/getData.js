import { verifyToken, upstashGet } from './utils'

export default async function handler(req, res){
  if(req.method !== 'GET') return res.status(405).end()
  const auth = req.headers.authorization?.split(' ')[1]
  const user = verifyToken(auth)
  if(!user) return res.status(401).json({ message: 'unauth' })

  const mindmap = await upstashGet(`mindmap:${user.email}:default`)
  res.json({ mindmap })
}

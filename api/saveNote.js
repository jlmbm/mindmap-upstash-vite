import { verifyToken, upstashSet } from './utils'

export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).end()
  const auth = req.headers.authorization?.split(' ')[1]
  const user = verifyToken(auth)
  if(!user) return res.status(401).json({ message: 'unauth' })

  const note = req.body
  if(!note || !note.id) return res.status(400).json({ message: 'bad note' })

  await upstashSet(`note:${user.email}:${note.id}`, { ...note, owner: user.email, updatedAt: Date.now() })
  res.json({ ok: true })
}

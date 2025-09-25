import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import fetch from 'node-fetch'

const UPSTASH_URL = process.env.UPSTASH_REST_URL
const UPSTASH_TOKEN = process.env.UPSTASH_REST_TOKEN
const JWT_SECRET = process.env.JWT_SECRET || 'change-this'

async function upstashCmd(cmdArray){
  const res = await fetch(UPSTASH_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${UPSTASH_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ cmd: cmdArray })
  })
  return res.json()
}

export async function upstashSet(key, value){
  return upstashCmd(['set', key, JSON.stringify(value)])
}

export async function upstashGet(key){
  const r = await upstashCmd(['get', key])
  try{
    if(Array.isArray(r) && r[1]) return JSON.parse(r[1])
  }catch(e){}
  return null
}

export function hashPassword(p){ return bcrypt.hashSync(p, 10) }
export function comparePassword(p, hash){ return bcrypt.compareSync(p, hash) }
export function signToken(payload){ return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' }) }
export function verifyToken(token){ try{ return jwt.verify(token, JWT_SECRET) }catch(e){ return null } }

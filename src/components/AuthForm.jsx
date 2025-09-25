import React, { useState } from 'react'
import { signup, login } from '../services/api'

export default function AuthForm({ onAuth }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState('login')
  const [error, setError] = useState(null)

  async function submit(e) {
    e.preventDefault()
    setError(null)
    try {
      const fn = mode === 'login' ? login : signup
      const res = await fn(email, password)
      onAuth(res.data.token)
    } catch (err) {
      setError(err.response?.data?.message || err.message)
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl mb-4">{mode === 'login' ? '登录' : '注册'}</h2>
      <form onSubmit={submit} className="space-y-3">
        <input required type="email" placeholder="邮箱" value={email} onChange={e=>setEmail(e.target.value)} className="w-full p-2 border rounded" />
        <input required type="password" placeholder="密码" value={password} onChange={e=>setPassword(e.target.value)} className="w-full p-2 border rounded" />
        <div className="flex items-center justify-between">
          <button className="px-4 py-2 bg-blue-600 text-white rounded">{mode === 'login' ? '登录' : '注册'}</button>
          <button type="button" className="text-sm" onClick={()=>setMode(mode==='login'?'signup':'login')}>
            {mode==='login'?'去注册':'去登录'}
          </button>
        </div>
        {error && <div className="text-red-600">{error}</div>}
      </form>
    </div>
  )
}

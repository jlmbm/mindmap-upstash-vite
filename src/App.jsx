import React, { useState, useEffect } from 'react'
import AuthForm from './components/AuthForm'
import CanvasMap from './components/CanvasMap'

export default function App(){
  const [token, setToken] = useState(localStorage.getItem('token') || null)

  useEffect(()=>{
    if(token) localStorage.setItem('token', token)
    else localStorage.removeItem('token')
  }, [token])

  if(!token) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <AuthForm onAuth={setToken} />
    </div>
  )

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">知识库思维导图</h1>
        <button className="px-3 py-1 border rounded" onClick={()=>setToken(null)}>登出</button>
      </header>
      <main>
        <CanvasMap token={token} />
      </main>
    </div>
  )
}

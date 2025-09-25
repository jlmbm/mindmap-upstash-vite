import React, { useState, useEffect } from 'react'

export default function EditorModal({ open, onClose, nodeData, onSave }) {
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')

  useEffect(()=>{
    setContent(nodeData?.content || '')
    setTitle(nodeData?.title || '')
  }, [nodeData])

  if(!open) return null
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-40" onClick={onClose}></div>
      <div className="bg-white p-4 rounded shadow z-10 w-11/12 max-w-2xl">
        <div className="flex justify-between items-center">
          <h3 className="text-lg">编辑节点</h3>
          <button onClick={onClose}>关闭</button>
        </div>
        <input className="w-full p-2 border rounded mt-3" value={title} onChange={e=>setTitle(e.target.value)} placeholder="标题" />
        <textarea className="w-full h-40 p-2 border rounded mt-3" value={content} onChange={e=>setContent(e.target.value)} placeholder="Markdown 内容"></textarea>
        <div className="flex justify-end gap-2 mt-3">
          <button className="px-4 py-2 bg-gray-200 rounded" onClick={onClose}>取消</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={()=>onSave({ title, content })}>保存</button>
        </div>
      </div>
    </div>
  )
}

import React, { useCallback, useState, useRef, useEffect } from 'react'
import ReactFlow, { MiniMap, Controls, Background, addEdge } from 'react-flow-renderer'
import EditorModal from './EditorModal'
import { saveNote, saveMindmap } from '../services/api'

const initialNodes = [
  { id: '1', type: 'default', data: { label: '根节点', title: '根节点', content: '' }, position: { x: 250, y: 5 } }
]

export default function CanvasMap({ token }){
  const [nodes, setNodes] = useState(initialNodes)
  const [edges, setEdges] = useState([])
  const [selectedNode, setSelectedNode] = useState(null)
  const [editorOpen, setEditorOpen] = useState(false)
  const idRef = useRef(2)

  useEffect(()=>{
    // 可以调用 getData(token) 加载已有 mindmap
  }, [])

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [])

  const addNode = () => {
    const id = String(idRef.current++)
    const newNode = { id, data: { label: '新节点', title: '新节点', content: '' }, position: { x: Math.random()*400, y: Math.random()*400 } }
    setNodes(n=>[...n, newNode])
  }

  const onNodeDoubleClick = (_, node) => {
    setSelectedNode(node)
    setEditorOpen(true)
  }

  const onSaveNode = async ({ title, content }) => {
    if(!selectedNode) return
    const updated = nodes.map(n=> n.id===selectedNode.id ? {...n, data: {...n.data, title, content, label: title}} : n)
    setNodes(updated)
    setEditorOpen(false)

    try{
      await saveNote(token, { id: selectedNode.id, title, content })
    }catch(e){console.error('saveNote failed', e)}

    try{
      await saveMindmap(token, { nodes: updated, edges })
    }catch(e){console.error('saveMindmap failed', e)}
  }

  return (
    <div className="h-[80vh] border rounded p-2 canvas-grid">
      <div className="flex gap-2 mb-2">
        <button className="px-3 py-1 bg-green-600 text-white rounded" onClick={addNode}>新增节点</button>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        onNodeDoubleClick={onNodeDoubleClick}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background gap={32} />
      </ReactFlow>

      <EditorModal open={editorOpen} onClose={()=>setEditorOpen(false)} nodeData={selectedNode?.data} onSave={onSaveNode} />
    </div>
  )
}

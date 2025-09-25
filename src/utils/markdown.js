import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export function MarkdownViewer({ source }) {
  return <ReactMarkdown remarkPlugins={[remarkGfm]}>{source || ''}</ReactMarkdown>
}

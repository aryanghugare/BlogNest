import { useEffect, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

function editableText(html = '') {
  const document = new DOMParser().parseFromString(html, 'text/html')
  document.querySelectorAll('br').forEach((element) => element.replaceWith('\n'))
  document.querySelectorAll('p, div, h1, h2, h3, h4, li, blockquote').forEach((element) => element.after('\n'))
  return document.body.textContent.replace(/\n$/, '')
}

function textToHtml(text) {
  const escaped = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  return `<p>${escaped.replace(/\n/g, '<br>')}</p>`
}

function StoryEditor({ field, defaultValue }) {
  const [ready, setReady] = useState(false)
  const [fallback, setFallback] = useState(false)
  const apiKey = import.meta.env.VITE_TINYMCE_API_KEY || '4utkn39p175y20ju1x83anpvgnbq0vbm15ax02mnbey02vi8'
  useEffect(() => {
    if (ready) return
    const timeout = setTimeout(() => setFallback(true), 10000)
    return () => clearTimeout(timeout)
  }, [ready])
  if (fallback) return <div className="editor-fallback"><p id="basic-editor-note">Basic writing mode. You can keep writing while the full editor is unavailable. Editing here replaces rich formatting with plain text.</p><textarea id="story-content" aria-label="Your story" aria-describedby="basic-editor-note" className="input fallback-textarea" placeholder="Let’s start with a few words…" ref={field.ref} name={field.name} onBlur={field.onBlur} value={editableText(field.value)} onChange={(event) => field.onChange(textToHtml(event.target.value))} /></div>
  return <div className="rich-editor">{!ready && <div className="editor-loading" role="status"><span className="spinner spinner-small" /> Preparing your page…</div>}<Editor id="story-content" apiKey={apiKey} initialValue={defaultValue} onInit={() => setReady(true)} onEditorChange={field.onChange} onBlur={field.onBlur} onScriptsLoadError={() => setFallback(true)} init={{ height: 500, menubar: false, branding: false, promotion: false, statusbar: true, placeholder: 'Let’s start with a few words…', plugins: ['autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'searchreplace', 'code', 'fullscreen', 'table', 'wordcount'], toolbar: 'undo redo | blocks | bold italic | bullist numlist | link blockquote | removeformat fullscreen', toolbar_mode: 'sliding', content_style: 'body { font-family: Georgia, serif; font-size: 18px; line-height: 1.85; color: #303a32; margin: 28px; } a { color: #315746; }' }} /></div>
}
export default function RTE({ name = 'content', control, defaultValue = '' }) {
  return <Controller name={name} control={control} render={({ field }) => <StoryEditor field={field} defaultValue={defaultValue} />} />
}

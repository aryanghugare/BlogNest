import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import parse from 'html-react-parser'
import service from '../appwrite/config'
import Container from '../components/container/Container'
import Button from '../components/Button'
import Icon from '../components/Icon'
import { formatDate, readingTime } from '../utils/post'

export default function Post() {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [error, setError] = useState('')
  const { slug } = useParams()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.userData)
  const isAuthor = post && user?.$id === post.userId
  useEffect(() => {
    let active = true
    service.getPost(slug).then((result) => { if (active) setPost(result || null) }).finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [slug])
  const deletePost = async () => {
    setDeleting(true)
    setError('')
    const success = await service.deletePost(post.$id)
    if (success) {
      if (post.featuredImage) await service.deleteFile(post.featuredImage)
      navigate('/all-posts')
    } else { setError('We couldn’t delete this story. Please try again.'); setDeleting(false) }
  }
  if (loading) return <div className="page-loading" role="status"><span className="spinner" /><p>Loading story…</p></div>
  if (!post) return <Container><div className="empty-state standalone-empty"><Icon name="book" size={36} /><h1>Story not found.</h1><p>This story may have been removed, or we couldn’t load it.</p><Link to="/" className="button button-primary">Back to the journal <Icon name="arrow" size={17} /></Link></div></Container>
  return <Container><article className="article-page"><div className="article-toolbar"><Link to={user ? '/all-posts' : '/'} className="back-link"><Icon name="back" size={16} /> Back to the journal</Link>{isAuthor && <div className="article-actions"><Link className="button button-outline button-small" to={`/edit-post/${post.$id}`}><Icon name="pen" size={15} /> Edit story</Link><Button variant="ghost" className="button-small danger-text" onClick={() => setConfirmDelete(true)}><Icon name="trash" size={16} /> Delete</Button></div>}</div>
    <header className="article-header"><p className="eyebrow">{post.status === 'inactive' ? 'DRAFT / UNPUBLISHED' : 'JOURNAL ENTRY'}</p><h1>{post.title}</h1><div className="article-byline"><span className="user-avatar">{isAuthor ? user.name?.slice(0, 1).toUpperCase() : 'Bn'}</span><div><strong>{isAuthor ? user.name : 'Published on BlogNest'}</strong><span><time dateTime={post.$createdAt}>{formatDate(post.$createdAt)}</time><span className="meta-dot">·</span>{readingTime(post.content)} min read</span></div></div></header>
    {post.featuredImage && <div className="article-cover"><img src={service.getFilePreview(post.featuredImage)} alt={post.title} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/writers-desk.jpg' }} /></div>}
    <div className="article-content">{parse(post.content || '')}</div><div className="article-end"><p className="end-mark" aria-label="End of story">—</p><Link to={user ? '/add-post' : '/signup'} className="text-link">Write something of your own <Icon name="arrow" size={16} /></Link></div>
  </article>{confirmDelete && <div className="modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget && !deleting) setConfirmDelete(false) }}><DeleteDialog title={post.title} busy={deleting} error={error} onCancel={() => setConfirmDelete(false)} onDelete={deletePost} /></div>}</Container>
}
function DeleteDialog({ title, busy, error, onCancel, onDelete }) {
  useEffect(() => {
    const previous = document.activeElement
    const cancel = document.getElementById('cancel-delete')
    cancel?.focus()
    const onKey = (event) => {
      if (event.key === 'Escape' && !busy) onCancel()
      if (event.key === 'Tab') {
        const buttons = [...document.querySelectorAll('.confirm-dialog button:not(:disabled)')]
        if (!buttons.length) { event.preventDefault(); return }
        if (event.shiftKey && document.activeElement === buttons[0]) { event.preventDefault(); buttons.at(-1).focus() }
        else if (!event.shiftKey && document.activeElement === buttons.at(-1)) { event.preventDefault(); buttons[0].focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = previousOverflow; previous?.focus() }
  }, [busy, onCancel])
  return <div className="confirm-dialog" role="alertdialog" aria-modal="true" aria-labelledby="delete-title" aria-describedby="delete-description"><span className="empty-icon"><Icon name="trash" size={25} /></span><h2 id="delete-title">Let this story go?</h2><p id="delete-description">“{title}” and its cover image will be permanently deleted.</p>{error && <p className="field-error" role="alert">{error}</p>}<div className="dialog-actions"><Button id="cancel-delete" variant="outline" disabled={busy} onClick={onCancel}>Keep story</Button><Button variant="danger" disabled={busy} onClick={onDelete}>{busy ? 'Deleting…' : 'Delete story'}</Button></div></div>
}

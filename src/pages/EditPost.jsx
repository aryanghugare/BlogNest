import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import service from '../appwrite/config'
import Container from '../components/container/Container'
import PostForm from '../components/post-form/PostForm'
import Icon from '../components/Icon'
export default function EditPost() {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const { slug } = useParams()
  const user = useSelector((state) => state.auth.userData)
  useEffect(() => {
    let active = true
    service.getPost(slug).then((result) => { if (active) setPost(result || null) }).finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [slug])
  return <Container>{loading ? <div className="page-loading" role="status"><span className="spinner" /><p>Loading story…</p></div> : post && post.userId === user?.$id ? <PostForm key={post.$id} post={post} /> : <div className="empty-state standalone-empty"><Icon name="book" size={36} /><h1>{post ? 'You can’t edit this story.' : 'We couldn’t find this story.'}</h1><p>{post ? 'You can only edit stories you’ve written.' : 'It may have been removed, or we couldn’t load it.'}</p><Link to="/all-posts" className="button button-primary">Back to the journal</Link></div>}</Container>
}

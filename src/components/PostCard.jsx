import { Link } from 'react-router-dom'
import appwriteService from '../appwrite/config'
import { formatDate, plainText, readingTime } from '../utils/post'
import Icon from './Icon'

export default function PostCard({ $id, title, content, featuredImage, $createdAt }) {
  return <article className="post-card"><Link className="post-card-link" to={`/post/${$id}`}>
    <div className="post-card-image"><img src={appwriteService.getFilePreview(featuredImage) || '/writers-desk.jpg'} alt="" loading="lazy" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/writers-desk.jpg' }} /></div>
    <div className="post-card-meta"><time dateTime={$createdAt}>{formatDate($createdAt)}</time><span>{readingTime(content)} min read</span></div>
    <h3>{title}</h3><p>{plainText(content).slice(0, 160)}</p>
    <span className="post-card-bottom">Read story <Icon name="diagonal" size={15} /></span>
  </Link></article>
}

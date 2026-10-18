import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import service from '../appwrite/config'
import { plainText } from '../utils/post'
import PostCard from './PostCard'
import Icon from './Icon'
import Button from './Button'

export default function StoryCollection({ compact = false }) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('newest')
  const user = useSelector((state) => state.auth.userData)
  useEffect(() => {
    let active = true
    service.getPosts().then((result) => {
      if (!active) return
      if (result) { setPosts(result.documents); setError(false) }
      else setError(true)
    }).catch(() => { if (active) setError(true) }).finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [attempt])
  const visible = useMemo(() => posts.filter((post) => (filter === 'all' || post.userId === user?.$id) && `${post.title} ${plainText(post.content)}`.toLowerCase().includes(query.toLowerCase().trim())).sort((a, b) => (new Date(b.$createdAt) - new Date(a.$createdAt)) * (sort === 'newest' ? 1 : -1)), [posts, filter, user, query, sort])
  return <>
    {!compact && <div className="library-toolbar"><div className="story-tabs" aria-label="Filter stories"><button className={filter === 'all' ? 'selected' : ''} aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>All stories <span>{posts.length}</span></button><button className={filter === 'mine' ? 'selected' : ''} aria-pressed={filter === 'mine'} onClick={() => setFilter('mine')}>Your stories</button></div><div className="library-tools"><div className="search-input"><Icon name="search" size={18} /><input aria-label="Search stories" placeholder="Search the journal…" value={query} onChange={(e) => setQuery(e.target.value)} />{query && <button className="icon-button" onClick={() => setQuery('')} aria-label="Clear search"><Icon name="close" size={15} /></button>}</div><select aria-label="Sort stories" value={sort} onChange={(e) => setSort(e.target.value)}><option value="newest">Newest first</option><option value="oldest">Oldest first</option></select></div></div>}
    {loading ? <div className="posts-grid" role="status" aria-label="Loading stories">{[0, 1, 2].map((i) => <div className="skeleton-card" key={i}><div /><span /><span /></div>)}</div> : error ? <div className="empty-state"><span className="empty-icon"><Icon name="book" size={29} /></span><h3>We couldn’t load the stories.</h3><p>Check your connection and try again.</p><Button variant="outline" onClick={() => { setLoading(true); setAttempt(attempt + 1) }}>Try again <Icon name="arrow" size={17} /></Button></div> : visible.length ? <div className={`posts-grid ${compact ? 'journal-grid' : ''}`}>{(compact ? visible.slice(0, 3) : visible).map((post, index) => <PostCard key={post.$id} {...post} index={index} />)}</div> : <div className="empty-state"><span className="empty-icon"><Icon name={query ? 'search' : 'pen'} size={29} /></span><p className="eyebrow">{query ? 'SEARCH RESULTS' : 'THE JOURNAL'}</p><h3>{query ? 'No stories found.' : filter === 'mine' ? 'You haven’t published a story yet.' : 'No entries yet.'}</h3><p>{query ? 'Try a different word or clear your search to see all stories.' : 'When a story is published, it will appear here.'}</p>{query ? <Button variant="outline" onClick={() => { setQuery(''); setFilter('all') }}>Clear filters</Button> : <Link className="button button-primary" to="/add-post">Write a story <Icon name="pen" size={17} /></Link>}</div>}
  </>
}

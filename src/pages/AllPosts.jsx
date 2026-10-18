import { Link } from 'react-router-dom'
import Container from '../components/container/Container'
import StoryCollection from '../components/StoryCollection'
import Icon from '../components/Icon'
export default function AllPosts() {
  return <Container><section className="library-page"><div className="page-heading"><div><p className="eyebrow">THE BLOGNEST JOURNAL / ALL ENTRIES</p><h1>The journal</h1><p>Personal stories, notes, and things people wanted to share.</p></div><Link className="button button-outline" to="/add-post"><Icon name="pen" size={17} /> Write a story</Link></div><StoryCollection /></section></Container>
}

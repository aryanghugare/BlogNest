import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Container from '../container/Container'
import Icon from '../Icon'

export default function Footer() {
  const status = useSelector((state) => state.auth.status)
  return <footer className="site-footer"><Container>
    <div className="footer-top"><p>An open notebook.<br /><span>Yours, too.</span></p><nav className="footer-links" aria-label="Footer navigation"><Link to="/">Journal</Link><Link to="/#about">About</Link><Link to={status ? '/add-post' : '/signup'}>Write a story <Icon name="diagonal" size={14} /></Link></nav></div>
    <Link className="footer-wordmark" to="/" aria-label="BlogNest home">BlogNest<span>.</span></Link>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} BlogNest</span><span>Read something. Write something.</span><a href="#main-content">Back to top ↑</a></div>
  </Container></footer>
}

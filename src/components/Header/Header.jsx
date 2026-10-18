import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Logo from '../Logo'
import Icon from '../Icon'
import LogoutBtn from './LogoutBtn'
import Container from '../container/Container'

export default function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const { status, userData } = useSelector((state) => state.auth)
  return <header className="site-header"><Container><div className="header-inner">
    <Link to="/" aria-label="BlogNest home" onClick={() => setOpen(false)}><Logo /></Link>
    <nav className="desktop-nav" aria-label="Main navigation">
      <NavLink to="/" end>Journal</NavLink>
      {status ? <NavLink to="/all-posts">All stories</NavLink> : <Link to="/#about">About</Link>}
    </nav>
    <div className="header-actions">
      {status ? <><span className="account-name">{userData?.name?.split(' ')[0]}</span><LogoutBtn /><Link className="button button-primary button-small" to="/add-post"><Icon name="pen" size={16} /><span>Write a story</span></Link></> : <><Link className={`login-link ${pathname === '/login' ? 'current' : ''}`} to="/login">Log in</Link><Link className="button button-primary button-small" to="/signup">Write a story <Icon name="diagonal" size={16} /></Link></>}
    </div>
    <button className="menu-toggle icon-button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}><Icon name={open ? 'close' : 'menu'} /></button>
  </div>{open && <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation" onClick={() => setOpen(false)}><Link to="/">Journal</Link><Link to={status ? '/all-posts' : '/#about'}>{status ? 'All stories' : 'About'}</Link><Link to={status ? '/add-post' : '/signup'}>Write a story</Link>{!status && <Link to="/login">Log in</Link>}{status && <LogoutBtn />}</nav>}</Container></header>
}

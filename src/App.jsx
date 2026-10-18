import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet, useLocation } from 'react-router-dom'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Header, Footer } from './components'
import './App.css'

export default function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const { pathname, hash } = useLocation()
  useEffect(() => {
    let mounted = true
    authService.getCurrentUser().then((userData) => {
      if (mounted) dispatch(userData ? login({ userData }) : logout())
    }).finally(() => { if (mounted) setLoading(false) })
    return () => { mounted = false }
  }, [dispatch])
  useEffect(() => {
    if (loading) return
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' })
    else window.scrollTo(0, 0)
  }, [pathname, hash, loading])
  return <div className="app-shell">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <Header />
    <main id="main-content">{loading ? <div className="page-loading" role="status"><span className="spinner" /><p>Loading BlogNest…</p></div> : <Outlet />}</main>
    <Footer />
  </div>
}

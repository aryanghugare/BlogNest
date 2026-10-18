import { useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import Icon from '../Icon'

export default function LogoutBtn() {
  const dispatch = useDispatch()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(false)
  const handleLogout = async () => {
    setBusy(true)
    setError(false)
    try { await authService.Logout(); dispatch(logout()) }
    catch { setError(true) }
    finally { setBusy(false) }
  }
  return <button className="logout-button" disabled={busy} onClick={handleLogout} aria-label={error ? 'Sign out failed. Try again' : 'Sign out'} title={error ? 'Could not sign out. Try again.' : 'Sign out'}><Icon name="logout" size={18} /><span>{busy ? 'Signing out…' : error ? 'Try again' : 'Sign out'}</span></button>
}

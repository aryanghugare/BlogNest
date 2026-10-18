import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
export default function AuthLayout({ children, authentication = true }) {
  const status = useSelector((state) => state.auth.status)
  const location = useLocation()
  if (authentication && !status) return <Navigate to="/login" replace state={{ from: location.pathname }} />
  if (!authentication && status) return <Navigate to={location.state?.from || '/'} replace />
  return children
}

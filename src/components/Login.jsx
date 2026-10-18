import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { login as authLogin } from '../store/authSlice'
import authService from '../appwrite/auth'
import Button from './Button'
import Input from './Input'
import Icon from './Icon'
import AuthPanel from './AuthPanel'

export default function Login() {
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const submit = async (data) => {
    setError('')
    try {
      await authService.login(data)
      const userData = await authService.getCurrentUser()
      if (!userData) throw new Error('We couldn’t load your account. Please try again.')
      dispatch(authLogin({ userData }))
      navigate(location.state?.from || '/')
    } catch (err) { setError(err.message || 'We couldn’t sign you in. Please try again.') }
  }
  return <AuthPanel><div className="auth-form-content"><p className="eyebrow">ACCOUNT / LOG IN</p><h1>Welcome back.</h1><p className="auth-intro">Log in to read and pick up where you left off.</p><form onSubmit={handleSubmit(submit)} noValidate>
    {error && <div className="form-alert" role="alert">{error}</div>}
    <Input label="Email address" type="email" autoComplete="email" placeholder="you@example.com" error={errors.email?.message} {...register('email', { required: 'Enter your email address.', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address.' } })} />
    <div className="password-field"><Input label="Password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" placeholder="Your password" error={errors.password?.message} {...register('password', { required: 'Enter your password.' })} /><button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'} aria-pressed={showPassword}><Icon name={showPassword ? 'lock' : 'eye'} size={18} /></button></div>
    <Button type="submit" className="full-width" disabled={isSubmitting}>{isSubmitting ? 'Logging in…' : 'Log in'}{isSubmitting ? <span className="spinner spinner-small" /> : <Icon name="arrow" size={18} />}</Button>
  </form><p className="auth-switch">Don’t have an account? <Link to="/signup">Sign up <Icon name="diagonal" size={14} /></Link></p></div></AuthPanel>
}

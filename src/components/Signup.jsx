import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { login } from '../store/authSlice'
import authService from '../appwrite/auth'
import Button from './Button'
import Input from './Input'
import Icon from './Icon'
import AuthPanel from './AuthPanel'

export default function Signup() {
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const submit = async (data) => {
    setError('')
    try {
      await authService.createAccount(data)
      const userData = await authService.getCurrentUser()
      if (!userData) throw new Error('Your account was created, but we couldn’t sign you in. Please log in.')
      dispatch(login({ userData }))
      navigate('/')
    } catch (err) { setError(err.message || 'We couldn’t create your account. Please try again.') }
  }
  return <AuthPanel signup><div className="auth-form-content"><p className="eyebrow">ACCOUNT / SIGN UP</p><h1>Join BlogNest.</h1><p className="auth-intro">Create an account to read and publish stories.</p><form onSubmit={handleSubmit(submit)} noValidate>
    {error && <div className="form-alert" role="alert">{error}</div>}
    <Input label="Your name" autoComplete="name" placeholder="Your full name" error={errors.name?.message} {...register('name', { required: 'Enter your name.', validate: (v) => !!v.trim() || 'Enter your name.' })} />
    <Input label="Email address" type="email" autoComplete="email" placeholder="you@example.com" error={errors.email?.message} {...register('email', { required: 'Enter your email address.', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address.' } })} />
    <div className="password-field"><Input label="Create a password" type={showPassword ? 'text' : 'password'} autoComplete="new-password" placeholder="At least 8 characters" error={errors.password?.message} hint="Use at least 8 characters." {...register('password', { required: 'Create a password.', minLength: { value: 8, message: 'Use at least 8 characters.' } })} /><button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'} aria-pressed={showPassword}><Icon name={showPassword ? 'lock' : 'eye'} size={18} /></button></div>
    <Button type="submit" className="full-width" disabled={isSubmitting}>{isSubmitting ? 'Creating your account…' : 'Create your account'}{isSubmitting ? <span className="spinner spinner-small" /> : <Icon name="arrow" size={18} />}</Button>
  </form><p className="auth-switch">Already have an account? <Link to="/login">Log in <Icon name="diagonal" size={14} /></Link></p></div></AuthPanel>
}

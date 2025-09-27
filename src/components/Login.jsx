import React,{useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {login as authLogin} from '../store/authSlice'
import {Button,Input,Logo} from './index'
import {useDispatch} from 'react-redux'
import authService from '../appwrite/auth'
import {useForm} from 'react-hook-form'

function Login() {
const navigate = useNavigate()
const dispatch = useDispatch()
const {register,handleSubmit} = useForm()
const[error , setError] = useState('')

const login = async (data) =>{
setError('')
try {
  const session = await authService.login(data)
if(session){
const userData = await authService.getCurrentUser()
if(userData) dispatch(authLogin(userData)) ;     
navigate('/') ;
}
} catch (error) {
    setError(error.message)
}
}
  return (
    <div
    className='flex items-center justify-center w-full'
    >
<div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
<div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
<p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
   <form onSubmit={handleSubmit(login)} className='mt-8'>  {/* handleSubmit is the method of react hook form */}
<div className='space-y-5'> 
<Input
Label="Email"
type="email"
placeholder='Enter your email'
{...register('email',{
required : true,
validate : {
matchPattern : (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Invalid email address"
}

})}  // register method of react hook form

 />

<Input 
Label="Password"
type="password"
placeholder='Enter your password'
{...register('password',{   // This is possible React.forwardRef , which is used in Input component
required : true,
minLength : {
value : 6,
message : "Password must be at least 6 characters"
}
})}
/>
{/* So all these Validations in register are optional  */}
<Button
type='submit'
className='w-full'
>Sign In </Button>   {/* Soo it is opening and closing tag , because it has children  */}
</div>
</form>
</div>
</div>
  )
}

export default Login



// Summary of this code 
/*
🔹 Summary:
Login → session created.
Fetch current user → ensures you have fresh, authenticated user data.
Dispatch to Redux → updates global state for the app.
Navigate → redirect to a page.
Previous data is overwritten, .getCurrentUser() always gives the current logged-in user.

*/ 
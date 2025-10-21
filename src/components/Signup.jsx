import React,{useState} from 'react'
import authService from '../appwrite/auth'
import {Link, useNavigate} from 'react-router-dom'
import {Button,Input,Logo} from './index'
import {useForm} from 'react-hook-form'
import {useDispatch} from 'react-redux'
import {login as authLogin} from '../store/authSlice'  // we are using login action of authSlice, we have changed name to authLogin

function Signup() {
const[error , setError] = useState('')
const dispatch = useDispatch()
const {register,handleSubmit} = useForm()
const navigate = useNavigate()
const signup = async (data) =>{
setError('')
try {
const response = await authService.createAccount(data)  // Here data is an object which contains email,password,name
if(response){
const userData = await authService.getCurrentUser()
if(userData) dispatch(authLogin(userData)) ;   
navigate('/') ;

}
    
} catch (error) {
        setError(error.message)
}
}

  return (
   <div className="flex items-center justify-center">
 <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
  <div className="mb-2 flex justify-center">
 <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
</span>
</div>

<h2 className="text-center text-2xl font-bold leading-tight"> Signup to create account </h2>
<p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
{error && <p className="text-red-600 mt-8 text-center">{error}</p>}

<form onSubmit={handleSubmit(signup)}>
<div className='space-y-5 ' >
<Input 
type="text"
label="Name"
placeholder='Enter your name'
{...register('name',{required : true})}  // here name is the key of the object which will be sent to the backend
/> 

{/* // This email input field is same as in Login.jsx file */}

<Input
label="Email"
type="email"
placeholder='Enter your email'
{...register('email',{   // This is possible React.forwardRef , which is used in Input component
required : true,
validate : {
matchPattern : (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Invalid email address"
}

})}  // register method of react hook form

 />

<Input
label ="Password"
type="password"
placeholder='Enter your password'
{...register('password',{
required : true,
minLength : {
value : 6,
message : "Password must be at least 6 characters"
}
})}

/>

<Button
type='submit'
className='w-full'
> Create Account  </Button>  {/* Soo it is opening and closing tag , because it has children  */}


</div>





</form>


</div>


</div>



  )
}

export default Signup
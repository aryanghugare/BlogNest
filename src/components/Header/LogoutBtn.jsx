import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'
function LogoutBtn() {
const dispatch = useDispatch()
const logoutHandler = async()=>{ 
authService.Logout() // These appwrite functions always return promises, so we can chain a .then() to them
.then(()=> dispatch(logout()))
.catch((error)=> console.log("Logout Error:",error))
}
  return (
<button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full '
onClick={logoutHandler}

>Logout</button>


  )
}

export default LogoutBtn
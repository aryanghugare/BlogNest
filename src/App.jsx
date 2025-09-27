
import { useState } from 'react'
import {useDispatch} from 'react-redux'
import './App.css'
import authService from './appwrite/auth'
import { useEffect } from 'react'
import{login,logout} from './store/authSlice'
import{Header,Footer} from './components/index'
import { Outlet } from 'react-router-dom'


function App() {
const[loading , setLoading] = useState(true)
const dispatch = useDispatch()




useEffect(()=>{
authService.getCurrentUser()
.then((userData)=>{
if(userData){
dispatch(login({userData}))  
}
else {
dispatch(logout())
}
})
.catch((error)=>{
console.log("Error while fetching user data " + error);

})
.finally(()=>{setLoading(false)})
},[])

// Conditional Rendering 

  return !loading ?  (
 <div className='min-h-screen flex flex-wrap content-between bg-gray-400 '>
<div className='w-full block content-center' >
<Header/>
<main>
{/* Your Main Content Here */}
 <Outlet />
</main>
<Footer/>
</div>
</div>
  ) : null 



}

export default App

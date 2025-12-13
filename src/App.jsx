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
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full text-center bg-white p-6 rounded-lg shadow-md border">
        <svg className="animate-spin h-10 w-10 mx-auto text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
        <h2 className="mt-4 text-xl font-semibold text-gray-800">We’re having trouble loading your session</h2>
        <p className="mt-2 text-gray-600">Please check your internet connection or try again. If the problem continues, sign out and sign back in.</p>
        <div className="mt-4 flex justify-center gap-3">
          <button onClick={() => window.location.reload()} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Retry</button>
          <button onClick={() => { dispatch(logout()) }} className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50">Sign out</button>
        </div>
      </div>
    </div>
  ) 



}

export default App

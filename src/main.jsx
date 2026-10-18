import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import store from './store/store'
import AuthLayout from './components/AuthLayout'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import AllPosts from './pages/AllPosts'
import AddPost from './pages/AddPost'
import EditPost from './pages/EditPost'
import Post from './pages/Post'
import NotFound from './pages/NotFound'
import './index.css'

const router = createBrowserRouter([{
  path: '/',
  element: <App />,
  children: [
    { index: true, element: <Home /> },
    { path: 'login', element: <AuthLayout authentication={false}><Login /></AuthLayout> },
    { path: 'signup', element: <AuthLayout authentication={false}><Signup /></AuthLayout> },
    { path: 'all-posts', element: <AuthLayout><AllPosts /></AuthLayout> },
    { path: 'add-post', element: <AuthLayout><AddPost /></AuthLayout> },
    { path: 'edit-post/:slug', element: <AuthLayout><EditPost /></AuthLayout> },
    { path: 'post/:slug', element: <Post /> },
    { path: '*', element: <NotFound /> },
  ],
}])

createRoot(document.getElementById('root')).render(
  <Provider store={store}><RouterProvider router={router} /></Provider>,
)

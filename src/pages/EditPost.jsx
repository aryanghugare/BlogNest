import React,{useEffect,useState} from 'react'
import appwriteService from '../appwrite/config'
import { Container, PostForm } from '../components'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
function EditPost() {
const [post,setPost]=useState(null)
const {slug} = useParams() ; // This gets the :slug param from the URL
const navigate = useNavigate() ;

useEffect(()=> {
if(slug){
appwriteService.getPost(slug).then((post)=>{
if(post){
setPost(post)
}
})
}else {
navigate('/')
}

},[slug,navigate])
  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost
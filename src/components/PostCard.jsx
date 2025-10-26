import React from 'react'
import appwriteService from '../appwrite/config'
import {Link} from 'react-router-dom'
// The appwrite Service of getting file preview doesnt return any promise , it directly returns the url of the image

function PostCard({$id,title,content,featuredImage }) { // $id is document id in appwrite , it is unique to appwrite


  return (
<Link to={`/post/${$id}`}>
<div className='w-full bg-gray-100 rounded-xl p-4 '>
<div className='w-full flex justify-center mb-4'>
<img
src={appwriteService.getFilePreview(featuredImage)}
alt={title}
className='rounded-xl w-full h-70 object-contain'
/>
</div>
<h2
className='text-xl font-bold'
> {title}
</h2>
</div>
</Link>
  )
}

export default PostCard
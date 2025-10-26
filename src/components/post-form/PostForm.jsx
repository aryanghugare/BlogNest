import React,{useCallback,useEffect} from 'react'
import {useForm} from 'react-hook-form'
import {Button,Input,Select,RTE} from '../index'
import appwriteService from '../../appwrite/config'
import {useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'


function PostForm({post}) { // This post prop will be undefined when we are adding a new post and it will be an object when we are editing an existing post
const {register,handleSubmit,watch,setValue,control , getValues } = useForm(
{
defaultValues : {
title : post?.title || "",
slug : post?.slug || "",
content : post?.content || "",
status : post?.status || "active",
},
})
const navigate = useNavigate()
const userData = useSelector((state)=> state.auth.userData) ; 

// data parameter in the submit function refers to the form data submitted by the user (from react-hook-form), not the data from the Redux store.
// this data object contains the values of all the form fields that the user has filled out or modified.
const submit = async(data)=>{
if(post){
// update post 
// So the the thing is we will first upload the image if present and then update the post
// Uploading the image should be done first because we need the fileId to update the post
const file = data.image[0] ? appwriteService.uploadFile(data.image[0]) : null 
if(file){
appwriteService.deleteFile(post.featuredImage) // as we are updating the post and we have access of post , in this post we have the featuredImage id also, so delete the old image
}
// slug is post.$id
const dbPost = await appwriteService.updatePost(post.$id,{...data
, featuredImage : file ? file.$id : undefined
});
if(dbPost){
navigate(`/post/${dbPost.$id}`)
}
}
else {
 // create post 
// if(data.image && data.image.length > 0){
const file  = data.image[0] ?  await appwriteService.uploadFile(data.image[0]) : null ;
if(file){
const fileId = file.$id ;
data.featuredImage = fileId ; 
console.log(userData);

const dbPost =  await appwriteService.createPost({...data,userId : userData.$id}) // This spread is done because data doesnt have userId, we are adding it here 
if(dbPost){
navigate(`/post/${dbPost.$id}`)

}
}



}

}

const slugTransform = useCallback((value)=>{
// Will be replacing all the spaces with - and converting to lowercase
if(value && typeof value === 'string'){
return value
.trim()
.toLowerCase()
.replace(/\s+/g,'-').toLowerCase() ;
}
// else return empty string
return "" ;


},[])

useEffect(()=>{
const subscription = watch((value, {name})=>{
if(name === 'title'){
setValue('slug',slugTransform(value.title,
{shouldValidate : true}))
}

})
return ()=> {
subscription.unsubscribe() }

},[watch,slugTransform,setValue])



  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>

  )
}

export default PostForm
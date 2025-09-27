import conf from "../conf/conf.js";
import { Client, Account, ID,Databases,Storage,Query, TablesDB } from "appwrite";


export class Service {
client = new Client() ;
databases ;
bucket ;   // This is called storage tooo 


constructor(){
this.client 
.setEndpoint(conf.appwriteUrl)
.setProject(conf.appwriteProjectId);
this.account = new Account(this.client)
this.databases = new Databases(this.client)
this.bucket = new Storage(this.client)

}
// In all these methods , we are using 'slug' as documentId 

// Refer the docs for all these methods for better clarity 
async createPost({title,slug,content,featuredImage,status,userId}){
try {
return await this.databases.createDocument(
// Order should be same 
conf.appwriteDatabaseId,  // Database Id is required here 
conf.appwriteCollectionId ,// Collection Id is required here 
 slug, // This is document Id , again required field 

{
title,
content ,
featuredImage ,
status ,
userId ,

}
)
} catch (error) {
    console.log("There is an error while creating the post " + error );
    
}
}


// Refer the docs for all these methods for better clarity 
async updatePost (slug, {title,content,featuredImage,status}){  // slug is used as document Id , so it is taken seperately 
try {
   return await this.databases.updateDocument(
conf.appwriteDatabaseId,
conf.appwriteCollectionId,
slug,
{
title, 
content ,
featuredImage ,
status,

}
)
} catch (error) {
    console.log("There is an error while updating the post" + error );
    
}


}
// Refer the docs for all these methods for better clarity 
async deletePost(slug){
try {
 await this.databases.deleteDocument(
conf.appwriteDatabaseId,  
conf.appwriteCollectionId,
slug 
)

return true ; // This will be handled in the frontend 
} catch (error) {
console.log("There is an error while deleting the post " + error);
return false ;
    
}


}
// The method to get the post of a particular DocumentId 
async getPost(slug){
try {
    return await this.databases.getDocument(
conf.appwriteDatabaseId,
conf.appwriteCollectionId,
slug 
)
} catch (error) {
    console.log("There was an error while getting the post " + error );
    
}

}


// The method to retrive the documents or the posts  , whose status is active 

// The queries which i have used here can be only done , if there is indexing , without indexing is not possible 
async getPosts(){
try {
 return await this.databases.listDocuments(
conf.appwriteDatabaseId,
conf.appwriteCollectionId,
[
Query.equal('status','active')
]
)
} catch (error) {
    console.log("There was an error while retrieving the post which are active " + error );
    
}

}

// file upload service 
// So after uploading we get a Id , which we will store in the createPost method as featuredImage 
async uploadFile(file){
try {
return await this.bucket.createFile(
conf.appwriteBucketId,
ID.unique(),
file

)
} catch (error) {
    console.log("There was an error while uploading the file" + error);
    return false ;
}
}
// file delete service 
async deleteFile(fileId){
try {
await this.bucket.deleteFile(
conf.appwriteBucketId,
fileId 
)
    return true ;
} catch (error) {
    console.log("There was an error , while deleting the file " + error );
    return false 
}

}

// No need of Async here 
// From this method , we get a url only 
getFilePreview(fileId){
try {
return this.bucket.getFileView(
conf.appwriteBucketId,
fileId
)
} catch (error) {
    console.log("There was an error while file preview " + error );
    
}
}

}

const service = new Service();
export default service 
const conf = {
appwriteUrl : String(import.meta.env.VITE_APPWRITE_URL),
appwriteProjectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
appwriteDatabaseId : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
appwriteCollectionId : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
appwriteBucketId : String(import.meta.env.VITE_APPWRITE_BUCKET_ID),

}

export default conf 

// This file is used to store configuration variables for the application,
// String is because import.meta.env variables has to be String 
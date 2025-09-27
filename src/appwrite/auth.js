import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";


export class AuthService{
client = new Client() ;
account ;


constructor(){
this.client 
.setEndpoint(conf.appwriteUrl)
.setProject(conf.appwriteProjectId);
this.account = new Account(this.client)
}

async createAccount({email,password,name}){   // Here object destructing is done 
try {
  const userAccount = await this.account.create(ID.unique(),email,password,name)    // So here order is important because docs of appwrite wants the same order
if(userAccount){
// Call another method 
// If account created then login the user also 
return this.login({email,password})
}
else {
return userAccount ;
}
} catch (error) {
    throw error 
}
}

async login({email,password}){
try {
  const session = await this.account.createEmailPasswordSession(email,password)    // Here order of the email and password will be same because docs of appwrite wants the same order
return session ;
} catch (error) {
    throw error 
}

}

async getCurrentUser(){
try {
 return await this.account.get();
} catch (error) {
 console.log("Error while getting the user " + error); 
}
}

async Logout(){
try {
    this.account.deleteSessions()
} catch (error) {
    console.log("Error while logging out " + error);  // This is also we can use instead of throwing errors
    
}

}

}

const authService = new AuthService();

export default authService



/*
in the createAccount method 
Here the parameter is destructured:
email, password, name are extracted from the object passed in.
This is called object destructuring in parameters.

*/
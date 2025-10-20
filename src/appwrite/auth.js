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
// Through this constructor , we are initializing the client and account only once
// without needing to do it in every method 
// All these methods are async because they are making network requests

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

export default authService // This is an object of AuthService class  



/*
in the createAccount method 
Here the parameter is destructured:
email, password, name are extracted from the object passed in.
This is called object destructuring in parameters.

*/





// Soo we can do this only a method tooo , class is not mandatory


/*

import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

// Initialize client and account once (shared across all methods)
const client = new Client()
  .setEndpoint(conf.appwriteUrl)
  .setProject(conf.appwriteProjectId);

const account = new Account(client);

// Object containing all authentication methods
const authService = {
  
  // Create new user account
  createAccount: async ({ email, password, name }) => {
    try {
      const userAccount = await account.create(ID.unique(), email, password, name);
      if (userAccount) {
        // If account created, automatically login the user
        return authService.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  },

  // Login user with email and password
  login: async ({ email, password }) => {
    try {
      const session = await account.createEmailPasswordSession(email, password);
      return session;
    } catch (error) {
      throw error;
    }
  },

  // Get currently logged in user data
  getCurrentUser: async () => {
    try {
      return await account.get();
    } catch (error) {
      console.log("Error while getting the user: " + error);
      return null;
    }
  },

  // Logout user (delete all sessions)
  logout: async () => {
    try {
      await account.deleteSessions();
      return true;
    } catch (error) {
      console.log("Error while logging out: " + error);
      return false;
    }
  }
};

export default authService;

/*
USAGE EXAMPLE:

import authService from './appwrite/auth.js'

// Create account
const newUser = await authService.createAccount({
  email: "user@example.com",
  password: "password123",
  name: "John Doe"
});

// Login
const session = await authService.login({
  email: "user@example.com", 
  password: "password123"
});

// Get current user
const user = await authService.getCurrentUser();

// Logout
await authService.logout();
*/






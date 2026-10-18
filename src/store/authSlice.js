
// For this last time , we made features directory for this slice thing but not necessary 

import {createSlice} from '@reduxjs/toolkit'

const initialState = {
status : false ,
userData : null 

}


export const authSlice = createSlice({
name : "auth",
initialState,
reducers : {
login : (state,action)=> {
state.status = true ;
state.userData = action.payload.userData 
},
logout: (state)=> {
state.status=false ;
state.userData = null;

}

}
})


export const{login,logout} = authSlice.actions 

export default authSlice.reducer ;
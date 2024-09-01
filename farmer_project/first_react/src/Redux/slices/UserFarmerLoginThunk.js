import { createSlice, isPending} from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
export const userfarmerThunk=createAsyncThunk('userFarmerThunk',async(userCredObj,thunkApi)=>{
    try{
        //(userCredObj)
        if(userCredObj!=null)
            {  
                  const res=await axios.post('http://localhost:3030/userapi/login',userCredObj, {
                    headers: {
                      'Content-Type': 'application/json',
                      // Include any other headers as needed
                    }})
                    //(res)
                  if(res.data.message==='login successful'){
                    //use session storage for high security and also once we closed storage is deleted
                    //store in session storage and return data
                    
                    sessionStorage.setItem('Token', res.data.Token);
                const userData = JSON.stringify(res.data.data);
                localStorage.setItem('currentUser', userData);
                localStorage.setItem('loginStatus', 'true');
               
                  }
                  else{
                    return thunkApi.rejectWithValue(res.data.message)
                  }
                return res.data.data
                
            }
          
    }
    catch(err){
        return thunkApi.rejectWithValue(err)
    }
})



export const UserFarmer=createSlice(
    {
        name:"userSlice",
        initialState:{
            isPending:false,
            currentUser: JSON.parse(localStorage.getItem('currentUser')) || {},
    loginStatus: localStorage.getItem('loginStatus') === 'true',
            errorOccured:false,
            errorMessage:{},


        },
        reducers:{
            resetState:(state,action)=>{
                state.currentUser={}
                state.isPending=false
                state.loginStatus=false
                state.errorMessage={}
                state.errorOccured=false
                localStorage.removeItem('currentUser');
            localStorage.removeItem('loginStatus');
            sessionStorage.removeItem('Token');
            }
        },
        extraReducers:(builder)=>{
            builder
            .addCase(userfarmerThunk.pending,(state,action)=>{
                state.isPending=true
            })
            .addCase(userfarmerThunk.fulfilled,(state,action)=>{
                //(action)
                state.isPending=false
                state.errorOccured=false
                state.loginStatus=true
                state.errorMessage=""
                state.currentUser=action.payload

            })
            .addCase(userfarmerThunk.rejected,(state,action)=>{
                state.isPending=false
                state.errorOccured=true
                state.loginStatus=false
                state.errorMessage=action.payload
                state.currentUser=""
            })
        }

       
    }
)
export const {resetState}=UserFarmer.actions

export default UserFarmer.reducer
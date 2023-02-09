import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../../utils/axios'
import axiosss from 'axios'
const initialState={
    user:null,
    token:null,
    isloading:false,
    status:null
}

export const loginUser=createAsyncThunk('auth/loginUser',
async({username,password})=>{
try {
    const {data}=await axios.post('/auth/login',{username,
        password})

        if(data.token){
            window.localStorage.setItem('token',data.token)

        }
        return data
    
} catch (error) {
    console.log(error)
}
})
export const getMe=createAsyncThunk('auth/getMe',
async()=>{
try {
    const {data}=await axios.get('/auth/me')

        return data
    
} catch (error) {
    console.log(error)
}
})
export const registerUser=createAsyncThunk('auth/registerUser',
async({username,email,password})=>{
try {
    const {data}=await axios.post('/auth/register',{username,
        email,
        password})

        if(data.token){
            window.localStorage.setItem('token',data.token)

        }
        return data
    
} catch (error) {
    console.log(error)
}
})
export const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        logout:(state)=>{
            state.user=null
            state.token=null
            state.isloading=false
            state.status=null
        }
    },
    extraReducers:{
        [registerUser.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [registerUser.fulfilled]: (state, action) => {
            console.log("Payload", action.payload)
            state.isLoading = false
            state.status = action.payload.message
            state.user = action.payload.newUser
            state.token = action.payload.token
            console.log("Payload", action)
        },
        [registerUser.rejectWithValue]: (state, action) => {
            state.status = action.payload.message
            state.isloading=false;
        },

        //Login
        [loginUser.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [loginUser.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = action.payload.message
            state.user = action.payload.newUser
            state.token = action.payload.token
        },
        [loginUser.rejectWithValue]: (state, action) => {
            state.status = action.payload.message
            state.isloading=false;
        },
             //getMe
             [getMe.pending]: (state) => {
                state.isLoading = true
                state.status = null
            },
            [getMe.fulfilled]: (state, action) => {
                state.isLoading = false
                state.status = null
                state.user = action.payload?.newUser
                state.token = action.payload?.token
            },
            [getMe.rejectWithValue]: (state, action) => {
                state.status = action.payload.message
                state.isloading=false;
            },
    }
})

export const checkIsAuth=(state)=>Boolean(state.auth.token)
export const {logout}=authSlice.actions
export default authSlice.reducer
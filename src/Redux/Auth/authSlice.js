import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login,registerUser,verifyOTP } from '../../Services/Authentication/AuthenticationApi';

import 'react-toastify/dist/ReactToastify.css';
const initialState = {
    status: 'idle',
    token: localStorage.getItem('token') || null, 
    role:null,
    wishlist:0,
    cart:0,
    address:null
  };

 

  export const RegisterCustomer = createAsyncThunk(
    'users/RegisterCustomer',
    async (data) => {
      const response = await registerUser(data);
      return response;
    }
  );

  export const LoginUser = createAsyncThunk(
    'users/LoginUser',
    async (data) => {
      const response = await login(data);
      console.log(response.data,'in ap');
      return response;

    }
  );

  export const authSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
      setToken: (state, action) => {
        state.token = action.payload.token;
        state.role = action.payload.role;
        state.wishlist = action.payload.wishlist;
        state.cart = action.payload.cart;
      },
      setAddress:(state,action) =>{
        console.log("setAddress",action.payload)
          state.address = action.payload;
      },
      getCartWish :(state,action) => {
        state.wishlist = action.payload.wishlist;
        state.cart = action.payload.cart
      },
    },
    extraReducers: (builder) => {
      builder
        
   .addCase(RegisterCustomer.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(RegisterCustomer.fulfilled, (state, action) => {
          state.status = 'idle';
          state.UserLoginIn = action.payload;
        })
        .addCase(LoginUser.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(LoginUser.rejected, (state, action) => {
          state.status = 'idle';
          state.UserLoginIn = action.payload;
        })
        .addCase(LoginUser.fulfilled, (state, action) => {
          state.status = 'idle';
          state.token = action.payload.data
        });
    },
  });

  export const { setToken } = authSlice.actions;
  export const {getCartWish} = authSlice.actions;
  export const { setAddress} = authSlice.actions
  export const selectedLoggerInUser =(state) => state.auth;
  export const SendAddress = (state) => state.auth


 
   export default  authSlice.reducer
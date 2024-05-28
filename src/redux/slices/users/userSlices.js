import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { baseURL } from "../../../util/baseURL";

// Register action
export const userRegisterAction = createAsyncThunk('users/register',
    async (user, { rejectWithValue, getState, dispatch }) => {
        console.log(user);
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        try {
            const { data } = await axios.post(`${baseURL}/api/users/register`, user, config);
            return data;
        } catch (error) {
            // frontend error if any
            if (!error?.response) throw error;
            // server error
            else return rejectWithValue(error?.response?.data);
        }
    });

// Login action
export const userLoginAction = createAsyncThunk('users/login',
    async (user, { rejectWithValue, getState, dispatch }) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        try {
            const { data } = await axios.post(`${baseURL}/api/users/login`, user, config);
            //save user into local storage
            localStorage.setItem('userInfo', JSON.stringify(data));
            return data;
        } catch (error) {
            // frontend error if any
            if (!error?.response) throw error;
            // server error
            else return rejectWithValue(error?.response?.data);
        }
    });
// Logout action
export const userLogoutAction = createAsyncThunk('users/logout',
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            localStorage.removeItem('userInfo');
        } catch (error) {
            // frontend error if any
            if (!error?.response) throw error;
            // server error
            else return rejectWithValue(error?.response?.data);
        }
    });

// Fetch all users
    export const fetchAllUsers = createAsyncThunk('users/fetch',
    async (fetchUsers, { rejectWithValue, getState, dispatch }) => {
        const user = getState()?.users;
        const { userAuth } = user;
        // config
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`,
            },
        };
        try {
            const { data } = await axios.get(`${baseURL}/api/users`, config);
            return data;
        } catch (error) {
            // frontend error if any
            if (!error?.response) throw error;
            // server error
            else return rejectWithValue(error?.response?.data);
        }
    });

// get user from local storage and initialized to initialState
const userLoginFormStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

// user slices
const userSlices = createSlice({
    name: 'user',
    initialState: {
        userAuth: userLoginFormStorage
    },
    extraReducers: (builder) => {
        // Register
        builder.addCase(userRegisterAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(userRegisterAction.fulfilled, (state, action) => {
            state.loading = false;
            state.registered = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(userRegisterAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
        // Login
        builder.addCase(userLoginAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(userLoginAction.fulfilled, (state, action) => {
            state.loading = false;
            state.userAuth = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(userLoginAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
        // Logout
        builder.addCase(userLogoutAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(userLogoutAction.fulfilled, (state, action) => {
            state.loading = false;
            state.userAuth = undefined;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(userLogoutAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
        // fetch users
        builder.addCase(fetchAllUsers.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.userList = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(fetchAllUsers.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
    }
});


export default userSlices.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const register = createAsyncThunk('auth/register', async(userData, {rejectWithValue}) => {
    try {
        const {data} = await axios.post('/api/auth/register', userData);
        return data;
    } catch(error) {
        return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
});

export const login = createAsyncThunk('auth/login', async(userData, {rejectWithValue}) => {
    try {
        const {data} = await axios.post('/api/auth/login', userData);
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
});

export const logout = createAsyncThunk('auth/logout', async(_, {rejectWithValue}) => {
    try {
        await axios.post('/api/auth/logout');
    } catch(error) {
        return rejectWithValue(error.response?.data?.message || 'Logout failed');
    }
});

export const getMe = createAsyncThunk('auth/getMe', async(_, {rejectWithValue}) => {
    try {
        const {data} = await axios.get('/api/auth/me');
        return data;
    } catch(error) {
        return rejectWithValue(error.response?.data?.message || 'Fetching user data failed');
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isAuthenticated: false,
        loading: true,
        error: null
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
            })
            .addCase(register.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload;
            })
            .addCase(login.pending, (state) => {
              state.loading = true;
              state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
              state.loading = false;
              state.isAuthenticated = true;
              state.user = action.payload.user;
            })
            .addCase(login.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
                state.lodading = false;
            })
            .addCase(getMe.pending, (state) => {
              state.loading = true;
              state.error = null;
            })
            .addCase(getMe.fulfilled, (state, action) => {
              state.loading = false;
              state.isAuthenticated = true;
              state.user = action.payload.user;
            })
            .addCase(getMe.rejected, (state) => {
              state.loading = false;
              state.isAuthenticated = false;
              state.user = null;
            });
    }
});

export const {clearError} = authSlice.actions;
export default authSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
    user: null,
    token: null,
    isLoading: false,
    status: null,
}

export const registerUser = createAsyncThunk(
    'auth/registerationOfUser',
    async ({ username, password }) => {
        try {
            const { data } = await axios.post('/auth/register', {
                username,
                password,
            })
            if (data.token) {
                window.localStorage.setItem('token', data.token)
            }
            return data
        } catch (error) {
            console.log(error)
        }
    },
)

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ username, password }) => {
        try {
            const { data } = await axios.post('/auth/authorization', {
                username,
                password,
            })
            if (data.token) {
                window.localStorage.setItem('token', data.token)
            }
            return data
        } catch (error) {
            console.log(error)
        }
    },
)

export const getUser = createAsyncThunk(
    'auth/getUser',
    async () => {
        try {
            const { data } = await axios.get('/auth/my-page')
            return data
        } catch (error) {
            console.log(error)
        }
    },
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null
            state.token = null
            state.isLoading = false
            state.status = null
        },
    },
    extraReducers: (builder) => {
        builder
        //Регистрация
          .addCase(registerUser.pending, (state) => {
            state.isLoading = true;
            state.status = null;
          })
          .addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = action.payload.message;
            state.user = action.payload.user;
            state.token = action.payload.token;
          })
          .addCase(registerUser.rejected, (state, action) => {
            state.status = action.payload?.message;
            state.isLoading = false;
          })
          //Авторизация
          .addCase(loginUser.pending, (state) => {
            state.isLoading = true;
            state.status = null;
          })
          .addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = action.payload.message;
            state.user = action.payload.user;
            state.token = action.payload.token;
          })
          .addCase(loginUser.rejected, (state, action) => {
            state.status = action.payload?.message;
            state.isLoading = false;
          })
          //Получение данных
          .addCase(getUser.pending, (state) => {
            state.isLoading = true;
            state.status = null;
          })
          .addCase(getUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = null;
            state.user = action.payload?.user;
            state.token = action.payload?.token;
          })
          .addCase(getUser.rejected, (state, action) => {
            state.status = action.payload.message;
            state.isLoading = false;
          });
    },
});

export const isAuth = state => Boolean(state.auth.token);


export const {logout} = authSlice.actions;
export default authSlice.reducer;
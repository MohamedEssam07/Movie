import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { axiosValidation } from '../../config/axios.config'

import CookieService from '../../services/CookieService';
import type { ILogin } from '../../Interfaces';
import { createStandaloneToast } from '@chakra-ui/react';

const { toast } = createStandaloneToast()


interface LoginState {
    loading: boolean;
    data: any;
    error: string | null;
}
export const initialState: LoginState = {
    loading: false,
    data: null,
    error: null
}
export const userLogin = createAsyncThunk<any, ILogin, { rejectValue: string }>("login/loginSlice", async (data, thunkApi) => {
    const { rejectWithValue } = thunkApi
    try {
        const res = await axiosValidation.post("/api/auth/local", data)
        return res.data
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.error?.message)
    }
})

export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.pending, (state) => {
                state.loading = true
            }
            )
            .addCase(userLogin.fulfilled, (state, action) => {
                state.loading = false,
                    state.data = action.payload
                const date = new Date()
                const IN_DAYS = 3
                const EXPIRES_IN_DAYS = 1000 * 60 * 60 * 24 * IN_DAYS
                date.setTime(date.getTime() + EXPIRES_IN_DAYS)
                const options = { path: "/", expires: date }
                CookieService.set("jwt", action.payload.jwt, options)
                CookieService.set("user", action.payload.user, options)
                toast({
                    title: `Welcome back, ${action.payload.user.username}! Redirecting...`,

                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                })


            })
            .addCase(userLogin.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload ?? "uknownError"
                toast({
                    title: `${action?.payload}`,
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                })
            })
    }
})

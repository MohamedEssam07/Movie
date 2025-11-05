import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { axiosinstance, axiosValidation } from '../../config/axios.config'

import CookieService from '../../services/CookieService';
import type { ILogin, IRegister } from '../../Interfaces';
import { createStandaloneToast } from '@chakra-ui/react';

const { toast } = createStandaloneToast()


interface RegisterState {
    loading: boolean;
    data: any;
    error: string | null;
}
export const initialState: RegisterState = {
    loading: false,
    data: null,
    error: null
}
export const userRegister = createAsyncThunk<any, IRegister, { rejectValue: string }>("register/userRegister", async (data, thunkApi) => {
    const { rejectWithValue } = thunkApi
    try {
        const res = await axiosValidation.post("/api/auth/local/register", data)
        return res.data  // ⬅️ الحتة دي هي اللي بترجع تبقى action.payload

    } catch (error: any) {
        return rejectWithValue(error.response?.data?.error?.message)
    }
})

export const registerSlice = createSlice({
    name: "register",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userRegister.pending, (state) => {
                state.loading = true
            }
            )
            .addCase(userRegister.fulfilled, (state, action) => {
                state.loading = false,
                    state.data = action.payload
                const date = new Date()
                const IN_DAYS = 3
                const EXPIRES_IN_DAYS = 1000 * 60 * 60 * 24 * IN_DAYS
                date.setTime(date.getTime() + EXPIRES_IN_DAYS)
                const options = { path: "/", expires: date }
                CookieService.set("jwt", action.payload.jwt, options)
                CookieService.set("user", action.payload.user, options)
                console.log()
                toast({
                    title: `Registration successful , Welcome ${action.payload.user.username} 
                    Redirecting...
                    `,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })


            })
            .addCase(userRegister.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload ?? "uknownError"
                console.log("actionpaylod : ", action.payload)
                toast({
                    title: `${action?.payload}`,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                })
            })
    }
})

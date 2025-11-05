
import { createSlice } from '@reduxjs/toolkit'

interface IinitialState {
    currMoviePage: number;
    currTvPage: number;
}
const initialState: IinitialState = {
    currMoviePage: 1,
    currTvPage: 1
}
export const currPage = createSlice({
    name: "currPage",
    initialState,
    reducers: {
        saveCurrMoviePage: (state, action) => {
            state.currMoviePage = action.payload
        },
        saveCurrTvPage: (state, action) => {
            state.currTvPage = action.payload
        },
    }
})

export const { saveCurrMoviePage, saveCurrTvPage } = currPage.actions
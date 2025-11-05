
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { useToast } from '@chakra-ui/react'
import { createStandaloneToast } from '@chakra-ui/react';
const { toast } = createStandaloneToast();
interface IinitialState {

    page: number,
    input: string,
}
const initialState: IinitialState = {
    page: 1,
    input: "",
}
export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        saveSearchInput: (state, action: PayloadAction<string>) => {
            state.input = action.payload
            state.page = 1
        },
        savePage: (state, action: PayloadAction<number>) => {
            state.page = action.payload
        }

    }
}
)

export const { savePage, saveSearchInput } = searchSlice.actions
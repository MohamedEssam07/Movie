
import { createSlice } from '@reduxjs/toolkit'


import { createStandaloneToast } from '@chakra-ui/react';

interface IinitialState {
    input: string
}
const initialState: IinitialState = {
    input: ""
}
export const inputSlice = createSlice({
    name: "inputt",
    initialState,
    reducers: {
        getInput: (state, action) => {
            state.input = action.payload
        }



    }
}
)

export const { getInput } = inputSlice.actions
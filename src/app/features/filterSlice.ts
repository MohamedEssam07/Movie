
import { createSlice } from '@reduxjs/toolkit'

interface IinitialState {
    filterItems: {
        type: string
        year: string
        genre: {
            gen: {
                name: string, id: number
            }
        }[]
    }
}
const initialState: IinitialState = {
    filterItems: {
        type: "",
        year: "",
        genre: [],
    }
}
export const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setFilterItems: (state, action) => {
            state.filterItems = action.payload
        },
        deleteFilterItems: (state) => {
            state.filterItems = initialState.filterItems
        }
    }
})

export const { setFilterItems, deleteFilterItems } = filterSlice.actions
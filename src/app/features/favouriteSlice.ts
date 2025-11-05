
import { createSlice } from '@reduxjs/toolkit'

import { useToast } from '@chakra-ui/react'
import { createStandaloneToast } from '@chakra-ui/react';
import type { IProduct } from '../../Interfaces';
const { toast } = createStandaloneToast();
interface IinitialState {
    items: IProduct[]
}
const initialState: IinitialState = {
    items: JSON.parse(localStorage.getItem("favouritemovies") || "[]")
}
export const favouriteSlice = createSlice({
    name: "favourite",
    initialState,
    reducers: {
        addFavourite: (state, action) => {
            const exists = state.items.find((item: IProduct) => item.id === action.payload.id)
            if (!exists) {
                state.items = [...state.items, action.payload]
                localStorage.setItem("favouritemovies", JSON.stringify(state.items))
                toast({
                    title: `${action.payload.title ? action.payload.title : action.payload.name} Added To Favourites`,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })
            }
            else {
                toast({
                    title: 'Already Added ',
                    status: 'info',
                    duration: 3000,
                    isClosable: true,
                })
            }

        },
        removeFavourite: (state, action) => {
            //hyseeb ely el item.d != action.id w hy3ml filter llbna2y 
            state.items = state.items.filter((item: IProduct) => item.id !== action.payload.id)
            localStorage.setItem("favouritemovies", JSON.stringify(state.items))
            toast({
                title: `${action.payload.title ? action.payload.title : action.payload.name} Removed`,
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        },
        removeAllFavourite: (state) => {
            state.items = []
            localStorage.setItem("favouritemovies", JSON.stringify(state.items))
            toast({
                title: 'Removed All',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    }
})

export const { addFavourite, removeFavourite, removeAllFavourite } = favouriteSlice.actions
import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { apiSlice } from './services/apiSlice'
import { favouriteSlice } from './features/favouriteSlice'
import { filterSlice } from './features/filterSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // 👈 دي اللي كنت ناسيها
import { searchSlice } from './features/searchSlice'
import { currPage } from './features/currPage'
import { loginSlice } from './features/LoginSlice'
import { registerSlice } from './features/SignupSlice'
import { inputSlice } from './features/inputSearchSlice'

// إعدادات التخزين
const persistConfig = {
    key: 'filter',
    storage,
}

// نعمل persist للـ filterSlice
const persistedReducer = persistReducer(persistConfig, filterSlice.reducer)

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        favourite: favouriteSlice.reducer,
        filter: persistedReducer,
        search: searchSlice.reducer,
        currPage: currPage.reducer,
        login: loginSlice.reducer,
        register: registerSlice.reducer,
        inputt: inputSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // 👈 مهم علشان يمنع تحذيرات redux-persist
        }).concat(apiSlice.middleware),
})

// الأنواع
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// hook جاهز للاستخدام
export const useAppDispatch: () => AppDispatch = useDispatch

// persist store
export const persistor = persistStore(store)

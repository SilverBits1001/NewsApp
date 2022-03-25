import { configureStore } from "@reduxjs/toolkit";
import bookmarkReducer from '../bookmarked/bookmarkedSlice'

export const store = configureStore({
    reducer:{
        bookmark: bookmarkReducer 
    },
})
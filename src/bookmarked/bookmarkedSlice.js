import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: []
}

export const bookmarkSlice = createSlice({
    name: 'bookmarks',
    initialState,
    reducers: {
        add: (state, action) => {

            // setBookmarkedList(bookmarkedList.filter(bookmarked => bookmarked !== currentArticle))
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value = state.value.concat(JSON.stringify(action.payload))
            console.log(state.value.length);
        },
        remove: (state, action) => {

            state.value = state.value.filter(stateItem => stateItem !== JSON.stringify(action.payload))
            console.log(state.value.length);
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { add, remove, incrementByAmount } = bookmarkSlice.actions

export default bookmarkSlice.reducer
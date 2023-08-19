import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: "ui",
    initialState: {
        user: null,
        currentRoom: {},
        isMenuOpen: false,
    },
    reducers: {
        getAuthUser (state, action) {
            state.user = action.payload.authUser;
        },
        getEnteredRoom (state, action) {
            state.currentRoom = action.payload.enteredRoomStats;
        },
        setMenuOpen (state) {
            state.isMenuOpen = !state.isMenuOpen;
        },
    }
})

export const uiActions = uiSlice.actions;

export default uiSlice;
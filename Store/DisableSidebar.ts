import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DisableSideBarState {
    isDisabled: true | false;
}

const disableSideBar = createSlice({
    name: "disableSideBar",
    initialState: {
        isDisabled: false,
    },
    reducers: {
        setDisableSideBar: (state, action:PayloadAction <DisableSideBarState>) => {
            state.isDisabled = action.payload.isDisabled;
        },
    },
})

export const {setDisableSideBar} = disableSideBar.actions;

export default disableSideBar.reducer;


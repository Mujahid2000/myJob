import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = null ; // Default state can be an empty string or any other initial value

const accountSetupTabs = createSlice({
    name: 'accountTabs',
    initialState,
    reducers: {
        setRenderState: (state, action: PayloadAction<String | null>) => {
            console.log(action.payload);
            return action.payload as null; // Ensure the return type matches the expected type
        }
    }
});

export const { setRenderState } = accountSetupTabs.actions;
export default accountSetupTabs.reducer;

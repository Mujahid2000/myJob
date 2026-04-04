import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState: string | null = null;

export const setRenderState = createAction<string | null>('accountTabs/setRenderState');

const accountSetupTabs = createReducer<string | null>(initialState, (builder) => {
    builder.addCase(setRenderState, (_state, action) => {
        console.log(action.payload);
        return action.payload;
    });
});

export default accountSetupTabs;

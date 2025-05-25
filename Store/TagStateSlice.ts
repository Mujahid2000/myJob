import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TagState {
    tags: string[];
}

const initialState: TagState = {
    tags: [],
};

const SelectedTag = createSlice({
    name: "SelectedTag",
    initialState,
    reducers: {
        addTag: (state, action: PayloadAction<string>) => {
            state.tags.push(action.payload);
        },
        removeTag: (state, action: PayloadAction<string>) => {
            // console.log(action.payload)
            state.tags = state.tags.filter(tag => tag !== action.payload);
        },
        clearTags: (state) => {
            state.tags = [];
        },
    },
});

export const { addTag, removeTag, clearTags } = SelectedTag.actions;
export default SelectedTag.reducer;
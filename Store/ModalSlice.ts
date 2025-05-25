import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
    value: boolean;
    jobId: string;
}

const initialState: ModalState = {
    value: false,
    jobId: ''
};

export const ModalOpenSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<{ value: boolean; jobId: string }>) => {
            state.value = action.payload.value;
            state.jobId = action.payload.jobId;
        }
    }
});

export const { openModal } = ModalOpenSlice.actions;

export default ModalOpenSlice.reducer;
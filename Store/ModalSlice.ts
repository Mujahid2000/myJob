import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
    value: boolean;
    jobId: string;
    mailModal: boolean;
}

const initialState: ModalState = {
    value: false,
    jobId: '',
    mailModal: false,
};

export const ModalOpenSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<{ value: boolean; jobId: string }>) => {
            state.value = action.payload.value;
            state.jobId = action.payload.jobId;
        },
        mailModal: (state, action: PayloadAction<{openMail:boolean}>) =>{
            state.mailModal = action.payload.openMail
        }
    }
});

export const { openModal, mailModal } = ModalOpenSlice.actions;

export default ModalOpenSlice.reducer;
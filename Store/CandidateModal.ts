import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
    value: boolean;
    candidateId: string;
}

const initialState: ModalState = {
    value: false,
    candidateId: ''
};

export const candidateModalOpen = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        candidateModal: (state, action: PayloadAction<{ value: boolean; candidateId: string }>) => {
            state.value = action.payload.value;
            state.candidateId = action.payload.candidateId;
        }
    }
});

export const { candidateModal } = candidateModalOpen.actions;

export default candidateModalOpen.reducer;
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IinitialState {
    openModal: boolean
    userId: Number,
}

const initialState: IinitialState = {
    openModal: false,
    userId: 0,
};

const modalSlice = createSlice({
    name: 'modalSlice',
    initialState,
    reducers: {
        setOpenModal(state, action: PayloadAction<Number>){
            state.userId = action.payload;
            state.openModal = true;
        },
        setCloseModal(state){
            state.openModal = false;
        }
    }
});

export const {setOpenModal, setCloseModal} = modalSlice.actions;
export default modalSlice.reducer;

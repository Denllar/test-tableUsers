import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IinitialState {
    firstName: string,
    lastName: string,
    maidenName: string,
    age: string,
    gender: string,
    phone: string,
    city: string,
    street: string,
}


const initialState: IinitialState = {
    firstName: "",
    lastName: "",
    maidenName: "",
    age: "",
    gender: "",
    phone: "",
    city: "",
    street: "",
};

const inputSlice = createSlice({
    name: 'inputSlice',
    initialState,
    reducers: {
        setAddFirstName(state, action: PayloadAction<string>) {
            state.firstName = action.payload;
        },
        setAddLastName(state, action: PayloadAction<string>) {
            state.lastName = action.payload;
        },
        setAddMaidenName(state, action: PayloadAction<string>) {
            state.maidenName = action.payload;
        },
        setAddAge(state, action: PayloadAction<string>) {
            state.age = action.payload;
        },
        setAddGender(state, action: PayloadAction<string>) {
            state.gender = action.payload;
            console.log(state.gender);
        },
        setAddPhone(state, action: PayloadAction<string>) {
            state.phone = action.payload;
        },
        setAddCity(state, action: PayloadAction<string>) {
            state.city = action.payload;
        },
        setAddStreet(state, action: PayloadAction<string>) {
            state.street = action.payload;
        },
        setClearInput(state) {
            state.firstName = "";
            state.lastName = "";
            state.maidenName = "";
            state.age = "";
            state.gender = "";
            state.phone = "";
            state.city = "";
            state.street = "";
        }
    },
});

export const { setAddFirstName, setAddLastName, setAddMaidenName, setAddAge, setAddGender, setAddPhone, setAddCity, setAddStreet, setClearInput } = inputSlice.actions;
export default inputSlice.reducer;

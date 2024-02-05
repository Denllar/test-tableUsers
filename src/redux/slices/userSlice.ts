import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export type usersType = {
    id: Number,
    firstName: String,
    lastName: String,
    maidenName: String,
    age: Number,
    gender: String,
    email: String,
    phone: String,
    username: String,
    password: String,
    birthDate: String,
    image: String,
    bloodGroup: String,
    height: Number,
    weight: Number,
    eyeColor: String,
    hair: {
        color: String,
        type: String,
    },
    domain: String,
    ip: String,
    address: {
        address: String,
        city: String,
        coordinates: {
            lat: Number,
            lng: Number,
        },
        postalCode: String,
        state: String,
        [key: string]: any
    },
    macAddress: String,
    university: String,
    bank: {
        cardExpire: String,
        cardNumber: String,
        cardType: String,
        currency: String,
        iban: String,
    },
    company: {
        address: {
            address: String,
            city: String,
            coordinates: {
                lat: Number,
                lng: Number
            },
            postalCode: String,
            state: String
        },
        department: String,
        name: String,
        title: String
    },
    ein: String,
    ssn: String,
    userAgent: String,
    crypto: {
        coin: String,
        wallet: String,
        network: String
    },
    [key: string]: any,
}

type fetchUsersType = {
    users: usersType[];
    total: Number,
    skip: Number,
    limit: Number
}

export const fetchUsers = createAsyncThunk(
    'users/fetchUsersStatus',
    async () => {
        const data: fetchUsersType = await fetch('https://dummyjson.com/users').then(res => { //запрос с помощью https://dummyjson.com/users/search?q=${name} ищет только имя и фамилию. Если в имя ввести Terry, то он покажет и другого пользователя с ФАМИЛИЕЙ Teryy.
            return res.json()
        });
        return data;
    }
)

enum Status {
    LOADING = 'loading', 
    SUCCESS = 'success',
    ERROR = 'error',
}

interface IinitialState {
    items: usersType[],
    status: Status 
}

const initialState: IinitialState = {
    items: [],
    status: Status.LOADING
};

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        builder.addCase(fetchUsers.pending, (state) => {
            state.status = Status.LOADING;
            state.items = [];
        }),
            builder.addCase(fetchUsers.fulfilled, (state, action) => {
                state.items = action.payload.users;
                state.status = Status.SUCCESS
            }),
            builder.addCase(fetchUsers.rejected, (state) => {
                state.status = Status.ERROR;
                state.items = [];
            })
    }
});

export default userSlice.reducer;

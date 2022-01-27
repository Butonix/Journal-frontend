import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AppThunk, RootState} from "../store";
import {LoginUserResponse} from "../../utils/api/types";


export interface UserState {
    data: LoginUserResponse | null
}

const initialState: UserState = {
    data: null
}

// export const incrementAsync = createAsyncThunk(
//     'counter/fetchCount',
//     async () => {
//     }
// )

export const userSlice = createSlice({
    name: 'user',
    initialState,

    reducers: {
        setUserData:(state,action:PayloadAction<LoginUserResponse>)=>{
            state.data = action.payload
        }
    },

    extraReducers: (builder) => {},
})

export const {setUserData} = userSlice.actions
export const selectUserData = (state: RootState) => state.user.data
export const userReducer = userSlice.reducer

import {createSlice} from '@reduxjs/toolkit'
import {RootState} from "../store";


export interface UserState {
    leftSide: boolean
    rightSide: boolean
}

const initialState: UserState = {
    leftSide: true,
    rightSide: true
}

export const layoutSlice = createSlice({
    name: 'layout',
    initialState,

    reducers: {
        setLeftMenu: (state) => {
            state.leftSide = !state.leftSide
        },
        setRightMenu: (state) => {
            state.rightSide = !state.rightSide
        }
    },
})

export const {setLeftMenu, setRightMenu} = layoutSlice.actions
export const selectLeftMenu = (state: RootState) => state.layout.leftSide
export const selectRightMenu = (state: RootState) => state.layout.rightSide
export const layoutReducer = layoutSlice.reducer

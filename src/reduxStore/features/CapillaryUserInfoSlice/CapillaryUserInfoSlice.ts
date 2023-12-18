import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isUserDataFromCapillary: false,
    userDataFromCapillary: {},
}


export const UserDataFromCapillarySlice = createSlice({
    name: "userDataFromCapillary",
    initialState,
    reducers: {
        updateUserData: (state, action) => {
            state.userDataFromCapillary = action.payload;
            state.isUserDataFromCapillary = true;
            console.log("action", action);
        },
        resetUserData: (state) => {
            state.userDataFromCapillary = {};
            state.isUserDataFromCapillary = false;
        }
        
    }
})

export const { updateUserData, resetUserData } = UserDataFromCapillarySlice.actions

const UserDataFromCapillarySliceReducer = UserDataFromCapillarySlice.reducer;
export default UserDataFromCapillarySliceReducer;

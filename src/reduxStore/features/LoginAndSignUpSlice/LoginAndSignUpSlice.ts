import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated: false,
    user: {
        email: "",
        name: "",
        user_id: "",
        mobile: ""
    },
    token: {
        accessToken: "",
        idToken: ""
    },
    capUser: {}
}

export const LoginAndSignUpSlice = createSlice({
    name: "LoginAndSignUp",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
            console.log("action", action);

        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = {
                email: "",
                name: "",
                user_id: "",
                mobile: "",
            };
            state.token = {
                accessToken: "",
                idToken: ""
            }
            state.capUser = {}
        },
        updateToken: (state, action) => {
            state.token = {
                accessToken: action.payload.accessToken? action.payload.accessToken : action.payload.access_token,
                idToken: action.payload.idToken ? action.payload.idToken : action.payload.id_token
            }
        },
        updateCapUser: (state, action) => {
            state.capUser = action.payload
        }
    }

})


export const { loginSuccess, logout, updateToken } = LoginAndSignUpSlice.actions

const LoginAndSignUpSliceReducer = LoginAndSignUpSlice.reducer;
export default LoginAndSignUpSliceReducer;
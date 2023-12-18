import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cardData: {
        firstName: "",
        lastName: "",
        cardNumber: ""
    },
    isEmailPresent: false,
    email: "",
    isCardDataAvailable: false,
    isRegistering: false,
    registrationDetails: {
        mobile: "",
        email: "",
        password: "",
    },
    isNewsLetterInfoAvailable: false,
    newsLetterInfo: {
        email: ""
    }

}


export const CardNumberRegistrationSlice = createSlice({
    name: "cardNumberRegistration",
    initialState,
    reducers: {

        updateCardData: (state, action) => {
            state.cardData = action.payload;
            state.isCardDataAvailable = true;
            console.log("action", action);
        },
        updateEmailData: (state, action) => {
            state.isEmailPresent = true;
            state.email = action.payload
        },
        updateRegistrationDetails: (state, action) => {
            state.isRegistering = true;
            state.registrationDetails = {
                mobile: action.payload.mobile,
                email: action.payload.email,
                password: action.payload.password,
            }
        },
        updateNewsLetterInfo: (state, action) => {        
            state.isNewsLetterInfoAvailable = true;
            state.newsLetterInfo = {
                email: action.payload.identifiers.filter((items : any) => {
                    return items.type === "email"
                })[0].value,
            }
        },
        resetEmail: (state) => {
            state.isEmailPresent = false;
            state.email = ""
        },
        resetCardData: (state) => {
            state.cardData = {
                firstName: "",
                lastName: "",
                cardNumber: ""
            }
            state.isCardDataAvailable = false;
        },
        resetRegistrationData: (state) => {
            state.isRegistering = false;
            state.registrationDetails = {
                mobile: "",
                email: "",
                password: "",
            }
        },
        resetNewsLetterInfo: (state) => {
            state.isNewsLetterInfoAvailable = false;
            state.newsLetterInfo = {
                email: "",
            }
        }
    }
})

export const { updateCardData, updateEmailData, updateRegistrationDetails, updateNewsLetterInfo, resetEmail, resetCardData, resetRegistrationData, resetNewsLetterInfo } = CardNumberRegistrationSlice.actions

const CardNumberRegistrationReducer = CardNumberRegistrationSlice.reducer;
export default CardNumberRegistrationReducer;
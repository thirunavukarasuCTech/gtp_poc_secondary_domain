import * as Yup from 'yup';

export const registrationValidationSchema = Yup.object({
    mobile: Yup.string()
        .required("Required!"),
    email: Yup.string()
        .email("Invalid email format")
        .required("Required!"),
    password: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Required!"),
    confirm_password: Yup.string()
        .oneOf([Yup.ref("password")], "Password's not match")
        .required("Required!")
})


export const loginValidationSchema = Yup.object({
    userName: Yup.string()
        .required("Required!"),
    password: Yup.string()
        .required("Required!"),
})

export const cardNumberValidationSchema = Yup.object({
    firstName: Yup.string()
        .required("Required!"),
    lastName: Yup.string()
        .required("Required!"),
    birthdate: Yup.date().required('Date is required'),
    cardNumber: Yup.string()
        .required("Required!"),
})

export const completeProfileValidationSchema = Yup.object({
    // firstNameKanji: Yup.string().required('First Name is required'),
    // lastNameKanji: Yup.string().required('Last Name is required'),
    firstNameKatakana: Yup.string().required('First Name is required'),
    lastNameKatakana: Yup.string().required('Last Name is required'),
    birthdate: Yup.date().required('Date is required'),
    gender: Yup.string().required('Gender is required'),
    prefecture: Yup.string().required('Prefecture is required'),
    postalCode: Yup.string()
        .matches(/^[0-9]{5}$/, 'Invalid postal code')
        .required('Postal Code is required'),
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    country: Yup.string().required('Country is required'),
    subscription: Yup.boolean(),
    termsAndConditions: Yup.boolean().oneOf([true], 'Checkbox must be checked'),
});

export const completeProfileWithCardNumberValidationSchema = Yup.object({
    // firstNameKanji: Yup.string().required('First Name is required'),
    // lastNameKanji: Yup.string().required('Last Name is required'),
    email: Yup.string()
        .email("Invalid email format")
        .required("Required!"),
    password: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Required!"),
    confirm_password: Yup.string()
        .oneOf([Yup.ref("password")], "Password's not match")
        .required("Required!"),
    firstNameKatakana: Yup.string().required('First Name is required'),
    lastNameKatakana: Yup.string().required('Last Name is required'),
    birthdate: Yup.date().required('Date is required'),
    gender: Yup.string().required('Gender is required'),
    prefecture: Yup.string().required('Prefecture is required'),
    postalCode: Yup.string()
        .matches(/^[0-9]{5}$/, 'Invalid postal code')
        .required('Postal Code is required'),
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    country: Yup.string().required('Country is required'),
    subscription: Yup.boolean(),
    termsAndConditions: Yup.boolean().oneOf([true], 'Checkbox must be checked'),
});

export const completeProfileForNewsLetterValidationSchema = Yup.object({
    // firstNameKanji: Yup.string().required('First Name is required'),
    // lastNameKanji: Yup.string().required('Last Name is required'),
    email: Yup.string()
        .email("Invalid email format")
        .required("Required!"),
    password: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Required!"),
    confirm_password: Yup.string()
        .oneOf([Yup.ref("password")], "Password's not match")
        .required("Required!"),
    mobile: Yup.string()
        .required("Required!"),
    firstNameKatakana: Yup.string().required('First Name is required'),
    lastNameKatakana: Yup.string().required('Last Name is required'),
    birthdate: Yup.date().required('Date is required'),
    gender: Yup.string().required('Gender is required'),
    prefecture: Yup.string().required('Prefecture is required'),
    postalCode: Yup.string()
        .matches(/^[0-9]{5}$/, 'Invalid postal code')
        .required('Postal Code is required'),
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    country: Yup.string().required('Country is required'),
    subscription: Yup.boolean(),
    termsAndConditions: Yup.boolean().oneOf([true], 'Checkbox must be checked'),
});

export const forgetPasswordEmailValidationSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email format")
        .required("Required!"),
})


export const forgetPasswordMobileValidationSchema = Yup.object({
    mobile: Yup.string()
        .required("Required!"),
})

export const forgetPasswordCardNumberValidationSchema = Yup.object({
    firstName: Yup.string()
        .required("Required!"),
    lastName: Yup.string()
        .required("Required!"),
    birthdate: Yup.date().required('Date is required'),
    cardNumber: Yup.string()
        .required("Required!"),
})


export const forgetPasswordDropDownValidationSchema = Yup.object().shape({
    dropdownField: Yup.string(),
});

export const myProfileValidationSchema = Yup.object().shape({
    firstNameKatakana: Yup.string().required('First Name is required'),
    lastNameKatakana: Yup.string().required('Last Name is required'),
    birthdate: Yup.date().required('Date is required'),
    gender: Yup.string().required('Gender is required'),
    address: Yup.string().required('Address is required'),
    country: Yup.string().required('Country is required'),
    mobile: Yup.string(),
    email: Yup.string()
})

export const newsLetterValidationSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email format")
        .required("Required!"),
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),

})
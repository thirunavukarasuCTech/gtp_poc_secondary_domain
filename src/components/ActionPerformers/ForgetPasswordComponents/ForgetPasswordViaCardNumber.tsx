import React from 'react'
import GTPInput from '../../DataProviders/GTPInput'
import GTPButton from '../../DataProviders/GTPButton'
import { useFormik } from 'formik';
import { forgetPasswordCardNumberValidationSchema } from '../../../utils/FormValidation/ValidationSchema';
import { capillaryLookup, lookupUserInAuth0, resetPasswordInAuth0 } from '../../../utils/ApiService/GTPApis';
import { ToastMessage } from '../../../utils/ToastService/toast';
import { useDispatch } from 'react-redux';
import { updateCardData, updateEmailData } from '../../../reduxStore/features/CardNumberRegistrationSlice/CardNumberRegistrationSlice';
import GTPDatePicker from '../../DataProviders/GTPDatePicker';

const ForgetPasswordViaCardNumber = ({ handleModalSwitch }: any) => {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            birthdate: "",
            cardNumber: ""
        },
        validationSchema: forgetPasswordCardNumberValidationSchema,
        onSubmit: values => {
            handleSubmit(values);
        }
    });
    const isValidInfoProvided = (res: any, values: any) => {
        let isValid = true;
        const inputDate = new Date(res.data.extendedFields.dob);
        const formattedDate = `${inputDate.getFullYear()}/${(inputDate.getMonth() + 1).toString().padStart(2, '0')}/${inputDate.getDate().toString().padStart(2, '0')}`;
        const firstName = res.data.profiles[0].firstName
        const lastName = res.data.profiles[0].lastName
        if (formattedDate !== values.birthdate) {
            ToastMessage("Error", "Given birthdate does not match with the card info.")
            return false;
        }
        if (firstName !== values.firstName) {
            ToastMessage("Error", "Given first name does not match with the card info.")
            return false;
        }
        if (lastName !== values.lastName) {
            ToastMessage("Error", "Given last name does not match with the card info.")
            return false;
        }
        return isValid;
    }
    const handleSubmit = async (values: any) => {
        const res = await capillaryLookup("cardnumber", values.cardNumber)
        if (res && res.status === 200 && res.data && res.data.cardDetails) {
            dispatch(updateCardData(values))
            ToastMessage("Success", "Card number is present in Capillary.");
            if (isValidInfoProvided(res, values)) {
                const isEmailPresent = res.data.profiles[0].identifiers.filter((identifier: any) => {
                    return identifier.type === "email";
                })
                if (isEmailPresent[0]) {
                    ToastMessage("Success", "Email is present in Capillary.");
                    dispatch(updateEmailData(isEmailPresent[0].value))
                    const lookupAuth0Response = await lookupUserInAuth0(isEmailPresent[0].value);
                    if (lookupAuth0Response && lookupAuth0Response.status === 200 && lookupAuth0Response.data && lookupAuth0Response.data[0]) {
                        ToastMessage("Success", "User is present in Auth0");
                        const resetPasswordResponse = await resetPasswordInAuth0(isEmailPresent[0].value);
                        if (resetPasswordResponse && resetPasswordResponse.status === 200) {
                            ToastMessage("Success", "We have just sent an email to reset the password.")
                            handleModalSwitch();
                        }
                    } else {
                        ToastMessage("Error", "User is not there in Auth0");
                        handleModalSwitch("Complete Profile");
                    }
                } else {
                    ToastMessage("Error", "Email is not there in Capillary");
                    handleModalSwitch("Complete Profile");
                }
            }


        } else {
            ToastMessage("Error", "Card number is not there in Capillary");
        }
    }
    return (
        <>
            <div className="popup-form">
                <GTPInput placeholder='Enter First Name'
                    name="firstName"
                    id="firstName"
                    onChangeText={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName}
                    isError={formik.errors.firstName && formik.touched.firstName}
                    error={formik.errors.firstName}
                />
                <GTPInput placeholder='Enter Last Name'
                    name="lastName"
                    id="lastName"
                    onChangeText={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName}
                    isError={formik.errors.lastName && formik.touched.lastName}
                    error={formik.errors.lastName}
                />
                <GTPDatePicker
                        label={"Birthday"}
                        onBlur={formik.handleBlur}
                        name={"Birthday"}
                        isError={formik.errors.birthdate}
                        error={formik.errors.birthdate && formik.touched.birthdate}
                        setFieldValue={formik.setFieldValue}
                    />
                <GTPInput placeholder='Enter Card Number'
                    name="cardNumber"
                    id="cardNumber"
                    onChangeText={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.cardNumber}
                    isError={formik.errors.cardNumber && formik.touched.cardNumber}
                    error={formik.errors.cardNumber}
                />
            </div>
            <div className="sign-in-button d-flex flex-column align-items-center">
                <GTPButton buttonType={"submit"} buttonText={"GO"} disabled={false} onClickAction={formik.handleSubmit} />
            </div>

            {/* <CardNumberBasedRegistration handleModalSwitch = {handleModalSwitch}/> */}
        </>
    )
}

export default ForgetPasswordViaCardNumber
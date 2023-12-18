import React from 'react'
import GTPInput from '../../DataProviders/GTPInput'
import GTPButton from '../../DataProviders/GTPButton'
import { useFormik } from 'formik';
import { forgetPasswordEmailValidationSchema } from '../../../utils/FormValidation/ValidationSchema';
import { capillaryLookup, lookupUserInAuth0, resetPasswordInAuth0 } from '../../../utils/ApiService/GTPApis';
import { ToastMessage } from '../../../utils/ToastService/toast';

const ForgetPasswordViaEmail = ({ handleModalSwitch }: any) => {
    const formik = useFormik({
        initialValues: {
            email: ""
        },
        validationSchema: forgetPasswordEmailValidationSchema,
        onSubmit: values => {
            handleSubmitFunc(values)
        }
    });

    const handleSubmitFunc = async (values: any) => {
        const res = await capillaryLookup("email", values.email)
        if (res && res.status === 200 && res.data && !res.data.errors) {
            ToastMessage("Success", "User is present in Capillary");
            const lookupAuth0Response = await lookupUserInAuth0(values.email);
            if (lookupAuth0Response && lookupAuth0Response.status === 200 && lookupAuth0Response.data && lookupAuth0Response.data[0] && lookupAuth0Response.data[0].email) {
                ToastMessage("Success", "User is there in Auth0");
                const resetPasswordResponse = await resetPasswordInAuth0(values.email);
                if (resetPasswordResponse && resetPasswordResponse.status === 200) {
                    ToastMessage("Success", "We have just sent an email to reset the password.")
                    handleModalSwitch();
                }
            } else {
                ToastMessage("Error", "User is not there in Auth0");
                ToastMessage("Normal","Go with registration flow instead.")
            }
        } else {
            ToastMessage("Error", "User is not present in Capillary");

        }
    }
    const { handleChange, handleSubmit, handleBlur, values, errors, touched } = formik
    return (
        <>
            <div className="popup-form">
                <GTPInput placeholder='Enter Email Address'
                    name="email"
                    id="email"
                    onChangeText={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    isError={errors.email && touched.email}
                    error={errors.email}
                />
            </div>
            <div className="sign-in-button d-flex flex-column align-items-center">
                <GTPButton buttonType={"submit"} buttonText={"SEND LINK"} disabled={false} onClickAction={handleSubmit} />

            </div>
        </>
    )
}

export default ForgetPasswordViaEmail
import { useFormik } from 'formik';
import React from 'react'
import GTPInput from '../../DataProviders/GTPInput';
import GTPButton from '../../DataProviders/GTPButton';
import { forgetPasswordMobileValidationSchema } from '../../../utils/FormValidation/ValidationSchema';
import { capillaryLookup, lookupUserInAuth0, resetPasswordInAuth0 } from '../../../utils/ApiService/GTPApis';
import { ToastMessage } from '../../../utils/ToastService/toast';

const ForgetPasswordViaMobile = ({ handleModalSwitch }: any) => {
    const formik = useFormik({
        initialValues: {
            mobile: ""
        },
        validationSchema: forgetPasswordMobileValidationSchema,
        onSubmit: values => {
            handleSubmitFunc(values)
        }
    });

    const handleSubmitFunc = async (values: any) => {
        const res = await capillaryLookup("mobile", values.mobile)
        if (res && res.status === 200 && res.data && !res.data.errors) {
            ToastMessage("Success", "User is present in Capillary");
            const isEmailPresent = res.data.profiles[0].identifiers.filter((identifier: any) => {
                return identifier.type === "email";
            })

            if (isEmailPresent[0]) {
                ToastMessage("Success", "Email is present in Capillary");
                const lookupAuth0Response = await lookupUserInAuth0(isEmailPresent[0].value);

                if (lookupAuth0Response && lookupAuth0Response.status === 200 && lookupAuth0Response.data && lookupAuth0Response.data[0]) {
                    ToastMessage("Success", "User is there in Auth0");
                    const resetPasswordResponse = await resetPasswordInAuth0(isEmailPresent[0].value);
                    if (resetPasswordResponse && resetPasswordResponse.status === 200) {
                        ToastMessage("Success", "We have just sent an email to reset the password.")
                        handleModalSwitch();
                    }
                } else {
                    ToastMessage("Error", "User is not there in Auth0");
                    ToastMessage("Normal", "Go with registration flow instead.")

                }
            } else {
                ToastMessage("Error", "Email is not present in Capillary.");
                handleModalSwitch("Complete Profile");
            }
        } else {
            ToastMessage("Error", "User is not present in Capillary");
        }
    }
    const { handleChange, handleSubmit, handleBlur, values, errors, touched } = formik

    return (
        <>
            <div className="popup-form">
                <GTPInput placeholder='Enter Phone Number'
                    name="mobile"
                    id="mobile"
                    onChangeText={handleChange}
                    onBlur={handleBlur}
                    value={values.mobile}
                    isError={errors.mobile && touched.mobile}
                    error={errors.mobile}
                />
            </div>
            <div className="sign-in-button d-flex flex-column align-items-center">
                <GTPButton buttonType={"submit"} buttonText={"SEND LINK"} disabled={false} onClickAction={handleSubmit} />
            </div>
        </>
    )
}

export default ForgetPasswordViaMobile
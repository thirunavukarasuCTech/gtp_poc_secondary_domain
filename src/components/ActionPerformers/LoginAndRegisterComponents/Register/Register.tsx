import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { registrationValidationSchema } from '../../../../utils/FormValidation/ValidationSchema';
import GTPInput from '../../../DataProviders/GTPInput';
import GTPButton from '../../../DataProviders/GTPButton';
import { lookupUserInAuth0 } from '../../../../utils/ApiService/GTPApis';
import { useDispatch } from 'react-redux';
import { ToastMessage } from '../../../../utils/ToastService/toast';
import { updateRegistrationDetails } from '../../../../reduxStore/features/CardNumberRegistrationSlice/CardNumberRegistrationSlice';


const Register = ({ handleModalSwitch }: any) => {
    const dispatch = useDispatch()
    const [registrationFormError, setregistrationFormError] = useState('')
    useEffect(() => {

        const timeoutId = setTimeout(() => {
            setregistrationFormError('');
        }, 5000);

        return () => clearTimeout(timeoutId);
    }, [registrationFormError]);

    const formik = useFormik({
        initialValues: {
            mobile: "",
            email: "",
            password: "",
            confirm_password: ""
        },
        validationSchema: registrationValidationSchema,
        onSubmit: values => {
            handleSubmit(values)
        }
    });

    const handleSubmit = async (signupInfo: any) => {
        // signupAndAuthorize(signupInfo, null ,async (err: any, data: any) => {
        //     if (err) {
        //         console.log("Signup erro", err);
        //         if (err.code === "invalid_signup") {
        //             setregistrationFormError("User with the email/mobile already available! Try login!")
        //             ToastMessage("Error", "User already present!")
        //             return;
        //         } else {
        //             setregistrationFormError(err.description)
        //             return;
        //         }
        //     }
        //     setregistrationFormError("");
        //     console.log("Signup success in Auth0", data);
        //     ToastMessage("Success", "Registration successful in Auth0!")
        //     dispatch(updateToken(data))
        //     const res = await capillaryLookup("email",signupInfo.email);
        //     if (res && res.data && res.data.errors) {
        //         console.log("User is not present in capillary");
        //         ToastMessage("Error", "User is not present in capillary")
        //         const addCustomerToCapillary = await addCustomerInCapillary(data);
        //         console.log("User added to capillary", addCustomerToCapillary);
        //         ToastMessage("Success", "User added to Capillary!")
        //     } else {
        //         console.log("User is already present in Capillary");
        //         ToastMessage("Success", "User already present in Capillary!")
        //     }
        //     getUserInfoFromAuth0(data.accessToken, (err: any, data: any) => {
        //         if (err) {
        //             console.log("Error while fetching user with UserInfo endpoint", err);
        //             ToastMessage("Error", "Error while fetching User Info!")
        //             return;
        //         }
        //         console.log("User info Success", data);
        //         ToastMessage("Success", "Successfully fetched User Info!")

        //         getUserInfoInfoFromAuth0ManagementAPI(data.sub, (err: any, data: any) => {
        //             if (err) {
        //                 console.log("Error while fetching user with Management API endpoint", err);
        //                 ToastMessage("Error", "Error while fetching User Info from Management API!")
        //                 return;
        //             }
        //             let user = {
        //                 email: data.email,
        //                 name: data.name,
        //                 user_id: data.user_id,
        //                 mobile: formik.values.mobile
        //             }
        //             dispatch(loginSuccess(user))
        //             console.log("Success signing up From management", data);
        //             ToastMessage("Success", "Successfully fetched User Info from Management API!")
        //             handleModalSwitch("Complete Profile")
        //         })
        //     })
        //     dispatch(resetEmail())

        // })

        let lookupAuth0Response = await lookupUserInAuth0(signupInfo.email);
        if (lookupAuth0Response && lookupAuth0Response.status === 200 && lookupAuth0Response.data && lookupAuth0Response.data[0]) {
            ToastMessage("Error", "Email is already present in Auth0");
            return;
        }

        lookupAuth0Response = await lookupUserInAuth0(signupInfo.mobile);
        if (lookupAuth0Response && lookupAuth0Response.status === 200 && lookupAuth0Response.data && lookupAuth0Response.data[0]) {
            ToastMessage("Error", "Mobile is already present in Auth0");
            return;
        }
        console.log(signupInfo);
        dispatch(updateRegistrationDetails(signupInfo));
        handleModalSwitch("Complete Profile")
    }


    return (
        <>
            <div className="modal-body mb-5 mt-3 p-0" style={{ paddingTop: '70px' }}>
                <div className="popup-form">
                    <GTPInput placeholder='Enter Email Address*' label={"*Mandatory"}
                        name="email"
                        id="email"
                        onChangeText={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        isError={formik.errors.email && formik.touched.email}
                        error={formik.errors.email}
                    />
                    <GTPInput placeholder='Enter Phone Number*'
                        name="mobile"
                        id="mobile"
                        onChangeText={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.mobile}
                        isError={formik.errors.mobile && formik.touched.mobile}
                        error={formik.errors.mobile} />
                    <GTPInput placeholder='Enter Password*' disclaimer={"Must contain a minimum of 6 characters and include at least one number."}
                        name="password"
                        id="password"
                        onChangeText={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        isError={formik.errors.password && formik.touched.password}
                        error={formik.errors.password} />
                    <GTPInput placeholder='Re-enter Password*'
                        name="confirm_password"
                        id="confirm_password"
                        onChangeText={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.confirm_password}
                        isError={formik.errors.confirm_password && formik.touched.confirm_password}
                        error={formik.errors.confirm_password} />
                </div>
                {registrationFormError !== "" && <p className='text-red text-center'>{registrationFormError}</p>}

                <div className="sign-in-button d-flex flex-column align-items-center">
                    <GTPButton buttonType={"submit"} buttonText={"JOIN"} disabled={false} onClickAction={formik.handleSubmit} />
                    <GTPButton buttonText={"Continue with Card Number"} disabled={false} onClickAction={handleModalSwitch} modalChange={true} />
                    {/* <GTPButton buttonText={"Continue with Apple ID"} disabled={false} social="apple" /> */}
                </div>
            </div>
        </>
    )
}

export default Register
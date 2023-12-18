/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import { loginValidationSchema } from '../../../../utils/FormValidation/ValidationSchema';
import GTPInput from '../../../DataProviders/GTPInput';
import GTPButton from '../../../DataProviders/GTPButton';
import { auth0Login, getUserInfoFromAuth0, getUserInfoInfoFromAuth0ManagementAPI, lineLogin } from '../../../../utils/ApiService/GTPApis';
import { useDispatch } from 'react-redux'
import { loginSuccess, updateToken } from '../../../../reduxStore/features/LoginAndSignUpSlice/LoginAndSignUpSlice';
import { ToastMessage } from '../../../../utils/ToastService/toast';

const Login = ({ handleModalSwitch, handleClose }: any) => {
    const dispatch = useDispatch()
    const [loginFormError, setLoginFormError] = useState('')

    const formik = useFormik({
        initialValues: {
            userName: "",
            password: ""
        },
        validationSchema: loginValidationSchema,
        onSubmit: values => {
            handleSubmit(values)
        }

    });

    useEffect(() => {

        const timeoutId = setTimeout(() => {
            setLoginFormError('');
        }, 5000);

        return () => clearTimeout(timeoutId);
    }, [loginFormError]);

    const handleSubmit = (loginInfo: any) => {

        auth0Login(loginInfo, (err: any, data: any) => {
            if (err) {
                console.log("Error", err);
                ToastMessage("Error", err.description)
                setLoginFormError(err.description)
                return;
            }
            setLoginFormError("")
            ToastMessage("Success", "Login Successful!")
            dispatch(updateToken(data))
            getUserInfoFromAuth0(data.accessToken, (err: any, data: any) => {
                if (err) {
                    console.log("Error while fetching user with UserInfo endpoint", err);
                    ToastMessage("Error", "Error while fetching User Info!")
                    return;
                }
                console.log("User info", data);
                ToastMessage("Success", "Successfully fetched User Info!")
                getUserInfoInfoFromAuth0ManagementAPI(data.sub, (err: any, data: any) => {
                    if (err) {
                        console.log("Error while fetching user with Management API endpoint", err);
                        ToastMessage("Error", "Error while fetching User Info from Management API!")
                        return;
                    }
                    let user = {
                        email: data.email,
                        name: data.name,
                        user_id: data.user_id
                    }
                    dispatch(loginSuccess(user))
                    ToastMessage("Success", "Successfully fetched User Info from Management API!")
                    handleClose()
                })
            })
        });
    }
    return (
        <>
            <div className="modal-body mb-5 mt-3 p-0">
                <div className="popup-form">
                    <GTPInput placeholder='Enter Email / Mobile/ Card number'
                        name="userName"
                        id="userName"
                        onChangeText={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.userName}
                        isError={formik.errors.userName && formik.touched.userName}
                        error={formik.errors.userName}
                    />
                    <GTPInput placeholder='Enter Password'
                        inputType={"password"}
                        name="password"
                        id="password"
                        onChangeText={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        isError={formik.errors.password && formik.touched.password}
                        error={formik.errors.password} />
                </div>
                {loginFormError !== "" && <p className='text-red text-center'>{loginFormError}</p>}
                <div className="trigger-action">
                    <a href="javascript:void(0)" onClick={() => {
                        handleModalSwitch("Forget Password")
                    }}>
                        Forgot Password?
                    </a>
                </div>
                <div className="sign-in-button d-flex flex-column align-items-center">
                    <GTPButton buttonType={"submit"} buttonText={"SIGN IN"} disabled={false} onClickAction={formik.handleSubmit} />
                    <GTPButton buttonText={"Continue with Line"} disabled={false} social="line" onClickAction={lineLogin} /> 
                    {/* <GTPButton buttonText={"Continue with Google"} disabled={false} social="line" onClickAction={googleLogin} />  */}
                    {/* <GTPButton buttonText={"Continue with Apple ID"} disabled={false} social="apple" /> */}
                </div>
            </div>
        </>
    )
}

export default Login
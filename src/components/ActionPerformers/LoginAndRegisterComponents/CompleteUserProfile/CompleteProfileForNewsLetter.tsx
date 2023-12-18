/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import GTPButton from '../../../DataProviders/GTPButton'
import GTPCheckBox from '../../../DataProviders/GTPCheckBox'
import GTPDatePicker from '../../../DataProviders/GTPDatePicker'
import GTPRadio from '../../../DataProviders/GTPRadio'
import GTPInput from '../../../DataProviders/GTPInput'
import { useFormik } from 'formik'
import { completeProfileForNewsLetterValidationSchema } from '../../../../utils/FormValidation/ValidationSchema'
import { getUserInfoFromAuth0, getUserInfoInfoFromAuth0ManagementAPI, signupAndAuthorize, updateCustomerWithCardnumber } from '../../../../utils/ApiService/GTPApis'
import { ToastMessage } from '../../../../utils/ToastService/toast'
import { loginSuccess, updateToken } from '../../../../reduxStore/features/LoginAndSignUpSlice/LoginAndSignUpSlice'
import { useDispatch, useSelector } from 'react-redux'
import { resetCardData, resetEmail, resetNewsLetterInfo } from '../../../../reduxStore/features/CardNumberRegistrationSlice/CardNumberRegistrationSlice'


interface CompleteProfileForNewsLetterValues {
    email: string;
    password: string;
    mobile: string;
    confirm_password: string;
    firstNameKatakana: string;
    lastNameKatakana: string;
    birthdate: any;
    gender: string;
    prefecture: string;
    postalCode: string;
    address: string;
    city: string;
    country: string;
    subscription: boolean;
    termsAndConditions: boolean;
}

const CompleteProfileForNewsLetter = ({ handleModalSwitch }: any) => {
    const newsLetterInformation = useSelector((state: any) => state.userState.cardNumberRegistration);
    const userDataFromCapillary = useSelector((state: any) => state.userState.userDataFromCapillary);

    let email;
    if (newsLetterInformation.isNewsLetterInfoAvailable) {
        email = newsLetterInformation.newsLetterInfo.email;
    }
    const [cardRegistrationFormValues, setCardRegistrationFormValues] = useState(
        {

            email: email ? email : "",
            password: "",
            confirm_password: "",
            mobile: "",
            firstNameKatakana: userDataFromCapillary.isUserDataFromCapillary ? userDataFromCapillary.userDataFromCapillary.firstName : "",
            lastNameKatakana: userDataFromCapillary.isUserDataFromCapillary ? userDataFromCapillary.userDataFromCapillary.lastName : "",
            birthdate: userDataFromCapillary.isUserDataFromCapillary ? userDataFromCapillary.userDataFromCapillary.dob : "",
            gender: userDataFromCapillary.isUserDataFromCapillary ? userDataFromCapillary.userDataFromCapillary.gender : "",
            postalCode: userDataFromCapillary.isUserDataFromCapillary ? userDataFromCapillary.userDataFromCapillary.postalCode : "",
            prefecture: userDataFromCapillary.isUserDataFromCapillary ? userDataFromCapillary.userDataFromCapillary.state : "",
            address: userDataFromCapillary.isUserDataFromCapillary ? userDataFromCapillary.userDataFromCapillary.countryOfResidence : "",
            city: userDataFromCapillary.isUserDataFromCapillary ? userDataFromCapillary.userDataFromCapillary.state : "",
            country: userDataFromCapillary.isUserDataFromCapillary ? userDataFromCapillary.userDataFromCapillary.countryOfResidence : "",
            subscription: false,
            termsAndConditions: false,
        }
    )
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: cardRegistrationFormValues,
        validationSchema: completeProfileForNewsLetterValidationSchema,
        onSubmit: (values: any) => {
            handleSubmitFunc(values)
        }
    });
    const modifyData = (data: any) => {
        return {
            "root": {
                "customer": [
                    {
                        "firstname": data.firstNameKatakana,
                        "lastname": data.lastNameKatakana,
                        "mobile": data.mobile,
                        "email": data.email,
                        "type": "LOYALTY",
                        "source": "INSTORE",
                        "custom_fields": {
                            "field": [
                                {
                                    "name": "kanjifirstname",
                                    "value": data.firstNameKatakana
                                },
                                {
                                    "name": "kanjilastname",
                                    "value": data.lastNameKatakana
                                },
                                {
                                    "name": "customer_address",
                                    "value": data.address
                                }

                            ]
                        },
                        "extended_fields": {
                            "field": [
                                {
                                    "name": "dob",
                                    "value": data.birthdate
                                },
                                {
                                    "name": "gender",
                                    "value": data.gender
                                },
                                {
                                    "name": "country_of_residence",
                                    "value": data.country
                                }
                            ]
                        }
                    }
                ]
            }
        }
    }
    const { values, setFieldValue, handleSubmit, handleChange, handleBlur, errors, touched } = formik;

    const handleSubmitFunc = async (signupInfo: CompleteProfileForNewsLetterValues) => {


        signupAndAuthorize(signupInfo, newsLetterInformation, async (err: any, data: any) => {
            if (err) {
                if (err.code === "invalid_signup") {
                    ToastMessage("Error", "User already present!")
                    return;
                } else {
                    ToastMessage("Error", err.description)
                    return;
                }
            }
            ToastMessage("Success", "Registration successful in Auth0!")
            dispatch(updateToken(data));
            getUserInfoFromAuth0(data.accessToken, (err: any, data: any) => {
                if (err) {
                    console.log("Error while fetching user with UserInfo endpoint", err);
                    ToastMessage("Error", "Error while fetching User Info!")
                    return;
                }
                console.log("User info Success", data);
                ToastMessage("Success", "Successfully fetched User Info!")

                getUserInfoInfoFromAuth0ManagementAPI(data.sub, async (err: any, data: any) => {
                    if (err) {
                        console.log("Error while fetching user with Management API endpoint", err);
                        ToastMessage("Error", "Error while fetching User Info from Management API!")
                        return;
                    }
                    let user = {
                        email: data.email,
                        name: data.name,
                        user_id: data.user_id,
                        mobile: data.username,
                    }
                    dispatch(loginSuccess(user))
                    console.log("Success signing up From management", data);
                    ToastMessage("Success", "Successfully fetched User Info from Management API!")
                    console.log("Modified data", modifyData(signupInfo));
                    const res = await updateCustomerWithCardnumber(modifyData(signupInfo))
                    console.log("Update customer in cap response", res);
                    if (res && res.status === 200 && res.data) {
                        ToastMessage("Success", "User profile updated in Capillary.");
                        ToastMessage("Success", "User converted to Loyalty type in Capillary.");
                        handleModalSwitch();
                        dispatch(resetEmail())
                        dispatch(resetNewsLetterInfo());
                        dispatch(resetCardData())
                    }
                })
            })
        })
    }

    return (
        <>
            <div className="modal-body mb-4 mt-3 p-0" style={{ paddingTop: '70px' }}>
                <div className="popup-form">
                    <GTPInput placeholder='Enter Email Address*' label={"*Mandatory"}
                        name="email"
                        id="email"
                        onChangeText={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        isError={errors.email && touched.email}
                        error={errors.email}
                        disabled={newsLetterInformation.isNewsLetterInfoAvailable}
                    />
                    <GTPInput placeholder='Enter Password*' disclaimer={"Must contain a minimum of 6 characters and include at least one number."}
                        name="password"
                        id="password"
                        onChangeText={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        isError={errors.password && touched.password}
                        error={errors.password} />
                    <GTPInput placeholder='Re-enter Password*'
                        name="confirm_password"
                        id="confirm_password"
                        onChangeText={handleChange}
                        onBlur={handleBlur}
                        value={values.confirm_password}
                        isError={errors.confirm_password && touched.confirm_password}
                        error={errors.confirm_password} />
                    <GTPInput placeholder='Enter Phone Number*'
                        name="mobile"
                        id="mobile"
                        onChangeText={handleChange}
                        onBlur={handleBlur}
                        value={values.mobile}
                        isError={errors.mobile && touched.mobile}
                        error={errors.mobile} />
                    <GTPInput placeholder='First Name (Katakana)*'
                        name="firstNameKatakana"
                        id="firstNameKatakana"
                        onChangeText={handleChange}
                        onBlur={handleBlur}
                        value={values.firstNameKatakana}
                        isError={errors.firstNameKatakana && touched.firstNameKatakana}
                        error={errors.firstNameKatakana}
                    />
                    <GTPInput placeholder='Last Name (Katakana)*'
                        name="lastNameKatakana"
                        id="lastNameKatakana"
                        onChangeText={handleChange}
                        onBlur={handleBlur}
                        value={values.lastNameKatakana}
                        isError={errors.lastNameKatakana && touched.lastNameKatakana}
                        error={errors.lastNameKatakana}
                    />
                    <div className="two-parts w-80 d-flex mb-2">
                        <GTPDatePicker
                            label={"Birthday"}
                            onBlur={handleBlur}
                            name={"Birthday"}
                            isError={errors.birthdate}
                            error={errors.birthdate && touched.birthdate}
                            setFieldValue={setFieldValue}
                        />
                        <div className="d-flex align-items-center popup-form-radio-group">
                            <GTPRadio
                                name="gender"
                                value="Male"
                                label={"Male"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                checked={values.gender}
                                isError={errors.gender && touched.gender}
                            />
                            <GTPRadio
                                name="gender"
                                value="Female"
                                label={"Female"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                checked={values.gender}
                                isError={errors.gender && touched.gender}
                            />
                            <GTPRadio
                                name="gender"
                                value="NC"
                                label={"NC"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                checked={values.gender}
                                isError={errors.gender && touched.gender}
                            />
                        </div>
                    </div>
                    <div className="two-parts w-80 d-flex">
                        <GTPInput placeholder='Country'
                            name="country"
                            id="country"
                            onChangeText={handleChange}
                            onBlur={handleBlur}
                            value={values.country}
                            isError={errors.country && touched.country}
                            error={errors.country}
                        />
                        <GTPInput placeholder='Postal Code'
                            name="postalCode"
                            id="postalCode"
                            onChangeText={handleChange}
                            onBlur={handleBlur}
                            value={values.postalCode}
                            isError={errors.postalCode && touched.postalCode}
                            error={errors.postalCode}
                        />
                    </div>
                    <div className="two-parts w-80 d-flex">
                        <GTPInput placeholder='Prefecture'
                            name="prefecture"
                            id="prefecture"
                            onChangeText={handleChange}
                            onBlur={handleBlur}
                            value={values.prefecture}
                            isError={errors.prefecture && touched.prefecture}
                            error={errors.prefecture}
                        />
                        <GTPInput placeholder='City/District'
                            name="city"
                            id="city"
                            onChangeText={handleChange}
                            onBlur={handleBlur}
                            value={values.city}
                            isError={errors.city && touched.city}
                            error={errors.city}
                        />
                    </div>
                    <GTPInput placeholder='Address'
                        name="address"
                        id="address"
                        onChangeText={handleChange}
                        onBlur={handleBlur}
                        value={values.address}
                        isError={errors.address && touched.address}
                        error={errors.address}
                    />

                    <div className="form-check-box w-80">
                        <GTPCheckBox label={"I would like to receive my privileges, offers and updates from Go To Pass and partners."}
                            name="subscription"
                            id="subscription"
                            onChangeText={handleChange}
                            onBlur={handleBlur}
                            value={`${values.subscription}`}
                            isError={errors.subscription && touched.subscription}
                            error={errors.subscription}
                        />
                        <GTPCheckBox label={"I confirm that I have read and agree to the Privacy Policy and Terms & Conditions."}
                            name="termsAndConditions"
                            id="termsAndConditions"
                            onChangeText={handleChange}
                            onBlur={handleBlur}
                            value={`${values.termsAndConditions}`}
                            isError={errors.termsAndConditions && touched.termsAndConditions}
                            error={errors.termsAndConditions}
                        />
                    </div>
                </div>
                <div className="sign-in-button d-flex flex-column align-items-center">
                    <GTPButton buttonType={"submit"} buttonText={"JOIN"} disabled={false} onClickAction={handleSubmit} />
                </div>

                {/* <div className="trigger-action mt-2">
                    <a href="javascript:void(0)" onClick={() => {
                        handleModalSwitch("Sign In")
                    }}>
                        ALREADY A MEMBER? LOGIN
                    </a>
                </div> */}
            </div>
        </>
    )
}

export default CompleteProfileForNewsLetter;
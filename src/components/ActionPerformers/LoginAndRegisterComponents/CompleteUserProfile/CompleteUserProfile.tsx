/* eslint-disable jsx-a11y/anchor-is-valid */
import GTPInput from '../../../DataProviders/GTPInput'
import GTPDatePicker from '../../../DataProviders/GTPDatePicker'
import GTPCheckBox from '../../../DataProviders/GTPCheckBox'
import GTPButton from '../../../DataProviders/GTPButton'
import { useFormik } from 'formik'
import { completeProfileValidationSchema } from '../../../../utils/FormValidation/ValidationSchema'
import GTPRadio from '../../../DataProviders/GTPRadio'
import { useDispatch, useSelector } from 'react-redux'
import { addCustomerWithBasicAuth, capillaryLookup, getUserInfoFromAuth0, getUserInfoInfoFromAuth0ManagementAPI, signupAndAuthorize, updateCustomer, updateCustomerWithCardnumber } from '../../../../utils/ApiService/GTPApis'
import CompleteProfileWithCardNumber from './CompleteProfileWithCardNumber'
import { ToastMessage } from '../../../../utils/ToastService/toast'
import { loginSuccess, updateToken } from '../../../../reduxStore/features/LoginAndSignUpSlice/LoginAndSignUpSlice'
import { resetEmail } from '../../../../reduxStore/features/CardNumberRegistrationSlice/CardNumberRegistrationSlice'
import CompleteProfileForNewsLetter from './CompleteProfileForNewsLetter'


interface CompleteUserProfileFormValues {
    firstNameKanji: string;
    lastNameKanji: string;
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

const CompleteUserProfile = ({ handleModalSwitch, handleClose }: any) => {
    const cardInformation = useSelector((state: any) => state.userState.cardNumberRegistration);
    const newsLetterInformation = useSelector((state: any) => state.userState.cardNumberRegistration);
    const registeringStatus = useSelector((state: any) => state.userState.cardNumberRegistration);
    const user = useSelector((state: any) => state.userState.loginAndSignup.user);
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            firstNameKanji: "",
            lastNameKanji: "",
            firstNameKatakana: "",
            lastNameKatakana: "",
            birthdate: "",
            gender: "",
            postalCode: "",
            prefecture: "",
            address: "",
            city: "",
            country: "",
            subscription: false,
            termsAndConditions: false,
        },
        validationSchema: completeProfileValidationSchema,
        onSubmit: (values: any) => {
            handleSubmitFunc(values)
        }
    });
    console.log(newsLetterInformation);
    
    const { values, setFieldValue, handleSubmit, handleChange, handleBlur, errors, touched } = formik;

    const handleSubmitFunc = async (values: CompleteUserProfileFormValues) => {

        // updateAuth0Profile(loggedInUser.user_id,modifyData(values),(err:any,data:any)=>{
        //     if(err) {
        //         console.log("Profile update error",err);
        //         return;
        //     } 
        //     console.log("Profile update success",data);
        //     let user = {
        //         ...loggedInUser,
        //         name: data.name
        //     }
        //     dispatch(loginSuccess(user))
        //     handleModalSwitch("Success")
        // })
        signupAndAuthorize(registeringStatus.registrationDetails, null, async (err: any, data: any) => {
            if (err) {
                console.log("Signup erro", err);
                if (err.code === "invalid_signup") {
                    ToastMessage("Error", "User already present!")
                    return;
                } else {
                    ToastMessage("Error", err.description)
                    return;
                }
            }
            ToastMessage("Success", "Registration successful in Auth0!")
            dispatch(updateToken(data))
            const res = await capillaryLookup("email", registeringStatus.registrationDetails.email);
            const resForMobile = await capillaryLookup("mobile", registeringStatus.registrationDetails.mobile);
            if (resForMobile && resForMobile.data && resForMobile.data.errors) {
                ToastMessage("Error", "User does not have mobile number in capillary")
            } else {
                ToastMessage("Success", "User has this mobile number in Capillary!")
            }
            if (res && res.data && res.data.errors) {
                ToastMessage("Error", "User does not have email in capillary")
                const addCustomerToCapillary = await addCustomerWithBasicAuth(modifyData(values))
                console.log("Update customer in cap response", addCustomerToCapillary);
                if (addCustomerToCapillary && addCustomerToCapillary.status === 200 && addCustomerToCapillary.data) {
                    ToastMessage("Success", "User profile created in Capillary.");
                    handleModalSwitch();
                }
            } else {
                console.log("User is already present in Capillary");
                ToastMessage("Success", "User already present in Capillary!")
            }
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
                        email: registeringStatus.registrationDetails.email,
                        name: data.nickname,
                        user_id: data.user_id,
                        mobile: registeringStatus.registrationDetails.mobile
                    }             
                    dispatch(loginSuccess(user))
                    console.log("Success signing up From management", data);
                    ToastMessage("Success", "Successfully fetched User Info from Management API!")

                })
            })
            dispatch(resetEmail())


        })

    }
    const modifyData = (data: any) => {

        return {
            "root": {
                "customer": [
                    {
                        "email": data.email ? data.email : registeringStatus.registrationDetails.email,
                        "firstname": data.firstNameKatakana,
                        "lastname": data.lastNameKatakana,
                        "mobile": user.mobile ? user.mobile : registeringStatus.registrationDetails.mobile,
                        "type": "LOYALTY",
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
                        },
                        "custom_fields": {
                            "field": [
                                {
                                    "name": "kanjifirstname",
                                    "value": data.firstNameKanji
                                },
                                {
                                    "name": "kanjilastname",
                                    "value": data.lastNameKanji
                                },
                                {
                                    "name": "customer_address",
                                    "value": data.address
                                }
                            ]
                        }
                    }
                ]
            }
        }
    }
    return (
        <>
            {cardInformation.isCardDataAvailable && <CompleteProfileWithCardNumber handleModalSwitch={handleModalSwitch} /> } 
            {newsLetterInformation.isNewsLetterInfoAvailable && <CompleteProfileForNewsLetter handleModalSwitch={handleModalSwitch}/> }
            {(!newsLetterInformation.isNewsLetterInfoAvailable && !cardInformation.isCardDataAvailable) && (
                <div className="modal-body mb-4 mt-3 p-0" style={{ paddingTop: '70px' }}>
                <div className="popup-form">
                    <GTPInput placeholder='First Name (Kanji)*' label={"*Mandatory"}
                        name="firstNameKanji"
                        id="firstNameKanji"
                        onChangeText={handleChange}
                        onBlur={handleBlur}
                        value={values.firstNameKanji}
                        isError={errors.firstNameKanji && touched.firstNameKanji}
                        error={errors.firstNameKanji}
                    />
                    <GTPInput placeholder='Last Name (Kanji)*'
                        name="lastNameKanji"
                        id="lastNameKanji"
                        onChangeText={handleChange}
                        onBlur={handleBlur}
                        value={ values.lastNameKanji}
                        isError={errors.lastNameKanji && touched.lastNameKanji}
                        error={errors.lastNameKanji}
                    />
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
            )}
            
        </>
    )
}

export default CompleteUserProfile
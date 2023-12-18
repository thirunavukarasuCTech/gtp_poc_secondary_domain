/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { useFormik } from 'formik';
import { newsLetterValidationSchema } from '../../../utils/FormValidation/ValidationSchema';
import { addCustomerWithBasicAuth, capillaryLookup } from '../../../utils/ApiService/GTPApis';
import { ToastMessage } from '../../../utils/ToastService/toast';
import GTPInput from '../../DataProviders/GTPInput';
import GTPButton from '../../DataProviders/GTPButton';
import { useDispatch } from 'react-redux';
import { updateNewsLetterInfo } from '../../../reduxStore/features/CardNumberRegistrationSlice/CardNumberRegistrationSlice';
import { updateUserData } from '../../../reduxStore/features/CapillaryUserInfoSlice/CapillaryUserInfoSlice';
import { getFormattedUserLookupData } from '../../../utils/DataFormatter/CustomerLookupFromCapillary';

const NewsLetter = ({ handleModalSwitch, handleClose }: any) => {
    const [loyaltyConversion, setLoyaltyConversion] = useState(false)
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: "",
            firstName: "",
            lastName: ""
        },
        validationSchema: newsLetterValidationSchema,
        onSubmit: values => {
            handleSubmitFunc(values)
        }

    });
    const { values, handleSubmit, handleChange, handleBlur, errors, touched } = formik;


    const handleSubmitFunc = async (newsletterInfo: any) => {
        if (!loyaltyConversion) {
            const isUserAvailableinCapillary = await capillaryLookup("email", newsletterInfo.email);
            if (isUserAvailableinCapillary && isUserAvailableinCapillary.data && isUserAvailableinCapillary.data.profiles) {
                ToastMessage("Error", "User is already subscribed.")
            } else {
                const res = await addCustomerWithBasicAuth(modifyData(newsletterInfo))
                if (res && res.status === 200 && res.data) {
                    ToastMessage("Success", "Non Loyalty User profile created in Capillary.");
                    handleModalSwitch();
                }
            }
        } else {
            const isUserAvailableinCapillary = await capillaryLookup("email", newsletterInfo.email);
            if (isUserAvailableinCapillary && isUserAvailableinCapillary.data && isUserAvailableinCapillary.data.profiles) {
                if(isUserAvailableinCapillary.data.profiles[0].firstName !== newsletterInfo.firstName) {
                    ToastMessage("Error","First name doesn't match.")
                    return;
                }
                if(isUserAvailableinCapillary.data.profiles[0].lastName !== newsletterInfo.lastName) {
                    ToastMessage("Error","Last name doesn't match.")
                    return;
                }
                dispatch(updateNewsLetterInfo(isUserAvailableinCapillary.data.profiles[0]));
                dispatch(updateUserData(getFormattedUserLookupData(isUserAvailableinCapillary)))
                ToastMessage("Success", "User is present in Capillary.")
                setLoyaltyConversion(false);
                handleModalSwitch("Complete Profile")
            } else {
                ToastMessage("Error", "User is not present in Capillary.")
            }
        }
    }
    const modifyData = (data: any) => {
        return {
            "root": {
                "customer": [
                    {
                        "email": data.email,
                        "firstname": data.firstName,
                        "lastname": data.lastName,
                        "type": loyaltyConversion === true ? "LOYALTY" : "NON_LOYALTY",
                        "custom_fields": {
                            "field": [
                                {
                                    "name": "newsletter",
                                    "value": "Yes"
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
            <div className="modal-body mb-5 mt-3 p-0">
                <div className="popup-form">
                    <GTPInput placeholder='Enter Email'
                        name="email"
                        id="email"
                        onChangeText={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        isError={errors.email && touched.email}
                        error={errors.email}
                    />
                    <GTPInput placeholder='First Name'
                        name="firstName"
                        id="firstName"
                        onChangeText={handleChange}
                        onBlur={handleBlur}
                        value={values.firstName}
                        isError={errors.firstName && touched.firstName}
                        error={errors.firstName}
                    />
                    <GTPInput placeholder='Last Name'
                        name="lastName"
                        id="lastName"
                        onChangeText={handleChange}
                        onBlur={handleBlur}
                        value={values.lastName}
                        isError={errors.lastName && touched.lastName}
                        error={errors.lastName}
                    />
                </div>
                <div className="sign-in-button d-flex flex-column align-items-center">
                    <GTPButton buttonType={"submit"} buttonText={"SUBSCRIBE"} disabled={false} onClickAction={handleSubmit} />
                </div>
                <hr />
                <div className="sign-in-button d-flex flex-column align-items-center mt-2">
                    <GTPButton buttonType={"submit"} buttonText={"Non_Loyalty --> Loyalty"} disabled={false} onClickAction={() => {
                        setLoyaltyConversion(true);
                        handleSubmit()
                    }} />
                </div>
            </div>
        </>
    )
}

export default NewsLetter
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import GTPButton from '../../../DataProviders/GTPButton'
import GTPCheckBox from '../../../DataProviders/GTPCheckBox'
import GTPInput from '../../../DataProviders/GTPInput'
import GTPRadio from '../../../DataProviders/GTPRadio'
import GTPDatePicker from '../../../DataProviders/GTPDatePicker'

const CompleteProfileWithMobileNumber = ({ handleModalSwitch, formikObject }: any) => {
    const { values, setFieldValue, handleSubmit, handleChange, handleBlur, errors, touched } = formikObject;

    return (
        <>
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
                        value={values.lastNameKanji}
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
                    <GTPInput placeholder='First Name (Katakana)*'
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

                <div className="trigger-action mt-2">
                    <a href="javascript:void(0)" onClick={() => {
                        handleModalSwitch("Sign In")
                    }}>
                        ALREADY A MEMBER? LOGIN
                    </a>
                </div>
            </div>
        </>
    )
}

export default CompleteProfileWithMobileNumber
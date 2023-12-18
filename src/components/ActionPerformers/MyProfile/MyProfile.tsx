import React, { useEffect, useState } from 'react'
import './common.scss'
import GTPInput from '../../DataProviders/GTPInput'
import GTPDatePicker from '../../DataProviders/GTPDatePicker'
import GTPRadio from '../../DataProviders/GTPRadio'
import { useFormik } from 'formik'
import { myProfileValidationSchema } from '../../../utils/FormValidation/ValidationSchema'
import GTPButton from '../../DataProviders/GTPButton'
import { getCustomer } from '../../../utils/ApiService/GTPApis'
import { useSelector } from 'react-redux'

export const MyProfile = () => {
  const token = useSelector((state: any) => state.userState.loginAndSignup.token);
  const [userDetailsState, setUserDetailsState] = useState({
      firstNameKatakana:  "",
      lastNameKatakana: "",
      birthdate:  "",
      gender: "",
      address:  "",
      country:  "",
      mobile: "",
      email: ""
    });

  const [disableFields, setDisableFields] = useState(true);
  const capUser = async () => {
    const res = await getCustomer(token)
    console.log("Cap user info", res);
    if (res && res.status === 200 && res.data && res.data.customers && res.data.customers.customer && res.data.customers.customer[0]) {
      setUserDetailsState({
        email: res.data.customers.customer[0].email,
        mobile: res.data.customers.customer[0].mobile,
        firstNameKatakana: res.data.customers.customer[0].firstname,
        lastNameKatakana: res.data.customers.customer[0].firstname,
        birthdate: res.data.customers.customer[0].birthdate,
        gender: res.data.customers.customer[0].gender,
        address: res.data.customers.customer[0].address,
        country: res.data.customers.customer[0].country,
      })
    }
  }
    useEffect(() => {
      capUser()
    }, [])
    const formik = useFormik({
      initialValues: userDetailsState,
      validationSchema: myProfileValidationSchema,
      // enableReinitialize: true,
      onSubmit: (values: any) => {
        handleSubmitFunc(values)
      }
    });



    useEffect(() => {
      // const fetchUserDetails = async () => {
      //   const res = await capillaryLookup("email", user.email)
      // if (res && res.status === 200 && res.data) {
      //   console.log(res.data);
      //   formik.setValues({
      //     firstNameKatakana: res.data.firstName,
      //     lastNameKatakana: res.data.lastName,
      //     birthdate: res.data.dob ? res.data.dob : null,
      //     gender: res.data.gender,
      //     address: res.data.address,
      //     country: res.data.country,
      //   })
      // }
      // }

      // fetchUserDetails();
    }, [])


    const { handleBlur, handleChange, handleSubmit, setFieldValue, touched, values, errors } = formik
    const handleSubmitFunc = async (values: any) => {
      console.log("Submitted form", values);

    }
    return (
      <>
        <div className="my-profile-container mt-5 mb-5">
          <div className="mpc-container d-flex">
            <p className='my-profile-container-heading'>My Profile</p>
            <p className='my-profile-update-button' onClick={() => {
              setDisableFields(false)
            }}>(Update Profile)</p>
          </div>
          <div className="my-profile-fields-container mt-3">
            <div className="my-profile-field-container d-flex">
              <div className="label-container">
                <label>Email*</label>
              </div>
              <div className="input-field-container w-90">
                <GTPInput placeholder='Enter Email Address'
                  name="email"
                  id="email"
                  disabled={true}
                  onChangeText={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                // isError={errors.userName && touched.userName}
                // error={errors.userName}
                />
              </div>
            </div>
            <div className="my-profile-field-container d-flex">
              <div className="label-container">
                <label>Last Name (Katakana)*</label>
              </div>
              <div className="input-field-container w-90">
                <GTPInput placeholder='Enter last name'
                  name="lastnameKatakana"
                  id="lastnameKatakana"
                  disabled={disableFields}
                  onChangeText={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={values.lastNameKatakana}
                  isError={errors.lastNameKatakana && touched.lastNameKatakana}
                  error={errors.lastNameKatakana}
                />
              </div>
            </div>
            <div className="my-profile-field-container d-flex">
              <div className="label-container">
                <label>First Name (Katakana)*</label>
              </div>
              <div className="input-field-container w-90">
                <GTPInput placeholder='Enter first name'
                  name="firstnameKatakana"
                  id="firstnameKatakana"
                  disabled={disableFields}
                  onChangeText={handleChange}
                  onBlur={handleBlur}
                  value={values.firstNameKatakana}
                  isError={errors.firstNameKatakana && touched.firstNameKatakana}
                  error={errors.firstNameKatakana}
                />
              </div>
            </div>
            <div className="my-profile-field-container d-flex">
              <div className="label-container">
                <label>Password*</label>
              </div>
              <div className="input-field-container w-90">
                <GTPInput placeholder='*****************'
                  name="password"
                  id="password"
                  disabled={true}
                  onChangeText={handleChange}
                  onBlur={handleBlur}
                  value={"*****************"}
                // isError={errors.userName && touched.userName}
                // error={errors.userName}
                />
              </div>
            </div>
            <div className="my-profile-field-container d-flex">
              <div className="label-container">
                <label>Date of Birth</label>
              </div>
              <div className="input-field-container w-90">
                <div className="w-80">
                  <GTPDatePicker
                    label={"Birthday"}
                    isDisabled={disableFields}
                    onBlur={handleBlur}
                    name={"Birthday"}
                    isError={errors.birthdate}
                    error={errors.birthdate && touched.birthdate}
                    setFieldValue={setFieldValue}
                  />
                </div>
              </div>
            </div>
            <div className="my-profile-field-container d-flex">
              <div className="label-container">
                <label>Gender</label>
              </div>
              <div className="input-field-container w-90">
                <GTPRadio
                  name="gender"
                  value="Male"
                  label={"Male"}
                  disabled={disableFields}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  checked={values.gender}
                  isError={errors.gender && touched.gender}
                />
                <GTPRadio
                  name="gender"
                  value="Female"
                  label={"Female"}
                  disabled={disableFields}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  checked={values.gender}
                  isError={errors.gender && touched.gender}
                />
                <GTPRadio
                  name="gender"
                  value="NC"
                  label={"NC"}
                  disabled={disableFields}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  checked={values.gender}
                  isError={errors.gender && touched.gender}
                />
              </div>
            </div>
            <div className="my-profile-field-container d-flex">
              <div className="label-container">
                <label>Country*</label>
              </div>
              <div className="input-field-container w-90">
                <GTPInput placeholder='Country'
                  name="country"
                  id="country"
                  disabled={disableFields}
                  onChangeText={handleChange}
                  onBlur={handleBlur}
                  value={values.country}
                  isError={errors.country && touched.country}
                  error={errors.country}
                />
              </div>
            </div>
            <div className="my-profile-field-container d-flex">
              <div className="label-container">
                <label>Mobile*</label>
              </div>
              <div className="input-field-container w-90">
                <GTPInput placeholder='Enter mobile'
                  name="mobile"
                  id="mobile"
                  disabled={true}
                  onChangeText={handleChange}
                  onBlur={handleBlur}
                  value={values.mobile}
                // isError={errors.mobile && touched.mobile}
                // error={errors.mobile}
                />
              </div>
            </div>
            <div className="my-profile-field-container d-flex">
              <div className="label-container">
                <label>Address*</label>
              </div>
              <div className="input-field-container w-90">
                <GTPInput placeholder='Enter address'
                  name="address"
                  id="address"
                  disabled={disableFields}
                  onChangeText={handleChange}
                  onBlur={handleBlur}
                  value={values.address}
                  isError={errors.address && touched.address}
                  error={errors.address}
                />
              </div>
            </div>
          </div>
          <div className="profile-save-button w-50 mt-5">
            <GTPButton buttonType={"submit"} buttonText={"SAVE CHANGES"} disabled={disableFields} onClickAction={handleSubmit} />
          </div>

        </div>
      </>
    )
  }

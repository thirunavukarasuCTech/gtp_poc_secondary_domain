/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import './NavigationBar.scss'
import { useSelector } from 'react-redux';
import PopupModal from '../PopupModal/PopupModal';
import { auth0Logout } from '../../../utils/ApiService/GTPApis';
import { useDispatch } from 'react-redux'
import { logout } from '../../../reduxStore/features/LoginAndSignUpSlice/LoginAndSignUpSlice';
import { ToastMessage } from '../../../utils/ToastService/toast';
import { useNavigate } from "react-router-dom";
import { resetCardData, resetEmail } from '../../../reduxStore/features/CardNumberRegistrationSlice/CardNumberRegistrationSlice';
import { resetUserData } from '../../../reduxStore/features/CapillaryUserInfoSlice/CapillaryUserInfoSlice';

const NavigationBar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: any) => state.userState.loginAndSignup.isAuthenticated);
  // const authenticatedNavbarList = ["Welcome", "My account", "SIGN OUT"]
  // const unauthenticatedNavbarList = ["Join", "Sign In"];

  const [showModal, setShowModal] = useState(false);
  const [modalTitleNav, setModalTitleNav] = useState('');

  const handleShow = () => setShowModal(true);
  const handleClose = (title?: string) => {
    setModalTitleNav("");
    setShowModal(false)
  };

  useEffect(() => {

  }, [showModal, modalTitleNav])

  const handleOpenModalWithTitle = (title: string) => {
    setModalTitleNav(title);
    handleShow();
  };
  const resetModalTitle = () => {
    setModalTitleNav("");
  }

  return (
    <>
      <nav className='d-flex align-items-center justify-content-end'>
        <ul className='d-flex align-items-center m-0'>
          {isAuthenticated ?
            (
              <>
                <li>
                  <a href="javascript:void(0)" onClick={() => {
                    navigate("/")

                  }}>
                    WELCOME
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)" onClick={() => {
                    navigate("/myAccount")
                  }}>
                    MY ACCOUNT
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)" onClick={() => {
                    ToastMessage("Success", "Logout Successful!")
                    dispatch(logout())
                    dispatch(resetCardData())
                    dispatch(resetEmail())
                    dispatch(resetUserData())
                    auth0Logout()
                  }}>
                    SIGN OUT
                  </a>
                </li>
              </>
            )
            :
            (
              <>
                <li>
                  <a href="javascript:void(0)" onClick={() => {
                    handleOpenModalWithTitle("News Letter")
                  }}>
                    NEWS LETTER
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)" onClick={() => {
                    handleOpenModalWithTitle("Join")
                  }}>
                    JOIN
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)" onClick={() => {
                    handleOpenModalWithTitle("Sign In")
                  }}>
                    SIGN IN
                  </a>
                </li>
              </>
            )
          }
        </ul>
      </nav>


      <PopupModal showModal={showModal} handleClose={handleClose} title={modalTitleNav} resetModalTitle={resetModalTitle} />
    </>
  )
}

export default NavigationBar
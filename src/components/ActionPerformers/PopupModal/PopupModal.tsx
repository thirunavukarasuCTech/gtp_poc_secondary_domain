import React, { useState } from 'react'
import "./PopupModal.scss"
import Register from '../LoginAndRegisterComponents/Register/Register'
import Login from '../LoginAndRegisterComponents/Login/Login'
import CardNumberBasedRegistration from '../LoginAndRegisterComponents/CardNumberBasedRegistration/CardNumberBasedRegistration'
import CompleteUserProfile from '../LoginAndRegisterComponents/CompleteUserProfile/CompleteUserProfile'
import { Modal } from 'react-bootstrap';
import PopupModalNotification from '../PopupModalNotification/PopupModalNotification'
import ForgetPassword from '../ForgetPasswordComponents/ForgetPassword'
import NewsLetter from '../NewsLetter/NewsLetter'



const PopupModal = ({ showModal, handleClose, title, resetModalTitle }: any) => {
  const [modalTitle, setModalTitle] = useState('');
  const handleModalSwitch = (title?: string) => {
    if (title) {
      setModalTitle(title);
      resetModalTitle();
    } else {
      handleClose();
      setModalTitle("")
      resetModalTitle();
    }
  };

  return (
    <>
      <Modal show={showModal} onHide={() => {
        handleClose();
        setModalTitle("");
      }} backdrop="static" keyboard={false} centered className="modal-fadeless">
        <Modal.Header closeButton />
        <div className="modal-header p-0 mb-3 mt-2">
          <p className='w-100 m-0 text-center modal-heading'> {modalTitle ? modalTitle : title}</p>
        </div>
        {(title === "Sign In" || modalTitle === "Sign In") && (
          <Login handleModalSwitch={handleModalSwitch} handleClose={handleClose} />
        )}
        {(title === "Join" && modalTitle === "") && (
          <Register handleModalSwitch={handleModalSwitch} />
        )}

        {/* Register with card number and complete profile */}
        {modalTitle === "Register with Card Number" && (
          <CardNumberBasedRegistration handleModalSwitch={handleModalSwitch} />
        )}
        {modalTitle === "Complete Profile" && (
          <CompleteUserProfile handleModalSwitch={handleModalSwitch} />
        )}

        {modalTitle === "Forget Password" && (
          <ForgetPassword handleModalSwitch={handleModalSwitch} />
        )}

        {( title === "News Letter"  || modalTitle === "News Letter") && (
          <NewsLetter handleModalSwitch = {handleModalSwitch}/>
        )}

        {modalTitle === "Success" && (
          <PopupModalNotification handleClose={handleClose} handleModalSwitch={handleModalSwitch} />
        )}
        
      </Modal>
    </>
  )
}

export default PopupModal
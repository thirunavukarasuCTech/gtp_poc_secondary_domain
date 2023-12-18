import React from 'react'
import './PopupModalNotification.scss'
import GTPButton from '../../DataProviders/GTPButton'

const PopupModalNotification = ({handleClose, handleModalSwitch}: any) => {
  
  return (
    <>
      <div className="modal-body mb-5 mt-3 p-0">
        <div className="popup-form">
          <p>
            Profile updated Successfully
          </p>
        </div>
        <div className="sign-in-button d-flex flex-column align-items-center">
          {/* <GTPButton buttonType={"submit"} buttonText={"GO"} disabled={false} onClickAction = {()=>{
            handleClose();
            handleModalSwitch();
          }}/> */}
        </div>
      </div>
    </>
  )
}

export default PopupModalNotification
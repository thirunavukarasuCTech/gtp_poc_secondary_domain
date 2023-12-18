import React, { useState } from 'react'
import GTPDropDown from '../../DataProviders/GTPDropDown';
import ForgetPasswordViaMobile from './ForgetPasswordViaMobile';
import ForgetPasswordViaEmail from './ForgetPasswordViaEmail';
import ForgetPasswordViaCardNumber from './ForgetPasswordViaCardNumber';

const ForgetPassword = ({handleModalSwitch} : any) => {
    const [forgetPasswordState, setForgetPasswordState] = useState('');

    const data = [
        { label: "Look up your account by:", value: "Look up your account by:" },
        // { label: "Phone Number", value: "PhoneNumber" },
        { label: "Email Address", value: "EmailAddress" },
        { label: "Card number", value: "CardNumber" },
    ];

    const handleDropdownSelect = (selectedValue: any) => {
        setForgetPasswordState(selectedValue);
    };


    return (
        <>
            <div className="modal-body mb-5 mt-3 p-0">
                <GTPDropDown
                    data={data}
                    onSelect={handleDropdownSelect}
                />
                <div className="mt-3">
                    {(forgetPasswordState === "PhoneNumber") && <ForgetPasswordViaMobile handleModalSwitch={handleModalSwitch}/>}
                    {(forgetPasswordState === "EmailAddress") && <ForgetPasswordViaEmail handleModalSwitch={handleModalSwitch}/>}
                    {(forgetPasswordState === "CardNumber") && <ForgetPasswordViaCardNumber handleModalSwitch={handleModalSwitch}/>}                    
                </div>
            </div>
        </>
    )
}

export default ForgetPassword
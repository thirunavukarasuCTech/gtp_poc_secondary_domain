import React from 'react'
import lineLogo from "../../assets/Line_logo.png"

const GTPButton = ({
    buttonText,
    buttonType,
    disabled,
    social = "",
    onClickAction,
    modalChange = false,
}: any) => {
    return (
        <button
            className={`gtp-button p-0 mt-2 w-80 ${social ? `${social} p-0` : disabled ? 'disabled' : 'active'}`}
            disabled={disabled}
            type={buttonType}
            onClick={() => {
                if (modalChange) {
                    onClickAction("Register with Card Number");
                } else {
                    onClickAction();
                }
            }}
        >
            {social === "line" && (
                <img src={lineLogo} alt="" className='line-logo' />
            )}
            <span className='button-text'>{buttonText}</span>

        </button>
    )
}

export default GTPButton
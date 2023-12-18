import React, { useRef, useState } from 'react'
import "./Common.scss"

type TextInputProps = {
    value?: string;
    placeholder?: string;
    onChangeText?: any;
    onBlur?: any;
    icon?: React.ReactNode;
    disabled?: boolean;
    keyboardType?: any;
    maxLength?: number;
    isError?: any;
    label?: any;
    max?: any;
    error?: any;
    isModal?: any;
    disclaimer?: any;
    inputType?: any;
    name?: string;
    id?: string;
};



export default function GTPInput({
    isModal,
    placeholder,
    value,
    onBlur,
    onChangeText,
    isError,
    error,
    max,
    label,
    disabled = false,
    maxLength,
    keyboardType = "text",
    disclaimer = "",
    inputType = "",
    name,
    id,

}: TextInputProps) {
    const ref: any = useRef(null);

    return (
        <>
            <div className="mb-2 w-80">
                {label && <label className="form-label w-80 text-left">{label}</label>}

                <input
                    className={isError? "form-input w-100 error" : "form-input w-100"}
                    maxLength={maxLength}
                    placeholder={placeholder}
                    value={value}
                    max={max}
                    onBlur={onBlur}
                    onChange={onChangeText}
                    disabled={disabled}
                    type={inputType ? inputType : keyboardType}
                    ref={ref}
                    name= {name}
                    id={id}
                />
                {isError && (
                    <p className="error-code text-decoration-none m-0">{error}</p>
                )}
                {disclaimer && <label className="w-80 disclaimer">
                    {disclaimer}
                </label>}
            </div>
        </>

    )
}
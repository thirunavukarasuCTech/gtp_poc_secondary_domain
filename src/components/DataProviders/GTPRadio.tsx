import React from 'react'

const GTPRadio = ({
    type = "radio",
    name,
    value,
    onChange,
    onBlur,
    checked,
    label,
    isError,
    disabled,
}: any) => {
    return (
        <>
            <label className={isError ? "radio-label error" : "radio-label"}>
                <input type={type} name={name} value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    checked={checked === value}
                    disabled={disabled}
                />
                <span className="radio-dot"></span>
                {label}
            </label>
        </>
    );
}

export default GTPRadio
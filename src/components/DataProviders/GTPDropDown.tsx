import React, { useEffect, useState } from 'react';


const GTPDropDown = ({ data, onSelect }: any) => {
    const [selectedValue, setSelectedValue] = useState('Look up your account by:');
    useEffect(()=>{
        return () => {
            setSelectedValue("Look up your account by:")
        }
    },[])
    const handleDropdownChange = (event: any) => {
        setSelectedValue(event.target.value);
        onSelect(event.target.value);
    };
    return (
        <>
            <div className='drop-down'>
                <select
                    id="drop-down"
                    value={selectedValue}
                    onChange={handleDropdownChange}
                    className='w-80 mt-4'
                >
                    {data.map((option: any) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

        </>
    )
}

export default GTPDropDown
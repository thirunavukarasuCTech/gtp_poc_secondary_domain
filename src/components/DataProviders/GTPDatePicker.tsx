// import React from 'react'

// import type { DatePickerProps } from 'antd';
// import { DatePicker, Space } from 'antd';

// const GTPDatePicker = () => {

// const onChange: DatePickerProps['onChange'] = (date, dateString) => {
//     console.log(date, dateString);
// };
//     const dateFormat = 'YYYY/MM/DD';
//     return (
//         <>
//             <div className="date-picker">
//                 <DatePicker format={dateFormat} size={'large'} className='w-75 date-picker' placeholder='Birthday'onChange={onChange}/>

//             </div>
//         </>
//     )

// }

// export default GTPDatePicker


import React from 'react'

import type { DatePickerProps } from 'antd';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

const GTPDatePicker = ({
    name,
    value,
    onChangeDate,
    onBlur,
    error,
    label,
    isError,
    setFieldValue,
    isDisabled,
}: any) => {
    const dateFormat = 'YYYY/MM/DD';
    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        setFieldValue('birthdate', dateString);
    };
    return (
        <>
            <div className="date-picker-container w-80 mb-2">
                {value ? (
                    <DatePicker
                        format={dateFormat}
                        size={'large'}
                        placeholder={label}
                        onChange={onChange}
                        onBlur={onBlur}
                        name={name}
                        defaultValue={dayjs(value, dateFormat)}
                        disabled = {isDisabled}     
                    />
                ) : <DatePicker
                    format={dateFormat}
                    size={'large'}
                    placeholder={label}
                    onChange={onChange}
                    onBlur={onBlur}
                    name={name}
                    disabled = {isDisabled}
                />}
                {isError && <p className='m-0 date-picker-error'> {error}</p>}
            </div>
        </>
    )

}

export default GTPDatePicker



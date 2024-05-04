/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Col, DatePicker, Row } from 'antd';
import moment from 'moment';
import { MessageError } from '../controls/MessageError';
import { reverseConvertDate, validateFields } from '../../../helper/helper';
import dayjs from 'dayjs';

const InputDateCommon = (props) => {
    const { label, attribute, setData, validate, setValidate, isRequired,
        disabled = false, dataAttribute, submittedTime, disabledToDate = false
    } = props;
    const [value, setValue] = useState("");
    const toDay = new Date();
    const disabledDate = (current) => {
        if (disabledToDate) {
            return current && current < moment().startOf('day');
        }
        else {
            return current && current >= moment().startOf('day');
        }
    };

    const onChange = (dateString) => {
        setValue(dateString || null);
        setData({
            [attribute]: dateString || ''
        });
    }
    let labelLower = label.toLowerCase();
    const onBlur = (isImplicitChange = false) => {
        if (isRequired) {
            validateFields(isImplicitChange, attribute, !value, setValidate, validate, !value ? `Vui lòng nhập ${labelLower}` : "");
        }
    }

    // useEffect(() => {
    //     if (dataAttribute) {
    //         // setValue(dayjs(reverseConvertDate(dataAttribute)) || null);
    //         setValue(dataAttribute || "")
    //     }
    // }, [dataAttribute]);
    
    useEffect(() => {

        if (submittedTime != null) {
            onBlur(true);
        }
    }, [submittedTime]);


    return (
        <div className='mb-4 input-common'>
            <div className='title mb-2'>
                <span>
                    <span className='label'>{label}</span>
                    <span className='ml-1 is-required'>{isRequired ? "*" : ""} </span>
                </span>
            </div>
            <div>
                <DatePicker
                    allowClear={false}
                    size="middle"
                    className='w-full input-date-common'
                    value={value}
                    placeholder={`Chọn ${label}`}
                    // onChange={(values) => setValue(values)}
                    onChange={onChange}
                    disabledDate={disabledDate}
                    disabled={disabled}
                    format="DD/MM/YYYY"
                    onBlur={() => onBlur(false)}
                />

                <MessageError isError={validate[attribute]?.isError || false} message={validate[attribute]?.message || ""} />
            </div>
        </div>
    );

};
export default InputDateCommon;
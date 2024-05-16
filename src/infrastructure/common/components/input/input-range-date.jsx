/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Col, DatePicker, Row } from 'antd';
import moment from 'moment';
import { MessageError } from '../controls/MessageError';
import { validateFields } from '../../../helper/helper';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

const InputRangeDateCommon = (props) => {
    const {
        label,
        attribute,
        setData,
        validate,
        setValidate,
        isRequired,
        disabled = false,
        dataAttribute,
        submittedTime,
        disabledToDate = null,
    } = props;
    const [value, setValue] = useState("");
    const disabledDate = (current) => {
        if (disabledToDate == true) {
            return current && current < moment().startOf('day');
        }
        else if (disabledToDate == false) {
            return current && current >= moment().startOf('day');
        }
        else {
            return
        }
    };

    const onChange = async (dateString) => {
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
    //         setValue(dayjs(dataAttribute, "DD-MM-YYYY HH:mm:ss") || null);
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
                <RangePicker
                    allowClear={false}
                    size="middle"
                    className='w-full input-date-common'
                    value={value}
                    placeholder={`Chọn ${label}`}
                    // onChange={(values) => setValue(values)}
                    onChange={onChange}
                    // disabledDate={disabledDate}
                    disabled={disabled}
                    format="DD/MM/YYYY"
                    showTime
                    onBlur={() => onBlur(false)}
                />

                <MessageError isError={validate[attribute]?.isError || false} message={validate[attribute]?.message || ""} />
            </div>
        </div>
    );

};
export default InputRangeDateCommon;
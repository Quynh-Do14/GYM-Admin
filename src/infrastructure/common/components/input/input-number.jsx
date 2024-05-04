/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Col, InputNumber, Row } from 'antd';
import "../../../../assets/styles/components/input.css"
import { validateCMND, validateEmail, validateFormInputNumber, validatePhoneNumber } from '../../../helper/validate';
import { validateFields } from '../../../helper/helper';
import { MessageError } from '../controls/MessageError';
const InputNumberCommon = (props) => {
    const {
        label,
        attribute,
        setData,
        submittedTime,
        validate,
        setValidate,
        isRequired,
        dataAttribute,
        disabled = false,
    } = props;
    const [value, setValue] = useState(null);

    const onChange = (val) => {
        setValue(val || null);
        setData({
            [attribute]: val || null
        });
    }
    let labelLower = label.toLowerCase();
    const onBlur = (isImplicitChange = false) => {
        if (isRequired) {
            validateFields(isImplicitChange, attribute, !(value != null), setValidate, validate, !(value != null) ? `Vui lòng nhập ${labelLower}` : "");

        }
    };

    useEffect(() => {
        setValue(dataAttribute || '');

    }, [dataAttribute]);

    useEffect(() => {

        if (submittedTime != null) {
            onBlur(true);
        }
    }, [submittedTime]);

    return (
        <div>
            <div className='mb-4 input-common'>
                <div className='title mb-2'>
                    <span>
                        <span className='label'>{label}</span>
                        <span className='ml-1 is-required'>{isRequired ? "*" : ""} </span>
                    </span>
                </div>
                <div>
                    <InputNumber
                        min={0}
                        max={null}
                        className='w-full'
                        disabled={disabled}
                        value={value ? value : ""}
                        onChange={onChange}
                        onBlur={() => onBlur(false)}
                        placeholder={`Nhập ${label}`}
                    />
                    <MessageError isError={validate[attribute]?.isError || false} message={validate[attribute]?.message || ""} />
                </div>
            </div>
        </div>

    )

}
export default InputNumberCommon;
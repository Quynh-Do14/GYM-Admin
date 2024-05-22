import React, { useEffect, useState } from 'react';
import { InputNumber } from 'antd';
import { MessageError } from '../../controls/MessageError';
import { validateFields } from '../../../../helper/helper';


const InputNumberArrayCommon = (props) => {
    const {
        label,
        attribute,
        dataAttribute,
        isRequired,
        setData,
        disabled = false,
        validate,
        setValidate,
        submittedTime,
        setValidateAllItems,
        index,
        data
    } = props;
    const [value, setValue] = useState("");

    if (setValidateAllItems) {
        setValidateAllItems([index], () => {
            if (disabled) {
                return {
                    index: index,
                    check: true
                };
            }
            let check = true;
            if (!value) {
                check = false;
            }
            return {
                index: index,
                check: check
            };;
        });
    }


    const onChange = (e) => {
        setData((prev) => {
            prev[index] = {
                ...prev[index],
                [attribute]: e || null,
            }
            return prev;
        });
        setValue(e || null);
    };

    let labelLower = label.toLowerCase();
    const onBlur = (isImplicitChange = false) => {
        if (isRequired) {
            validateFields(isImplicitChange, `${attribute}${index}`, !value, setValidate, validate, !value ? `Vui lòng nhập ${labelLower}` : "");

        }
    };

    useEffect(() => {
        if (data[index]) {
            setValue(data[index][attribute]);
        }
    }, [index, data, attribute]);

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
                        className={`${validate[`${attribute}${index}`]?.isError ? "input-error" : ""} w-full`}
                        disabled={disabled}
                        value={value}
                        onChange={onChange}
                        onBlur={() => onBlur(false)}
                        placeholder={`Nhập ${label}`}
                    />
                    <MessageError isError={validate[`${attribute}${index}`]?.isError || false} message={validate[`${attribute}${index}`]?.message || ""} />
                </div>
            </div>
        </div>

    )

}
export default InputNumberArrayCommon;
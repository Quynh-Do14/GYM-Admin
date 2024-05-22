import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { useRecoilValue } from "recoil";
import { validateFields } from '../../../helper/helper';
import { MessageError } from '../controls/MessageError';
import { MemberCardState } from "../../../../core/atoms/memberCard/memberCardState";

const InputSelectMemberCardCommon = (props) => {
    const {
        dataAttribute,
        setData,
        attribute,
        disabled,
        setValidate,
        validate,
        submittedTime,
        isRequired,
        label
    } = props;
    const dataMemberCard = useRecoilValue(MemberCardState);
    const [value, setValue] = useState("");

    const onChange = async (val) => {
        setValue(val || "");
        setData({
            [attribute]: val
        });
    };

    let labelLower = label.toLowerCase();
    const validateBlur = (isImplicitChange = false) => {
        validateFields(isImplicitChange, attribute, !value, setValidate, validate, !value ? `Vui lòng nhập đúng định dạng ${labelLower}` : "");
    };

    const onBlur = () => {
        validateBlur(false);
    };

    useEffect(() => {
        if (dataAttribute) {
            setValue(dataAttribute);
        }
    }, [dataAttribute]);


    useEffect(() => {
        if (submittedTime != null) {
            validateBlur(true);
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
                    <div>
                        <Select
                            showSearch
                            allowClear={false}
                            showArrow
                            className={`${validate[attribute]?.isError ? "input-error" : ""} w-full text-left`}
                            disabled={disabled}
                            value={value}
                            listHeight={120}
                            onChange={onChange}
                            onBlur={onBlur}
                            placeholder={`Chọn ${label}`}
                            getPopupContainer={trigger => trigger.parentNode}
                        >
                            {
                                dataMemberCard && dataMemberCard.length && dataMemberCard.map((item, index) => {
                                    return (
                                        <Select.Option
                                            key={index}
                                            value={item.id}
                                            title={item.id}
                                        >
                                            {item.id}
                                        </Select.Option>
                                    )
                                })
                            }
                        </Select>
                        <MessageError isError={validate[attribute]?.isError || false} message={validate[attribute]?.message || ""} />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default InputSelectMemberCardCommon;
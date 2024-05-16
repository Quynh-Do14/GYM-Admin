import React, { useEffect, useState } from "react";
import { Select } from "antd";
import Constants from "../../../../core/common/constant";
import { MessageError } from "../controls/MessageError";
import { convertTimeParams, validateFields } from "../../../helper/helper";
import bookingService from "../../../repositories/booking/service/booking.service";
import userService from "../../../repositories/user-management/service/user.service";
const InputSelectUserCommon = (props) => {
    const {
        dataAttribute,
        setData,
        attribute,
        disabled,
        listDataOfItem,
        setValidate,
        validate,
        submittedTime,
        isRequired,
        label
    } = props;

    const [value, setValue] = useState("");
    const [listUser, setListUser] = useState([]);
    const onChange = async (val) => {
        setValue(val || "");
        setData({
            [attribute]: val
        });
    };
    const getUserAsync = async () => {
        const params = {
        }
        try {
            await userService.getUser(
                params,
                () => { }
            ).then((response) => {
                if (response) {
                    setListUser(response.content)
                }
            })
        } catch (error) {
            console.error(error);

        }
    }
    useEffect(() => {
        getUserAsync().then(() => { })
    }, [])

    let labelLower = label.toLowerCase();
    const validateBlur = (isImplicitChange = false) => {
        validateFields(isImplicitChange, attribute, !value, setValidate, validate, !value ? `Vui lòng nhập ${labelLower}` : "");
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
                    <Select
                        showSearch
                        allowClear={false}
                        showArrow
                        className="w-full text-left"
                        disabled={disabled}
                        value={value}
                        listHeight={120}
                        onChange={onChange}
                        onBlur={() => onBlur(false)}
                        placeholder={`Chọn ${label}`}
                        getPopupContainer={trigger => trigger.parentNode}
                    >
                        {
                            listUser && listUser.length && listUser.map((item, index) => {
                                return (
                                    <Select.Option
                                        key={index}
                                        value={item.id}
                                        title={item.name}
                                    >
                                        {item.name}
                                    </Select.Option>
                                )
                            })
                        }
                    </Select>
                    <MessageError isError={validate[attribute]?.isError || false} message={validate[attribute]?.message || ""} />
                </div>
            </div>
        </div>
    );
}
export default InputSelectUserCommon;
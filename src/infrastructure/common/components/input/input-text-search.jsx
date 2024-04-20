import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import React from 'react'
import "../../../../assets/styles/components/input.css"
export const InputSearchCommon = (props) => {
    const {
        placeholder,
        value,
        onChange,
        disabled,
        size
    } = props;
    return (
        <div className='input-common'>
            <Input
                className='w-100'
                size={size ? size : "middle"}
                value={value ? value : ""}
                onChange={onChange}
                disabled={disabled}
                placeholder={placeholder}
                prefix={<SearchOutlined className='icon-search' />}
            />
        </div>
    )
}

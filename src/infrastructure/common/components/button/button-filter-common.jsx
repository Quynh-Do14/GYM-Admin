import { Button } from 'antd'
import React from 'react'
import "../../../../assets/styles/components/button.css"
export const ButtonFilterCommon = (props) => {
    const {
        classColor = "blue" | "gradient" | "grey" | "black" | "orange",
        onClick,
        icon
    } = props;
    return (
        <div className='button-filter-common'>
            <Button className={classColor} onClick={onClick} icon={icon}>
                {props.children}
            </Button>
        </div>
    )
}

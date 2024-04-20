/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Upload } from 'antd';
import { MessageError } from '../controls/MessageError';
import '../../../../assets/styles/components/input.css'

import { showImageCommon } from '../../../utils/helper';
import noImgProduct from "../../../../assets/images/no-avatar-product.jpg"
import noVideoProduct from "../../../../assets/images/noVideo.png"

const UploadFileCommon = (props) => {
    const {
        label,
        isVideo = false,
        dataAttribute,
        id,
        shape = ""
    } = props;
    const [value, setValue] = useState("");
    const [file, setFile] = useState()

    useEffect(() => {
        setValue(dataAttribute || '');

    }, [dataAttribute]);

    const handleFileChange = async (event) => {
        const file = event.target.files[0].name;
        console.log("file", event.target.files[0]);
        setFile(file)
    };
    return (
        <div>
            <div className='mb-4 input-common'>
                <div className='title'>
                    <span className='label'>{isVideo && label}</span>
                </div>
                <div className="avatar-upload">
                    <div className="avatar-edit">
                        <input type='file' id={id} onChange={handleFileChange} accept={`${isVideo ? "video/mp4" : ".png, .jpg, .jpeg"}`} />
                        <label for={id}></label>
                    </div>
                    <div className={`avatar-preview ${shape}`}>
                        {
                            file
                                ?
                                <div className='flex justify-center align-center'>
                                    <div style={{
                                        textAlign: "center",
                                        color: "#fe7524",
                                        fontSize: "14px",
                                        lineHeight: "22px",
                                        fontWeight: 600

                                    }}>
                                        {file}
                                    </div>
                                </div>
                                :
                                <div id="imagePreview" style={{ backgroundImage: `${dataAttribute ? `url(${showImageCommon(dataAttribute)})` : `url(${isVideo ? noVideoProduct : noImgProduct})`}` }}>
                                </div>
                        }

                    </div>
                </div>
            </div>
        </div >
    )
};
export default UploadFileCommon;
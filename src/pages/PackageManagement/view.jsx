import React, { useEffect, useState } from 'react'
import MainLayout from '../../infrastructure/common/layouts/MainLayout'
import { Col, Row } from 'antd';
import { ROUTE_PATH } from '../../core/common/appRouter';
import InputTextCommon from '../../infrastructure/common/components/input/input-text';
import { ButtonCommon } from '../../infrastructure/common/components/button/button-common';
import { FullPageLoading } from '../../infrastructure/common/components/controls/loading';
import { useNavigate, useParams } from 'react-router-dom';
import { WarningMessage } from '../../infrastructure/common/components/toast/notificationToast';
import equipTypeService from '../../infrastructure/repositories/equip-type/service/equip-type.service';
import InputNumberCommon from '../../infrastructure/common/components/input/input-number';
import UploadAvatar from '../../infrastructure/common/components/input/upload-file';
import packageService from '../../infrastructure/repositories/package/service/package.service';
import { arrayBufferToBase64 } from '../../infrastructure/helper/helper';

const ViewPackageManagement = () => {
    const [validate, setValidate] = useState({});
    const [loading, setLoading] = useState(false);
    const [submittedTime, setSubmittedTime] = useState();
    const [detailPackage, setDetailPackage] = useState({});
    const [imageUrl, setImageUrl] = useState(null);
    const [avatar, setAvatar] = useState(null);

    const [_data, _setData] = useState({});
    const dataPackage = _data;
    const setDataPackage = (data) => {
        Object.assign(dataPackage, { ...data });
        _setData({ ...dataPackage });
    };

    const param = useParams();

    const navigate = useNavigate();

    const onBack = () => {
        navigate(ROUTE_PATH.PACKAGE)
    };

    const isValidData = () => {
        let allRequestOK = true;

        setValidate({ ...validate });

        Object.values(validate).forEach((it) => {
            if (it.isError === true) {
                allRequestOK = false;
            }
        });

        return allRequestOK;
    };

    const onGetPackageByIdAsync = async () => {
        try {
            await packageService.getPackagesById(
                param.id,
                setLoading
            ).then((res) => {
                setDetailPackage(res)
            })
        }
        catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        onGetPackageByIdAsync().then(() => { })
    }, [])
    useEffect(() => {
        if (detailPackage) {
            setDataPackage({
                image: detailPackage?.image?.data,
                name: detailPackage.name,
                price: detailPackage.price,
                duration: detailPackage.duration,
            });
        };
    }, [detailPackage]);
    const onUpdatePackage = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await packageService.updatePackages(
                param.id,
                {
                    file: avatar ? avatar : imageUrl,
                    name: dataPackage.name,
                    price: dataPackage.price,
                    duration: dataPackage.duration,
                },
                onBack,
                setLoading
            )
        }
        else {
            WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
        };
    };

    // const onGetAvatarsync = async () => {
    //     try {
    //         await packageService.getAvatar(
    //             param.id,
    //             setLoading
    //         ).then((response) => {
    //             const base64String = arrayBufferToBase64(response);
    //             const imageSrc = `data:image/jpeg;base64,${base64String}`;
    //             setImageUrl(imageSrc)
    //         })
    //     }
    //     catch (error) {
    //         console.error(error)
    //     }
    // }
    // useEffect(() => {
    //     onGetAvatarsync().then(() => { })
    // }, [])

    return (
        <MainLayout breadcrumb={"Quản lý gói thành viên"} title={"Xem thông tin gói thành viên"} redirect={ROUTE_PATH.PACKAGE}>
            <div className='main-page h-100 flex-1 auto bg-white px-4 py-8'>
                <div className='bg-white scroll-auto'>
                    <Row>
                        <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={5} className='border-add flex justify-center'>
                            <div className='legend-title'>Thêm mới ảnh</div>
                            <UploadAvatar
                                attributeImg={`data:image/jpeg;base64,${dataPackage.image}`}
                                imageUrl={imageUrl}
                                setAvatar={setAvatar}
                                setImageUrl={setImageUrl}
                            />
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={16} xl={18} xxl={19} className='border-add'>
                            <div className='legend-title'>Thêm thông tin mới</div>
                            <Row gutter={[30, 0]}>
                                <Col span={24}>
                                    <InputTextCommon
                                        label={"Gói thành viên"}
                                        attribute={"name"}
                                        isRequired={true}
                                        dataAttribute={dataPackage.name}
                                        setData={setDataPackage}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Giá"}
                                        attribute={"price"}
                                        isRequired={true}
                                        dataAttribute={dataPackage.price}
                                        setData={setDataPackage}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputNumberCommon
                                        label={"Thời hạn (Ngày)"}
                                        attribute={"duration"}
                                        isRequired={true}
                                        dataAttribute={dataPackage.duration}
                                        setData={setDataPackage}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>

                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className='container-btn main-page bg-white p-4 flex flex-col '>
                <Row justify={"center"}>
                    <Col className='mx-1'>
                        <ButtonCommon onClick={onBack} classColor="blue">Quay lại</ButtonCommon>
                    </Col>
                    <Col className='mx-1'>
                        <ButtonCommon onClick={onUpdatePackage} classColor="orange">Cập nhật</ButtonCommon>
                    </Col>
                </Row>
            </div >
            <FullPageLoading isLoading={loading} />
        </MainLayout >
    )
}

export default ViewPackageManagement
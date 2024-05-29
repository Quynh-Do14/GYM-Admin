import React, { useEffect, useState } from 'react'
import MainLayout from '../../infrastructure/common/layouts/MainLayout'
import { Col, Row } from 'antd';
import { ROUTE_PATH } from '../../core/common/appRouter';
import InputTextCommon from '../../infrastructure/common/components/input/input-text';
import { ButtonCommon } from '../../infrastructure/common/components/button/button-common';
import { FullPageLoading } from '../../infrastructure/common/components/controls/loading';
import { useNavigate, useParams } from 'react-router-dom';
import equipmentService from '../../infrastructure/repositories/equipment/service/equipment.service'
import { WarningMessage } from '../../infrastructure/common/components/toast/notificationToast';
import UploadAvatar from '../../infrastructure/common/components/input/upload-file';
import InputNumberCommon from '../../infrastructure/common/components/input/input-number';
import InputEquipTypeCommon from '../../infrastructure/common/components/input/select-equip-type';
import { arrayBufferToBase64 } from '../../infrastructure/helper/helper';

const ViewEquipmentManagement = () => {
    const [validate, setValidate] = useState({});
    const [loading, setLoading] = useState(false);
    const [submittedTime, setSubmittedTime] = useState();
    const [detailEquipment, setDetailEquipment] = useState({});
    const [imageUrl, setImageUrl] = useState(null);
    const [avatar, setAvatar] = useState(null);

    const [_data, _setData] = useState({});
    const dataEquipment = _data;
    const setDataEquipment = (data) => {
        Object.assign(dataEquipment, { ...data });
        _setData({ ...dataEquipment });
    };

    const param = useParams();

    const navigate = useNavigate();

    const onBack = () => {
        navigate(ROUTE_PATH.EQUIPMENT)
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

    const onGetEquipmentByIdAsync = async () => {
        try {
            await equipmentService.getEquipmentById(
                param.id,
                setLoading
            ).then((res) => {
                setDetailEquipment(res)
            })
        }
        catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        onGetEquipmentByIdAsync().then(() => { })
    }, [])

    useEffect(() => {
        if (detailEquipment) {
            setDataEquipment({
                name: detailEquipment.name,
                equipType: detailEquipment.equipType?.id,
                quantity: detailEquipment.quantity,
                price: detailEquipment.price,
                madein: detailEquipment.madein,
            });
        };
    }, [detailEquipment]);

    const onUpdateEquipment = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await equipmentService.updateEquipment(
                param.id,
                {
                    file: avatar ? avatar : imageUrl,
                    name: dataEquipment.name,
                    equipType: dataEquipment.equipType,
                    quantity: dataEquipment.quantity,
                    price: dataEquipment.price,
                    madein: dataEquipment.madein,
                },
                onBack,
                setLoading
            )
        }
        else {
            WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
        };
    };

    const onGetAvatarsync = async () => {
        try {
            await equipmentService.getAvatar(
                param.id,
                setLoading
            ).then((response) => {
                const base64String = arrayBufferToBase64(response);
                const imageSrc = `data:image/jpeg;base64,${base64String}`;
                setImageUrl(imageSrc)
            })
        }
        catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        onGetAvatarsync().then(() => { })
    }, [])

    return (
        <MainLayout breadcrumb={"Quản lý dụng cụ"} title={"Xem thông tin dụng cụ"} redirect={ROUTE_PATH.EMPLOYEE}>
            <div className='main-page h-100 flex-1 auto bg-white px-4 py-8'>
                <div className='bg-white'>
                    <Row>
                        <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={5} className='border-add flex justify-center'>
                            <div className='legend-title'>Cập nhật ảnh</div>
                            <UploadAvatar
                                attributeImg={dataEquipment.avatar}
                                imageUrl={imageUrl}
                                setAvatar={setAvatar}
                                setImageUrl={setImageUrl}
                            />
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={16} xl={18} xxl={19} className='border-add'>
                            <div className='legend-title'>Cập nhật thông tin</div>
                            <Row gutter={[30, 0]}>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Tên dụng cụ"}
                                        attribute={"name"}
                                        isRequired={true}
                                        dataAttribute={dataEquipment.name}
                                        setData={setDataEquipment}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputEquipTypeCommon
                                        label={"Loại thiết bị"}
                                        attribute={"equipType"}
                                        isRequired={true}
                                        dataAttribute={dataEquipment.equipType}
                                        setData={setDataEquipment}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputNumberCommon
                                        label={"Số lượng"}
                                        attribute={"quantity"}
                                        isRequired={true}
                                        dataAttribute={dataEquipment.quantity}
                                        setData={setDataEquipment}
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
                                        dataAttribute={dataEquipment.price}
                                        setData={setDataEquipment}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Sản xuất tại"}
                                        attribute={"madein"}
                                        isRequired={true}
                                        dataAttribute={dataEquipment.madein}
                                        setData={setDataEquipment}
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
                        <ButtonCommon onClick={onUpdateEquipment} classColor="orange">Cập nhật</ButtonCommon>
                    </Col>
                </Row>
            </div >
            <FullPageLoading isLoading={loading} />
        </MainLayout >
    )
}

export default ViewEquipmentManagement